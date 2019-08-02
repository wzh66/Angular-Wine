import {Component, OnInit} from '@angular/core';

import {timer as observableTimer} from 'rxjs';

import {InfiniteLoaderComponent} from 'ngx-weui';
import {AuthService} from '../../../auth/auth.service';
import {GroupService} from '../../group.service';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {FooterService} from '../../../../@theme/modules/footer/footer.service';
import {OrderService} from '../../../admin/order/order.service';


@Component({
  selector: 'app-group-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class GroupOrderListComponent implements OnInit {
  status: any = this.route.snapshot.queryParams['status'] || '';
  key = this.authSvc.getKey();
  orders = [];
  page = 1;

  constructor(private route: ActivatedRoute,
              private location: LocationStrategy,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private groupSvc: GroupService) {
    footerSvc.setActive(3);
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(status => {
      console.log(status);
      this.status = this.route.snapshot.queryParams['status'] || '';
      this.groupSvc.orders(this.key, this.status).subscribe(res => {
        this.orders = res.list;
        console.log(this.orders);
      });
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(1500).subscribe(() => {
      this.page = this.page + 1;
      // 获取当前页数据
      this.groupSvc.orders(this.key, this.status, this.page).subscribe(res => {
        if (res.code === '0000') {
          this.orders = this.orders.concat(res.list);
          if (this.page >= res.totalPages) {
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
