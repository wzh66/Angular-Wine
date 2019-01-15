import {Injectable} from '@angular/core';
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import {FOOTER_NAV_ITEMS} from './footer.config';

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

  constructor() {
  }

  set(items) {
    this.items.next(Object.assign(this.items, items));
  }

  get(): Observable<any> {
    return this.items.asObservable();
  }
}
