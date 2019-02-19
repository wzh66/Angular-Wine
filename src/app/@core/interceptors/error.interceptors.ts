import {Injectable} from '@angular/core';
import {HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable, of as observableOf} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
      res => this.handleResponse(res),
      err => this.handleResponse(err)
    ));
  }

  private handleResponse(res: any): void {
    if (res instanceof HttpResponse || res instanceof HttpErrorResponse) {
      switch (res.status) {
        case 401:
          console.log('用户没有登录！');
          this.router.navigate(['/auth']);
          break;
        case 404:
          console.log('您请求的接口不存在！');
          break;
        case 403:
          console.log('该用户组被禁止执行本操作！');
          break;
      }
    }
  }
}
