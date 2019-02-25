import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Router, ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';

import {Observable} from 'rxjs';

import {formData} from '../../utils/utils';
import {StorageService} from '../../@core/utils/storage.service';
import {UaService} from '../../@core/data/ua.service';

@Injectable({providedIn: 'root'})
export class AuthService {

  private redirectUrl = '';

  constructor(@Inject('PREFIX_URL') private prefix_url,
              private router: Router,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private http: HttpClient,
              private storageSvc: StorageService,
              private ua: UaService) {
  }

  requestAuth() {
    if (this.router.url.indexOf('login') !== -1) {
      return false;
    }
    if (this.redirectUrl) {
      return false;
    }

    this.redirectUrl = this.router.url;
    window.location.href = '/auth/login?callbackUrl=' + this.redirectUrl;
  }

  getUid() {
    if (this.storageSvc.get('accessToken')) {
      return JSON.parse(this.storageSvc.get('accessToken')).id;
    }
  }

  getOid() {
    if (this.storageSvc.get('openid')) {
      return JSON.parse(this.storageSvc.get('openid'));
    } else {
      return '';
    }
  }

  getKey() {
    // this.redirectUrl = this.router.url;
    let accessToken, openid, key, id;

    // 判断accessToken是否在存并是否过期
    if (this.storageSvc.get('accessToken') &&
      JSON.parse(this.storageSvc.get('accessToken')).expires_time > Date.parse(String(new Date()))) {
      accessToken = JSON.parse(this.storageSvc.get('accessToken'));
      return accessToken.key;
    } else {// accessToken不存在或已过期
      if (this.ua.isWx()) {// 微信环境
        if (this.route.snapshot.queryParams['key']) {
          key = this.route.snapshot.queryParams['key'];
          id = this.route.snapshot.queryParams['id'];
          openid = this.route.snapshot.queryParams['openid'];
          this.storageSvc.set('accessToken', JSON.stringify({
            id: id,
            key: key,
            expires_time: Date.parse(String(new Date())) + 144000000
          }));
          this.storageSvc.set('openid', openid);
          this.router.navigate([this.location.path().split('?')[0]]);
        } else if (this.route.snapshot.queryParams['openid']) {// url中存在openId;
          openid = this.route.snapshot.queryParams['openid'];
          this.storageSvc.set('openid', openid);
          return this.router.navigate(['/auth/login'], {queryParams: {openid: openid}});
        } else {// url中不存在openId;
          window.location.href = '/interface/comm/auth.html?callbackUrl=' + encodeURI(window.location.href);
        }
      } else {// 非微信环境
        this.router.navigate(['/auth/login'], {queryParams: {callbackUrl: this.router.url}});
      }
    }
  }

  getStorageKey() {
    let accessToken;

    // 判断accessToken是否在存并是否过期
    if (this.storageSvc.get('accessToken')) {
      accessToken = JSON.parse(this.storageSvc.get('accessToken'));
      return accessToken.key;
    } else {
      return '';
    }
  }

  signIn(body): Observable<any> {
    body = formData(body);
    return this.http.post(this.prefix_url + 'login', body);
  }

  signUp(body): Observable<any> {
    body = formData(body);
    return this.http.post(this.prefix_url + 'register', body);
  }

  forgot(body): Observable<any> {
    body = formData(body);
    return this.http.post(this.prefix_url + 'findMyPwd', body);
  }

  getValidImg(id): Observable<any> {
    return this.http.get(this.prefix_url + 'getValidImg' + '&randomValidUid=' + id);
  }

  sendValidCode(body): Observable<any> {
    body = formData(body);
    return this.http.post(this.prefix_url + 'sendValidCode', body);
  }
}
