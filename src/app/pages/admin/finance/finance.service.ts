import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {formData} from '../../../utils/utils';

@Injectable({providedIn: 'root'})
export class FinanceService {

  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient) {
  }

  withdrawal(body): Observable<any> {
    return this.http.post(this.prefix_url + 'withdrawals', formData(body))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  getWithdrawals(key, page?): Observable<any> {
    return this.http.get(this.prefix_url + 'getMyApplymentionData' + '&key=' + key + '&page=' + (page ? page : 1))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  uploadWxQrCode(body: { key: string, file: any }) {
    return this.http.post(this.prefix_url + 'uploadWxQrCode', formData(body))
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
