import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {formData} from '../../../utils/utils';

@Injectable({providedIn: 'root'})
export class CommissionService {
  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient) {
  }

  list(key, type, page?, rows?): Observable<any> {
    return this.http.get(this.prefix_url + 'myAccFlowList' + '&key=' + key + '&type=' + type +
      '&page=' + (page ? page : 1) + '&rows=' + (rows ? rows : 20)).pipe(observableMargeMap((res: any) => {
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
