import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {formData} from '../../../utils/utils';
import {DialogService} from 'ngx-weui';
import {PayDto} from '../../../@core/dto/pay.dto';

declare var WeixinJSBridge: any;

@Injectable({providedIn: 'root'})
export class CheckoutService {
  constructor(@Inject('PREFIX_URL') private prefix_url,
              private http: HttpClient,
              private router: Router,
              private dialogSvc: DialogService) {
  }

  getItems(key): Observable<any> {
    return this.http.get(this.prefix_url + 'toPay' + '&key=' + key)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  get(key): Observable<any> {
    return this.http.get(this.prefix_url + 'getPayTypes' + '&key=' + (key || ''))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  pay(body): Observable<any> {
    return this.http.post(this.prefix_url + 'pay', formData(body))
      .pipe(observableMargeMap((res: any) => {
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
          console.log(res);
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            window.location.href = '/msg/success?type=cart&orderNo=' + body.orderNo;
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

  protected processResult(res): Observable<any> {
    if (res.code === '0000') {
      return observableOf(res.result);
    } else {
      return observableOf(null);
    }
  }
}
