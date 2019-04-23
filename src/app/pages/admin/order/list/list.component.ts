import {Component, HostBinding, OnInit} from '@angular/core';
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
  key;
  orders;

  constructor(private authSvc: AuthService,
              private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.orderSvc.get(this.key).subscribe(res => {
      console.log(res);
      this.orders = res;
    });
  }

}
