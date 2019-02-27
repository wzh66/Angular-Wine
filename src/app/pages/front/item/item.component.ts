import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CartService} from '../../admin/cart/cart.service';
import {AuthService} from '../../auth/auth.service';
import {ProdService} from '../list/list.service';
import {DirectionService} from '../../../@theme/animates/direction.service';

@Component({
  selector: 'app-front-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class FrontItemComponent implements OnInit {
  product = null;
  specs = [];
  spec = null;
  imgs = ['/assets/images/banner/1.png'];
  qty = 1;
  config = {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    pagination: true,
    autoplay: {
      delay: 3000,
    }
  };

  loading = false;

  direction;

  constructor(private route: ActivatedRoute,
              private directionSvc: DirectionService,
              private authSvc: AuthService,
              private cartSvc: CartService,
              private prodSvc: ProdService) {
  }

  ngOnInit() {
    this.prodSvc.item(this.route.snapshot.params['id']).subscribe(res => {
      this.product = res.product;
      this.specs = res.specs;
      this.spec = this.specs[0];
      console.log(res);
    });

    this.directionSvc.get().subscribe(res => {
      this.direction = res.direction;
      console.log(this.direction);
    });
  }

  checkout(e) {
    if (!e) {
      return false;
    }

    console.log(e);
  }

  addCart() {
    this.cartSvc.save({
      key: this.authSvc.getKey(),
      productId: this.product.productid,
      specId: this.spec.id,
      qty: this.qty,
      remark: ''
    }).subscribe(res => {
      console.log(res);
    });
  }

}
