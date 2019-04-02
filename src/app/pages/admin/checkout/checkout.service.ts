import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {formData} from '../../../utils/utils';
import {CartDto, AddRemarkCartDto} from '../../../@core/dto/cart.dto';

import {DialogService} from 'ngx-weui';

@Injectable({providedIn: 'root'})
export class CheckoutService {
  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient, private dialogSvc: DialogService) {
  }

  getItems(key): Observable<any> {
    return this.http.get(this.prefix_url + 'toPay' + '&key=' + key)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  get(type, key?): Observable<any> {
    return this.http.get(this.prefix_url + 'getPayTypes' + '&consumeType=' + type + '&key=' + (key || ''))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  pay(body): Observable<any> {
    return this.http.post(this.prefix_url + 'pay', formData(body))
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
