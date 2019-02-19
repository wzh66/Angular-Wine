import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError as observableThrow, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap, catchError as observableCatchError} from 'rxjs/operators';

import {DialogService} from 'ngx-weui';

@Injectable({providedIn: 'root'})
export class CartService {
  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient, private dialogSvc: DialogService) {
  }

  count() {
  }

  get(key): Observable<any> {
    return this.http.get(this.prefix_url + 'cartCount' + '?key=' + key).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  add() {
  }

  protected processResult(res): Observable<any> {
    if (res.code === '0000') {
      return observableOf(res.result);
    } else if (res.code === '1001') {
    } else {
      this.dialogSvc.show({title: '', content: res.msg, confirm: '我知道了', cancel: ''}).subscribe();
    }
  }
}
