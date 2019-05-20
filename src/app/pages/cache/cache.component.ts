import {Component, HostBinding, OnInit} from '@angular/core';
import {Slide} from '../../@theme/animates/router.animation';

import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-cache',
  templateUrl: './cache.component.html',
  styleUrls: ['./cache.component.scss'],
  animations: [Slide]
})
export class CacheComponent implements OnInit {
  // 路由动画 开始
  /*@HostBinding('@slide') get slide() {
    return 'right';
  }*/
  accessToken;

  // 路由动画 结束
  constructor(public authSvc: AuthService) {
    this.accessToken = authSvc.getToken();
  }

  ngOnInit() {
  }

}
