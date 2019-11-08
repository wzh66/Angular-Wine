import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {formData} from '../../../../utils/utils';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {DialogService} from 'ngx-weui';
import {AuthService} from '../../../auth/auth.service';

@Injectable({providedIn: 'root'})
export class AddressService {

  constructor(@Inject('PREFIX_URL') private prefix_url,
              private http: HttpClient,
              private dialogSvc: DialogService) {
  }

  get(id?): Observable<any> {
    return this.http.get(this.prefix_url + (id ? 'getMyAddr' : 'getMyAddrList') + '&id=' + (id ? id : ''))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  save(body): Observable<any> {
    return this.http.post(this.prefix_url + 'saveMyAddr', formData(body)).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  del(body): Observable<any> {
    return this.http.post(this.prefix_url + 'delMyAddr', formData(body)).pipe(observableMargeMap((res: any) => {
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
