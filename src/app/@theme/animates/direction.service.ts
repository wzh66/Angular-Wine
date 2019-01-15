import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DirectionService {
  private direction: string;
  private routeHistory = [];
  private scrollingStatus = new BehaviorSubject('');

  constructor() {
  }

  get() {
    return this.direction;
  }

  set(direction) {
    this.direction = direction;
  }

  push(path) {
    this.routeHistory.push(path);
  }

  getScrollingStatus() {
    return this.scrollingStatus.asObservable();
  }

  setScrollingStatus(status) {
    this.scrollingStatus.next(status);
  }
}
