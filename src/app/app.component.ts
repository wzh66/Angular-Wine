import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {RouterAnimation} from './@theme/animates/router.animation';

import {DirectionService} from './@theme/animates/direction.service';
import {MenuService} from './@theme/modules/menu/menu.service';
import {WxService} from './@theme/modules/wx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [RouterAnimation],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  menuShow = false;
  sysConfig = {
    title: '新美食计划',
    desc: '新美食计划',
    link: 'http://www.newplan123.com/index',
    imgUrl: 'http://www.newplan123.com/assets/images/logo.png',
    success: () => {
    }
  };

  constructor(private router: Router, private directionSvc: DirectionService, private menuSvc: MenuService, private wxSvc: WxService) {
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

    wxSvc.defaultConfig(this.sysConfig);

    wxSvc.config({}).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
      // this.status = `注册失败，原因：${err}`;
    });
  }

  menu() {
    this.menuSvc.hide();
  }
}
