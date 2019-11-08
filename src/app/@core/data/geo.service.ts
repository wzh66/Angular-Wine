import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from '../utils/loader.service';
import {Observable, of as observableOf} from 'rxjs';
import {UserDto} from '../dto/user.dto';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {formData} from '../../utils/utils';

@Injectable({providedIn: 'root'})
export class GeoService {

  constructor(@Inject('PREFIX_URL') private prefix_url, private http: HttpClient, private load: LoaderService) {
  }

  get(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.load.loadScript('https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js ').then((res) => {
        resolve(res.loaded === true);
      }).catch(() => {
        resolve(false);
      });
    });
  }

  // getLocation(callback) {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(callback);
  //   } else {
  //     console.log('Geolocation is not supported by this browser.');
  //   }
  // }

  getPosition(body): Observable<any> {
    return this.http.post(this.prefix_url + 'getAddrByGps', formData(body))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  gps(body: { key?: string, addr: string, city: string }): Observable<any> {
    return this.http.post(this.prefix_url + 'getCoordinateByAddr', formData(body))
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
