import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {timer as observableTimer} from 'rxjs';

import {InfiniteLoaderComponent} from 'ngx-weui';

import {Slide} from '../../../../@theme/animates/router.animation';
import {AuthService} from '../../../auth/auth.service';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [Slide]
})
export class AdminOrderListComponent implements OnInit {
// 路由动画 开始
  /*@HostBinding('@slide') get slide() {
    return 'right';
  }*/

  // 路由动画 结束

  status: any = this.route.snapshot.queryParams['status'] || '';
  key;
  orders = [];
  page = 1;

  constructor(private route: ActivatedRoute,
              private location: LocationStrategy,
              private authSvc: AuthService,
              private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.route.queryParamMap.subscribe(status => {
      this.status = this.route.snapshot.queryParams['status'] || '';
      this.orderSvc.list(this.key, this.status).subscribe(res => {
        this.orders = res.result;
      });
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(1500).subscribe(() => {
      this.page = this.page + 1;

      // 获取当前页数据
      this.orderSvc.list(this.key, this.page).subscribe(res => {
        if (res.code === '0000') {
          this.orders = this.orders.concat(res.result);
          if (res.result.length < 10) {
            comp.setFinished();
            return;
          }
        }
      });

      comp.resolveLoading();
    });
  }

  onCancel(e) {
    if (e === 'cancel') {
      this.location.back();
    }
  }

}
