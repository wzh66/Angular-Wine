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
  aromas = [];
  prices = [];
  places = [];
  countries = [];
  vars = [];
  grapeCategories = [];
  importedCategories = [];
  @ViewChild(InfiniteLoaderComponent, {static: false}) il;

  constructor(private route: ActivatedRoute,
              private footerSvc: FooterService,
              private prodService: ProdService,
              private categorySvc: CategoryService) {
    footerSvc.setActive(1);
    route.queryParamMap.subscribe(() => {
      this.typeId = this.route.snapshot.queryParams['typeId'] || '';
      prodService.list(this.typeId).subscribe(res => {
        this.items = res;
      });
    });
    categorySvc.get().subscribe(res => {
      this.categories = res;
    });
    prodService.getAromas().subscribe(res => {
      this.aromas = res;
    });
    prodService.getPrices().subscribe(res => {
      this.prices = res;
    });
    prodService.getPlaces(0).subscribe(res => {
      this.places = res;
    });
    prodService.getPlaces(1).subscribe(res => {
      this.countries = res;
    });
    prodService.getVars().subscribe(res => {
      this.vars = res;
    });
    prodService.getCategorys(2).subscribe(res => {
      this.grapeCategories = res;
    });
    prodService.getCategorys(3).subscribe(res => {
      this.importedCategories = res;
    });
  }

  ngOnInit() {
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(1500).subscribe(() => {
      this.page = this.page + 1;

      // 获取当前页数据
      this.prodService.list(this.typeId).subscribe(res => {
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
