import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {DialogService} from 'ngx-weui';

@Injectable({providedIn: 'root'})
export class ShareService {

  constructor(private http: HttpClient,
              private dialogSvc: DialogService) {
  }

  get(key, page?): Observable<any> {
    return this.http.get('/wApi/interface/call.html?action=getInvites&key=' + key + '&page=' + (page ? page : 1))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  protected processResult(res): Observable<any> {
    if (res.code === '0000') {
      return observableOf(res.result);
    } else if (res.code === '1001') {
    } else {
      this.dialogSvc.show({title: '', content: res.msg, confirm: '我知道了', cancel: ''}).subscribe();
    }
  }
}