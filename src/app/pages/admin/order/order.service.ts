import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {formData} from '../../../utils/utils';

@Injectable({providedIn: 'root'})
export class OrderService {
  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient) {
  }

  list(key, status, page?, rows?): Observable<any> {
    return this.http.get(this.prefix_url + 'getOrders' + '&key=' + key + '&status=' + status + '&page=' + (page ? page : 1) + '&rows=' + (rows ? rows : 10));
  }

  getOrderInfo(key, no?) {
    return this.http.get(this.prefix_url + 'orderLogisticsDetail' + '&key=' + key + '&orderNo=' + no)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  pay(body): Observable<any> {
    return this.http.post(this.prefix_url + 'orderPay', formData(body)).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  updateOrderToComp(key, no?) {
    return this.http.get(this.prefix_url + 'updateOrderToComp' + '&key=' + key + '&orderNo=' + no)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  /*count(key): Observable<number> {
    return this.http.get(this.prefix_url + 'cartCount' + '&key=' + key).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  save(body: CartDto): Observable<any> {
    return this.http.post(this.prefix_url + 'addCart', formData(body)).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }*/

  protected processResult(res): Observable<any> {
    if (res.code === '0000') {
      return observableOf(res.result);
    } else {
      return observableOf(null);
    }
  }
}
