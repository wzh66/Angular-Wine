import {Inject} from '@angular/core';
import {Injectable, ComponentFactoryResolver, ApplicationRef, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {JWeiXinService} from 'ngx-weui';

import {BaseService} from '../../../@core/utils/base.service';
import {WxComponent} from './wx.component';

/**
 * 微信JS-SDK服务器
 */

@Injectable({providedIn: 'root'})
export class WxService extends BaseService {
  private DEFAULTSHARE: any = {
    title: '',
    desc: '',
    link: '',
    imgUrl: ''
  };

  constructor(@Inject('PREFIX_URL') private prefix_url,
              resolver: ComponentFactoryResolver,
              applicationRef: ApplicationRef,
              injector: Injector,
              @Inject(DOCUMENT) private document: any,
              private wxService: JWeiXinService,
              private http: HttpClient) {
    super(resolver, applicationRef, injector, document);
  }

  private share: any;
  private jsApiList: string[] = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
  show(data): Observable<any> {
    const componentRef = this.build(WxComponent);

    componentRef.instance.state = data;
    componentRef.instance.close.subscribe(() => {
      // this.destroy(componentRef);
      setTimeout(() => {
        this.destroy(componentRef);
      }, 300);
    });
    return componentRef.instance.show();
  }

  hide() {
    const componentRef = this.build(WxComponent);
    componentRef.instance.hide();
  }

  defaultConfig(config) {
    this.DEFAULTSHARE = config;
  }

  config(shareData: any, jsApiList?: string[]): Promise<boolean> {
    this.share = shareData;
    if (jsApiList) {
      this.jsApiList = jsApiList;
    }
    return new Promise((resolve, reject) => {
      this.wxService.get().then(res => {
        if (!res) {
          reject('jweixin.js 加载失败');
          return;
        }

        wx.ready(() => {
          this._onMenuShareTimeline()
            ._onMenuShareAppMessage()
            ._onMenuShareQQ()
            ._onMenuShareQZone()
            ._onMenuShareWeibo();

          resolve();
        });
        wx.error(() => {
          reject('config 注册失败');
        });

        this.http
          .get(this.prefix_url + 'getJsSdkAuth&url=' + encodeURIComponent(window.location.href))
          .pipe(
            catchError((error: Response | any) => {
              reject('无法获取签名数据');
              return Observable.throw('error');
            })
          )
          .subscribe((ret: any) => {
            if (ret.code !== '0000') {
              reject('jsapi 获取失败');
              return;
            }
            ret.result.jsApiList = this.jsApiList;
            wx.config(ret.result);
          });
      });
    });
  }

  private _onMenuShareTimeline() {
    wx.onMenuShareTimeline(
      Object.assign({}, this.DEFAULTSHARE, this.share)
    );
    return this;
  }

  private _onMenuShareAppMessage() {
    wx.onMenuShareAppMessage(
      Object.assign({}, this.DEFAULTSHARE, this.share)
    );
    return this;
  }

  private _onMenuShareQQ() {
    wx.onMenuShareQQ(Object.assign({}, this.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareWeibo() {
    wx.onMenuShareWeibo(Object.assign({}, this.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareQZone() {
    wx.onMenuShareQZone(Object.assign({}, this.DEFAULTSHARE, this.share));
    return this;
  }
}
