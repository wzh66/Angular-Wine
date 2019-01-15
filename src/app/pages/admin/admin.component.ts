import {Component, HostBinding, OnInit} from '@angular/core';
import {Slide} from '../../@theme/animates/router.animation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [Slide]
})
export class AdminComponent implements OnInit {
  // 路由动画 开始
  @HostBinding('@slide') get slide() {
    return 'right';
  }

  // 路由动画 结束
  constructor() {
  }

  ngOnInit() {
  }

}
