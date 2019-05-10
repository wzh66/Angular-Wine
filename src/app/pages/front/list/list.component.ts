import {Component, ViewChild, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Slide} from '../../../@theme/animates/router.animation';
import {FooterService} from '../../../@theme/modules/footer/footer.service';
import {CategoryService} from '../../../@core/data/category.service';
import {ProdService} from './list.service';
import {InfiniteLoaderComponent} from 'ngx-weui';
import {timer as observableTimer} from 'rxjs';

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
  items = [];
  page = 1;
  typeId;
  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private route: ActivatedRoute,
              private footerSvc: FooterService,
              private categorySvc: CategoryService,
              private prodService: ProdService) {
    footerSvc.setActive(1);
    categorySvc.get().subscribe(res => {
      this.categories = res;
    });
    route.queryParamMap.subscribe(() => {
      this.page = 1;
      this.typeId = this.route.snapshot.queryParams['typeId'] || '';
      prodService.list(this.typeId, '', '', this.page).subscribe(res => {
        this.items = res;
      });
    });
  }

  ngOnInit() {
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(1500).subscribe(() => {
      this.page = this.page + 1;

      // 获取当前页数据
      this.prodService.list(this.typeId, '', '', this.page).subscribe(res => {
        this.items = this.items.concat(res);
        if (res.length < 20) {
          comp.setFinished();
          return;
        }
      });
      comp.resolveLoading();
    });
  }

}
