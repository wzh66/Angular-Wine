import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {RouterAnimation} from './@theme/animates/router.animation';

import {DirectionService} from './@theme/animates/direction.service';
import {MenuService} from './@theme/modules/menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [RouterAnimation],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  menuShow = false;

  constructor(private router: Router, private directionSvc: DirectionService, private menuSvc: MenuService) {
    /*router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        directionSvc.set(event.url === this.routeHistory[this.routeHistory.length - 2] ? 'right' : 'left');
      }
      if (event instanceof NavigationEnd) {
        this.routeHistory.push(event.url);
      }
    });*/
    menuSvc.get().subscribe(res => {
      this.menuShow = res;
    });
  }

  menu() {
    this.menuSvc.hide();
  }
}
