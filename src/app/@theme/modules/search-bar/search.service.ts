import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, mergeMap as observableMargeMap} from 'rxjs/operators';
import {Observable, of as observableOf} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient) {
  }

  /*search(term: string) {
    const params = new URLSearchParams();
    params.set('q', term); // the user's search value
    params.set('code', 'utf-8');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http
      .jsonp(this.prefix_url + 'getProductList' + `${params.toString()}`, 'JSONP_CALLBACK')
      .pipe(map((response: any) => response.result.map((d: any[]) => d[0]).slice(0, 5)));
  }*/

  search(word?): Observable<any> {
    return this.http.get(this.prefix_url + 'getProductList' + '&word=' + (word ? word : ''))
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
