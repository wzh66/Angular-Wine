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
  /*@HostBinding('@slide') get slide() {
    return 'left';
  }*/

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

  albumConfig = {
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: 'auto',
    pagination: true
  };

  imgs = ['/assets/images/banner/1.png'];
  hots = ['/assets/images/hots/1.png', '/assets/images/hots/2.png', '/assets/images/hots/3.png', '/assets/images/hots/4.png'];
  news = [
    {title: '草莓奶油蛋糕', desc: '甜润奶油，与草莓的自然甜度搭配', price: '228', unit: '元/2.0磅', img: '/assets/images/news/1.png'},
    {title: '百利甜情人', desc: '爱尔兰百利甜酒/新西兰奶油/云南玫瑰甘露', price: '228', unit: '元/2.0磅', img: '/assets/images/news/2.png'}
  ];
  direction;

  constructor(private location: LocationStrategy,
              private directionSvc: DirectionService,
              private overlaySvc: OverlayService) {
    this.directionSvc.get().subscribe(res => {
      this.direction = res.direction;
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
