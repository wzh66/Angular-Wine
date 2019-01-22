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
  private static DEFAULTSHARE: any = {
    title: '',
    desc: '',
    link: '',
    imgUrl: '',
  };

  constructor(resolver: ComponentFactoryResolver,
              applicationRef: ApplicationRef,
              injector: Injector,
              @Inject(DOCUMENT) private document: any,
              private wxService: JWeiXinService,
              private http: HttpClient) {
    super(resolver, applicationRef, injector, document);
  }

  private share: any;

  show(data): Observable<any> {
    console.log(data);
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

  config(shareData: any): Promise<boolean> {
    this.share = shareData;
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
          .get('/wx-config')
          .pipe(
            catchError((error: Response | any) => {
              reject('无法获取签名数据');
              return Observable.throw('error');
            }),
          )
          .subscribe((ret: any) => {
            if (!ret.success) {
              reject('jsapi 获取失败');
              return;
            }
            wx.config(ret);
          });
      });
    });
  }

  private _onMenuShareTimeline() {
    wx.onMenuShareTimeline(
      Object.assign({}, WxService.DEFAULTSHARE, this.share),
    );
    return this;
  }

  private _onMenuShareAppMessage() {
    wx.onMenuShareAppMessage(
      Object.assign({}, WxService.DEFAULTSHARE, this.share),
    );
    return this;
  }

  private _onMenuShareQQ() {
    wx.onMenuShareQQ(Object.assign({}, WxService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareWeibo() {
    wx.onMenuShareWeibo(Object.assign({}, WxService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareQZone() {
    wx.onMenuShareQZone(Object.assign({}, WxService.DEFAULTSHARE, this.share));
    return this;
  }
}
