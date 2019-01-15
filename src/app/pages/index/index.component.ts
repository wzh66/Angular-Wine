import {Component, HostBinding, OnInit} from '@angular/core';
import {Slide} from '../../@theme/animates/router.animation';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [Slide]
})
export class IndexComponent implements OnInit {
  // 路由动画 开始
  @HostBinding('@slide') get slide() {
    return 'left';
  }

  // 路由动画 结束

  config = {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    pagination: true,
    autoplay: {
      delay: 3000,
    }
  };

  imgs = ['/assets/images/banner/2.png', '/assets/images/banner/3.png'];

  constructor() {
  }

  ngOnInit() {
  }

}
