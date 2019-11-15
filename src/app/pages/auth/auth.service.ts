import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Router, ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';

import {Observable, of as observableOf} from 'rxjs';

import {formData} from '../../utils/utils';
import {StorageService} from '../../@core/utils/storage.service';
import {UaService} from '../../@core/data/ua.service';


@Injectable({providedIn: 'root'})
export class AuthService {
  private redirectUrl = '';
  private accessToken = {
    key: '',
    id: '',
    openid: '',
    expires_time: null
  };

  constructor(@Inject('PREFIX_URL') private prefix_url,
              private router: Router,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private http: HttpClient,
              private storageSvc: StorageService,
              private ua: UaService) {
  }

  requestAuth() {
    this.storageSvc.remove('accessToken');
    if (this.router.url.indexOf('login') !== -1) {
      return false;
    }
    if (this.redirectUrl) {
      return false;
    }

    this.redirectUrl = this.router.url;
    if (this.ua.isWx()) {// 微信环境
      const openid = this.route.snapshot.queryParams['openid'];
      const key = this.route.snapshot.queryParams['key'];
      const id = this.route.snapshot.queryParams['id'];
      if (!openid) {// 无openid
        window.location.href = '/api/interface/comm/auth.html?callbackUrl=' + encodeURI(window.location.href);
      } else {
        if (!key) {// 无key
          return this.router.navigate(['/auth/login'], {
            queryParams: {
              openid: openid,
              callbackUrl: this.redirectUrl
            }
          });
        } else {// 有key
          const expires_time = Date.parse(String(new Date())) + 144000000;
          this.storageSvc.set('accessToken', JSON.stringify({
            key: key,
            id: id,
            openid: openid,
            expires_time: expires_time
          }));
          this.router.navigate([this.location.path().split('?')[0]]);
        }
      }
    } else {// 非微信环境
      this.router.navigate(['/auth/login'], {queryParams: {callbackUrl: this.router.url}});
    }
  }

  getToken() {
    if (this.storageSvc.get('accessToken')) {
      return JSON.parse(this.storageSvc.get('accessToken'));
    }
  }

  getUid() {
    if (this.storageSvc.get('accessToken')) {
      return JSON.parse(this.storageSvc.get('accessToken')).id;
    }
  }

  getOid() {
    if (this.storageSvc.get('accessToken')) {
      return JSON.parse(this.storageSvc.get('accessToken')).openid;
    }
  }

  referee(referee?) {
    if (referee) {
      this.storageSvc.set('referee', referee);
    } else if (referee === null) {
      this.storageSvc.remove('referee');
    } else {
      return this.storageSvc.get('referee');
    }
  }

  isLogin() {
    return !!this.accessToken.key;
  }

  getKey() {
    /*this.storageSvc.remove('accessToken');*/
    // 判断accessToken是否在存并是否过期
    if (this.storageSvc.get('accessToken')) {
      return JSON.parse(this.storageSvc.get('accessToken')).key;
    } else {// accessToken不存在或已过期
      if (this.ua.isWx()) {// 微信环境
        const openid = this.route.snapshot.queryParams['openid'];
        const key = this.route.snapshot.queryParams['key'];
        const id = this.route.snapshot.queryParams['id'];
        if (!openid) {// 无openid
          window.location.href = '/api/interface/comm/auth.html?callbackUrl=' + encodeURI(window.location.href);
        } else {
          if (!key) {// 无key
            this.signIn({openid: openid, referee: this.referee() ? this.referee() : ''}).subscribe(res => {
              const expires_time = Date.parse(String(new Date())) + 144000000;
              this.storageSvc.set('accessToken', JSON.stringify({
                key: res.result.key,
                id: res.result.id,
                openid: openid,
                expires_time: expires_time
              }));
            });
            // return this.router.navigate(['/auth/login'], {queryParams: {openid: openid}});
          } else {// 有key
            const expires_time = Date.parse(String(new Date())) + 144000000;
            this.storageSvc.set('accessToken', JSON.stringify({
              key: key,
              id: id,
              openid: openid,
              expires_time: expires_time
            }));
            return key;
          }
        }
      } else {// 非微信环境
        this.router.navigate(['/admin/home'], {queryParams: {callbackUrl: this.router.url}});
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

  logout() {
    this.storageSvc.remove('accessToken');
    this.router.navigate(['/admin/home']);
  }
}
