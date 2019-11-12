import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  constructor(private http: HttpClient,
              @Inject('PREFIX_URL') private prefix_url) {
  }

  getReceives(key, rows?, page?) {
    return this.http.get(this.prefix_url + 'getReceives' + '&key=' + key + '&rows=' + (rows ? rows : 10) + '&page=' + (page ? page : 1))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  getCustoms(key) {
    return this.http.get(this.prefix_url + 'getCustoms' + '&key=' + key)
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
