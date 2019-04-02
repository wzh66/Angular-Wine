import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from '../utils/loader.service';
import {Observable, of as observableOf} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {formData} from '../../utils/utils';

@Injectable({providedIn: 'root'})
export class StoreService {

  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient, private load: LoaderService) {
  }

  get(body): Observable<any> {
    return this.http.post(this.prefix_url + 'getStories', formData(body))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  protected processResult(res): Observable<any> {
    if (res.code === '0000') {
      return observableOf(res.result);
    } else {
      return observableOf(null);
    }
  }
}
