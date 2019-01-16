import {Component, HostBinding, OnInit, OnDestroy} from '@angular/core';
import {LocationStrategy} from '@angular/common';
import {Slide} from '../../@theme/animates/router.animation';

import {OverlayService} from '../../@theme/modules/overlay';
import {DirectionService} from '../../@theme/animates/direction.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [Slide]
})
export class IndexComponent implements OnInit, OnDestroy {
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
  direction;

  constructor(private location: LocationStrategy,
              private directionSvc: DirectionService,
              private overlaySvc: OverlayService) {
    this.directionSvc.getScrollingStatus().subscribe(res => {
      this.direction = res;
    });
  }

  open() {
    this.overlaySvc.show();
  }

  close() {
    this.overlaySvc.hide();
  }

  onClick(e) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
