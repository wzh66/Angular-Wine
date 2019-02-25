import {Component, HostBinding, OnInit} from '@angular/core';
import {Slide} from '../../../@theme/animates/router.animation';
import {CategoryService} from '../../../@core/data/category.service';
import {ProdService} from './list.service';

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
  categories = [];
  selected;
  items = [];

  constructor(private categorySvc: CategoryService, private prodService: ProdService) {
    categorySvc.get().subscribe(res => {
      this.categories = res;
      this.selected = this.categories[0];
    });
    prodService.list('', '', '', 1).subscribe(res => {
      this.items = res;
    });
  }

  ngOnInit() {
  }

  select(item) {
    this.selected = item;
  }

}
