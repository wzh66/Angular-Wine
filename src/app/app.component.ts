import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {RouterAnimation} from './@theme/animates/router.animation';

import {DirectionService} from './@theme/animates/direction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [RouterAnimation],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(private router: Router, private directionSvc: DirectionService) {
    /*router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        directionSvc.set(event.url === this.routeHistory[this.routeHistory.length - 2] ? 'right' : 'left');
      }
      if (event instanceof NavigationEnd) {
        this.routeHistory.push(event.url);
      }
    });*/
  }

  /*getState(outlet) {
    return outlet.activatedRouteData['page'] || 'start';
  }*/
}
