import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {DialogService} from 'ngx-weui';

@Injectable({providedIn: 'root'})
export class ProdService {
  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient, private dialogSvc: DialogService) {
  }

  list(cid, word?, ord?, page?): Observable<any> {
    return this.http.get(this.prefix_url + 'getProductList' + '&cid=' + cid + '&word=' + word + '&ord=' + ord + '&page=' + page)
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
    } else if (res.code === '1001') {
      return observableOf(res.result);
    } else {
      this.dialogSvc.show({title: '', content: res.msg, confirm: '我知道了', cancel: ''}).subscribe();
    }
  }
}
