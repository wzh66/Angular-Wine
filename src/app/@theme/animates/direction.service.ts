import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DirectionService {
  private status = new BehaviorSubject({
    direction: '',
    scrollTop: 0,
    scrollHeight: '',
    clientHeight: ''
  });

  constructor() {
  }

  get() {
    return this.status.asObservable();
  }

  set(status) {
    this.status.next(status);
  }
}
