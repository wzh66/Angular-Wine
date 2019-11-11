import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {DialogService} from 'ngx-weui';

@Injectable({providedIn: 'root'})
export class ShareService {

  constructor(private http: HttpClient,
              @Inject('PREFIX_URL') private prefix_url) {
  }

  get(key, page?): Observable<any> {
    return this.http.get('/wApi/interface/call.html?action=getInvites&key=' + key + '&page=' + (page ? page : 1))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  getList(key, rows?, page?): Observable<any> {
    return this.http.get(this.prefix_url + 'getSpreads' + '&key=' + key + '&rows=' + (rows ? rows : 10) + '&page=' + (page ? page : 1))
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
