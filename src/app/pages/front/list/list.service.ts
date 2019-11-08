import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {DialogService} from 'ngx-weui';

@Injectable({providedIn: 'root'})
export class ProdService {
  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient, private dialogSvc: DialogService) {
  }

  list(typeid): Observable<any> {
    return this.http.get(this.prefix_url + 'getBrands' + '&typeid=' + typeid)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  getAromas(): Observable<any> {
    return this.http.get(this.prefix_url + 'getAromas')
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  getPrices(): Observable<any> {
    return this.http.get(this.prefix_url + 'getPrices')
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  getPlaces(type): Observable<any> {
    return this.http.get(this.prefix_url + 'getPlaces' + '&type=' + type)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  getVars(): Observable<any> {
    return this.http.get(this.prefix_url + 'getVars')
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  getCategorys(typeid): Observable<any> {
    return this.http.get(this.prefix_url + 'getCategorys' + '&typeid=' + typeid)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  item(id, key?) {
    return this.http.get(this.prefix_url + 'productInfo' + '&id=' + id + '&key=' + (key ? key : ''))
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
