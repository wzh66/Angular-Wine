import {Injectable} from '@angular/core';
import {HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable, of as observableOf} from 'rxjs';
import {tap} from 'rxjs/operators';

import {AuthService} from '../../pages/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authSvc: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
      res => this.handleResponse(res),
      err => this.handleResponse(err)
    ));
  }

  private handleResponse(res: any): void {
    if (res.body && res.body.code === '1001') {
      this.authSvc.requestAuth();
    }
  }
}
