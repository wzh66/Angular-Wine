import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of as observableOf} from 'rxjs';

import {DialogService} from 'ngx-weui';
import {UserDto} from '../dto/user.dto';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SysService {

  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient,
              private router: Router, private dialogSvc: DialogService) {
  }

  get(): Observable<UserDto> {
    return this.http.get(this.prefix_url + 'getSysConfigure')
      .pipe(observableMargeMap((res: any) => {
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
