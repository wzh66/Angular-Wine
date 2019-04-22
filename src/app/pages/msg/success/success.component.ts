import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {SysService} from '../../../@core/data/sys.service';
import {AuthService} from '../../auth/auth.service';
import {OrderService} from '../../admin/order/order.service';

@Component({
  selector: 'app-msg-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class MsgSuccessComponent implements OnInit {

  web_host = window.location.origin;
  sysConfig;
  type;
  appKey;
  orderNo;
  orders;

  constructor(private route: ActivatedRoute,
              private sysSvc: SysService,
              private authSvc: AuthService,
              private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.type = this.route.snapshot.queryParams['type'];
    this.orderNo = this.route.snapshot.queryParams['orderNo'];
    this.appKey = this.authSvc.getStorageKey();
    this.sysSvc.get().subscribe(res => {
      this.sysConfig = res;
    });

    if (this.type === 'cart') {
      this.orderSvc.getOrderInfo(this.appKey, this.orderNo).subscribe(res => {
        this.orders = res;
        console.log(this.orders);
      });
    }
  }

}
