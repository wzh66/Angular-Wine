import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CashCardService {

  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient) {
  }

  get(key, rows?, page?): Observable<any> {
    return this.http.get(this.prefix_url + 'getCanGiveProducts' + '&key=' + key + '&rows=' + (rows ? rows : 20) + '&page=' + (page ? page : 1))
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
