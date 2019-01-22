import {Component, HostBinding, OnInit} from '@angular/core';
import {Slide} from '../../../@theme/animates/router.animation';

@Component({
  selector: 'app-front-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [Slide]
})
export class FrontListComponent implements OnInit {
  // 路由动画 开始
  /*@HostBinding('@slide') get slide() {
    return 'right';
  }*/

  // 路由动画 结束
  constructor() { }

  ngOnInit() {
  }

}
