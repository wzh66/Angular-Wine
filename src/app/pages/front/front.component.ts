import {Component, HostBinding, OnInit} from '@angular/core';
import {Slide} from '../../@theme/animates/router.animation';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss'],
  animations: [Slide]
})
export class FrontComponent implements OnInit {
  // 路由动画 开始
  @HostBinding('@slide') get slide() {
    return 'left';
  }

  // 路由动画 结束
  constructor() {
  }

  ngOnInit() {
  }

}
