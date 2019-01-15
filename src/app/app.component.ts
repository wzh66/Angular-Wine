import {Component} from '@angular/core';
import {Router, Event, NavigationStart, NavigationEnd} from '@angular/router';
import {RouterAnimation} from './@theme/animates/router.animation';

import {DirectionService} from './@theme/animates/direction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [RouterAnimation]
})
export class AppComponent {
  routeHistory = [];
  scrollTop = 0;

  constructor(private router: Router, private directionSvc: DirectionService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        directionSvc.set(event.url === this.routeHistory[this.routeHistory.length - 2] ? 'right' : 'left');
      }
      if (event instanceof NavigationEnd) {
        this.routeHistory.push(event.url);
      }
    });
  }

  onScroll(e) {
    const top = e.target.scrollTop;
    let direction = '';
    if (top > this.scrollTop) {
      direction = 'down';
    } else {
      direction = 'up';
    }
    this.directionSvc.setScrollingStatus(direction);
    this.scrollTop = top;
  }

  getState(outlet) {
    return outlet.activatedRouteData['page'] || 'start';
  }
}
