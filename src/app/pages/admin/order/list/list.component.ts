import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {timer as observableTimer} from 'rxjs';

import {DialogService, InfiniteLoaderComponent} from 'ngx-weui';

import {Slide} from '../../../../@theme/animates/router.animation';
import {FooterService} from '../../../../@theme/modules/footer/footer.service';
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
  orderNo;

  constructor(private route: ActivatedRoute,
              private location: LocationStrategy,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private orderSvc: OrderService,
              private dialogSvc: DialogService) {
    footerSvc.setActive(3);
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.route.queryParamMap.subscribe(status => {
      this.status = this.route.snapshot.queryParams['status'] || '';
      this.orderSvc.list(this.key, this.status).subscribe(res => {
        console.log(res);
        this.orders = res.result.list;
      });
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(1500).subscribe(() => {
      this.page = this.page + 1;
      // 获取当前页数据
      this.orderSvc.list(this.key, this.status, this.page).subscribe(res => {
        if (res.code === '0000') {
          this.orders = this.orders.concat(res.result.list);
          if (this.page >= res.result.totalPages) {
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

  receive(orderNo) {
    this.dialogSvc.show({title: '', content: '您确定已收到商品？', cancel: '取消', confirm: '确定'}).subscribe(value => {
      if (value.value) {
        this.orderSvc.updateOrderToComp(this.authSvc.getKey(), orderNo).subscribe(res => {
          this.status = 3;
        });
      }
    });

  }

}
