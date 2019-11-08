import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {formData} from '../../../utils/utils';

@Injectable({providedIn: 'root'})
export class SellerService {
  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient) {
  }

  get(key?) {
    return this.http.get(this.prefix_url + 'getMyStore&key=' + key)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  uploadStoreLogo(body: { key: string, file: any }) {
    return this.http.post(this.prefix_url + 'uploadStoreLogo', formData(body))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  create(body: {
    storeName: string,
    areaCode: string,
    address: string,
    industryId: number,
    phone: string,
    synopsis: string,
    contacts: string,
    pwd: string,
    x: string,
    y: string,
    logo: string,
    key: string,
    storeId: number
  }): Observable<any> {
    return this.http.post(this.prefix_url + 'createStore', formData(body)).pipe(observableMargeMap((res: any) => {
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
