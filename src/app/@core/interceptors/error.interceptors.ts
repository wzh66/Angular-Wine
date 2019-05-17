import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable, of as observableOf} from 'rxjs';
import {tap} from 'rxjs/operators';

import {AuthService} from '../../pages/auth/auth.service';
import {DialogService} from 'ngx-weui';
import {ToastService} from 'ngx-weui';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private status = false;

  constructor(private router: Router,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private authSvc: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
      res => this.handleResponse(res),
      err => this.handleResponse(err)
    ));
  }

  private handleResponse(res: any): void {
    if (res.body) {
      if (res.body.code !== '0000') {
        if (!this.status) {
          this.status = true;
          if (res.body.code === '1001') {
            this.dialogSvc.show({
              title: '',
              content: res.body.msg,
              cancel: '',
              confirm: '现在登录'
            }).subscribe(value => {
              this.authSvc.requestAuth();
              this.status = false;
            });
          } else {
            this.dialogSvc.show({
              title: '',
              content: res.body.msg,
              cancel: '',
              confirm: '我知道了'
            }).subscribe(() => {
              this.status = false;
            });
          }
        }
      }
    }
  }
}
