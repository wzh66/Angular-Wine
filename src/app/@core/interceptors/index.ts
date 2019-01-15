import {ErrorInterceptor} from './error.interceptors';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

export const INTERCEPTORS = [
  {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
  }
];
