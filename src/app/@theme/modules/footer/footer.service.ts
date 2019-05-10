import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {FOOTER_NAV_ITEMS} from './footer.config';

import {StorageService} from '../../../@core/utils/storage.service';
import {CartService} from '../../../pages/admin/cart/cart.service';

export interface Nav {
  page: string;
  icon: string;
  selectedIcon: string;
  name: string;
  selected: boolean;
  badge: 'new' | number;
}

@Injectable({providedIn: 'root'})
export class FooterService {

  items = new BehaviorSubject<Nav[]>(FOOTER_NAV_ITEMS);

  constructor(private storageSvc: StorageService, private cartSvc: CartService) {
  }

  set(items) {
    this.items.next(Object.assign(this.items, items));
  }

  get(): Observable<any> {
    return this.items.asObservable();
  }

  setActive(index) {
    this.get().subscribe(items => {
      console.log(items);
      items.forEach((item, i) => {
        console.log(item);
      });
      // items.forEach((item, i) => {
      //   items[i].selected = false;
      // });
      // items[index].selected = true;
      // this.set(items);
    });
    // this.get().subscribe(items => {
    //   const _items = items;
    //   console.log(_items);
    //   items.forEach((item, i) => {
    //     items[i].selected = false;
    //   });
    //   items[index].selected = true;
    //   this.set(items);
    // });
  }

  updateCartNum() {
    // if (this.storageSvc.get('accessToken')) {
    //   const accessToken = JSON.parse(this.storageSvc.get('accessToken'));
    //
    //   this.cartSvc.count(accessToken.key).subscribe(res => {
    //     if (res.code === '0000') {
    //       this.get().subscribe(items => {
    //         items[2].badge = res;
    //         this.set(items);
    //       });
    //     }
    //   });
    // }
  }
}
