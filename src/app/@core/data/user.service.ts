import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError as observableThrow, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap, catchError as observableCatchError} from 'rxjs/operators';

import {DialogService} from 'ngx-weui';

import {UserDto} from '../dto/user.dto';

@Injectable({providedIn: 'root'})
export class UserService {
  phone;

  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient, private dialogSvc: DialogService) {
  }

  get(key): Observable<UserDto> {
    return this.http.get(this.prefix_url + 'getMember' + '&key=' + key)
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
