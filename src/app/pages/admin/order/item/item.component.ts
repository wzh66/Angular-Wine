import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Slide} from '../../../../@theme/animates/router.animation';
import {AuthService} from '../../../auth/auth.service';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-admin-order-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [Slide]
})
export class AdminOrderItemComponent implements OnInit {
  key;
  order;
  orderNo = this.route.snapshot.params['no'];

  constructor(private route: ActivatedRoute,
              private authSvc: AuthService,
              private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.orderSvc.getOrderInfo(this.key, this.orderNo).subscribe(res => {
      console.log(res);
    });
  }

}
