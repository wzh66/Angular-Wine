import {Component, HostBinding, OnInit, OnDestroy} from '@angular/core';
import {LocationStrategy} from '@angular/common';
import {Slide} from '../../@theme/animates/router.animation';

import {OverlayService} from '../../@theme/modules/overlay';
import {DirectionService} from '../../@theme/animates/direction.service';
import {FooterService} from '../../@theme/modules/footer/footer.service';
import {CategoryService} from '../../@core/data/category.service';
import {IndexService} from './index.service';

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
    items: 4,
    slidesPerView: 'auto',
    pagination: true,
    autoplay: {
      delay: 3000
    }
  };

  albumConfig = {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    pagination: true,
    autoplay: {
      delay: 3000,
    }
  };

  imgs = ['/assets/images/banner/1.png'];
  hots = [];
  news = [];
  direction;
  categories = [];

  constructor(private location: LocationStrategy,
              private directionSvc: DirectionService,
              private overlaySvc: OverlayService,
              private footerSvc: FooterService,
              private categorySvc: CategoryService,
              private indexSvc: IndexService) {
    footerSvc.setActive(0);
    this.directionSvc.get().subscribe(res => {
      this.direction = res.direction;
    });
    this.indexSvc.get().subscribe(res => {
      this.hots = res.goodsList.filter(item => item.style === 'goods_xs');
      this.news = res.goodsList.filter(item => item.style === 'goods_xp');
    });
    this.categorySvc.get().subscribe(res => {
      this.categories = res;
    });
  }

  onClick(e) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
