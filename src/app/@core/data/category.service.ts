import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DialogService} from 'ngx-weui';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class CategoryService {
  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient, private dialogSvc: DialogService) {
  }

  get(): Observable<any> {
    return this.http.get(this.prefix_url + 'typeList').pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  protected processResult(res): Observable<any> {
    if (res.code === '0000') {
      return observableOf(res.result);
    } else if (res.code === '1001') {
      return observableOf(res.result);
    } else {
      this.dialogSvc.show({title: '', content: res.msg, confirm: '我知道了', cancel: ''}).subscribe();
    }
  }
}
