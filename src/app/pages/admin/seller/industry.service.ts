import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {formData} from '../../../utils/utils';

@Injectable({providedIn: 'root'})
export class IndustryService {
  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient) {
  }

  get(key: string) {
    return this.http.get(this.prefix_url + 'getIndustries&key=' + key)
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
