import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Router, ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';

import {Observable, of as observableOf} from 'rxjs';

import {formData} from '../../utils/utils';
import {StorageService} from '../../@core/utils/storage.service';
import {UaService} from '../../@core/data/ua.service';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {PayDto} from '../../@core/dto/pay.dto';

import {DialogService} from 'ngx-weui';

declare var WeixinJSBridge: any;

@Injectable({providedIn: 'root'})
export class GroupService {

  constructor(@Inject('PREFIX_URL') private prefix_url,
              private router: Router,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private http: HttpClient,
              private storageSvc: StorageService,
              private ua: UaService,
              private dialogSvc: DialogService) {
  }

  get(key, teamId?): Observable<any> {
    return this.http.get(this.prefix_url + 'getActive' + '&key=' + key + '&teamId=' + (teamId ? teamId : ''))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  create(body): Observable<any> {
    return this.http.post(this.prefix_url + 'joinTeam', formData(body)).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  join(body: { key: string, actionId: string, teamId?: string }): Observable<any> {
    return this.http.post(this.prefix_url + 'joinTeam', formData(body)).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  listener(key, orderNo): Observable<any> {
    return this.http.get(this.prefix_url + 'getConsumeInfo&key=' + key + '&orderNo=' + orderNo)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  wxPay(body: PayDto) {
    const that = this;

    function onBridgeReady() {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          appId: body.appId, // 公众号名称，由商户传入
          timeStamp: body.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: body.nonceStr, // 随机串
          package: body.package,
          signType: body.signType, // 微信签名方式：
          paySign: body.paySign // 微信签名
        },
        (res) => {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            window.location.href = '/group/item/1?orderNo=' + body.tradeNo;
          } else {
            that.dialogSvc.show({content: res.err_msg, confirm: '我知道了', cancel: ''});
          }
        });
    }

    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      }
    } else {
      onBridgeReady();
    }
  }

  orders(key, type, page?): Observable<any> {
    return this.http.get(this.prefix_url + 'getAllMyActivies' + '&key=' + key + '&type=' + type + '&page=' + (page ? page : 1))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  order(key, tradeNo): Observable<any> {
    return this.http.get(this.prefix_url + 'getTeamInfoByTradeNo' + '&key=' + key + '&tradeNo=' + tradeNo)
      .pipe(observableMargeMap((res) => {
        return this.processResult(res);
      }));
  }

  protected processResult(res): Observable<any> {
    if (res.code === '0000') {
      return observableOf(res.result);
    } else {
      return observableOf(null);
    }
  }
}
