import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf, Subject} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {formData} from '../../../utils/utils';
import {CartDto, AddRemarkCartDto} from '../../../@core/dto/cart.dto';

import {DialogService} from 'ngx-weui';

@Injectable({providedIn: 'root'})
export class CartService {
  private subject = new Subject<any>();

  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient, private dialogSvc: DialogService) {
  }

  get(key?): Observable<any[]> {
    return this.http.get(this.prefix_url + 'getCarts' + '&key=' + key).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  count(key): Observable<any> {
    return this.http.get(this.prefix_url + 'cartCount' + '&key=' + key).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  getCount(): Observable<number> {
    return this.subject.asObservable();
  }

  updateCount(count: number) {
    this.subject.next(count);
  }

  save(body: CartDto): Observable<any> {
    return this.http.post(this.prefix_url + 'addCart', formData(body)).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  remove(body): Observable<any> {
    return this.http.post(this.prefix_url + 'removeCart', formData(body)).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  clear(key?): Observable<any> {
    return this.http.post(this.prefix_url + 'clearCart' + '&key=' + key, {}).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  saveMark(body: AddRemarkCartDto): Observable<any> {
    return this.http.post(this.prefix_url + 'addRemarkCart', formData(body)).pipe(observableMargeMap((res: any) => {
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
