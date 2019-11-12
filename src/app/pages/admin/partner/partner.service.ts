import {Inject, Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient) { }

  get(key): Observable<any> {
    return this.http.get(this.prefix_url + 'getInvites' + '&key=' + key)
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
