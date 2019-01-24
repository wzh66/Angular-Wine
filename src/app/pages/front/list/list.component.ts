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

  config = {
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: 'auto',
    pagination: false
  };

  slides;
  selected;
  items = [
    {id: 0, title: '百利甜情人', desc: '甜润奶油，与草莓的自然甜度搭配', price: '228', unit: '元/2.0磅', img: '/assets/images/items/1.jpg'},
    {id: 1, title: '黑巧克力慕斯', desc: '爱尔兰百利甜酒/新西兰奶油/云南玫瑰甘露', price: '268', unit: '元/2.0磅', img: '/assets/images/items/2.jpg'},
    {id: 2, title: '布朗熊&可妮兔', desc: '爱尔兰百利甜酒/新西兰奶油/云南玫瑰甘露', price: '298', unit: '元/2.0磅', img: '/assets/images/items/3.jpg'},
    {id: 3, title: '小重组(迷迭香套餐)', desc: '爱尔兰百利甜酒/新西兰奶油/云南玫瑰甘露', price: '268', unit: '元/2.0磅', img: '/assets/images/items/4.jpg'}
  ];

  constructor() {
  }

  ngOnInit() {
    const slides = [];
    Array.from(['翻糖蛋糕', '奶油蛋糕', '慕斯蛋糕', '塔形蛋糕', '西点', '饮品', '现烤面包', '巧克力', '饼干'], (item, i) => {
      slides.push({id: i, name: item});
    });
    this.slides = slides;
    this.selected = this.slides[0];
  }

  select(item) {
    this.selected = item;
  }

}
