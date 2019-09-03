import {Component, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, Event, NavigationStart, NavigationEnd} from '@angular/router';
import {RouterAnimation} from './@theme/animates/router.animation';

import {DirectionService} from './@theme/animates/direction.service';
import {MenuService} from './@theme/modules/menu/menu.service';
import {WxService} from './@theme/modules/wx';
import {AuthService} from './pages/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [RouterAnimation],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  menuShow = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private directionSvc: DirectionService,
              private menuSvc: MenuService,
              private wxSvc: WxService,
              private authSvc: AuthService) {

    router.events.subscribe((event: Event) => {
      // if (event instanceof NavigationStart) {
      //   console.log(this.route.snapshot.queryParams);
      //   directionSvc.set(event.url === this.routeHistory[this.routeHistory.length - 2] ? 'right' : 'left');
      // }
      if (event instanceof NavigationEnd) {
        const referee = this.route.snapshot.queryParams.referee;
        if (referee) {
          this.authSvc.referee(referee);
        }
        // this.routeHistory.push(event.url);
      }
    });
    menuSvc.get().subscribe(res => {
      this.menuShow = res;
    });

    wxSvc.config({link: this.setLink(window.location.href)}).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
      // this.status = `注册失败，原因：${err}`;
    });
  }

  setLink(link) {
    if (link && link.indexOf('referee') === -1) {
      if (link.indexOf('?') === -1) {
        link = link + '?referee=' + this.authSvc.getUid();
      } else {
        link = link + '&referee=' + this.authSvc.getUid();
      }
    }
    return link;
  }

  menu() {
    this.menuSvc.hide();
  }
}
