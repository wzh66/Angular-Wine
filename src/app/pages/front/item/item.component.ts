import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ToastService} from 'ngx-weui';
import {CartService} from '../../admin/cart/cart.service';
import {FooterService} from '../../../@theme/modules/footer/footer.service';
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
      delay: 3000
    }
  };

  loading = false;

  direction;

  constructor(private route: ActivatedRoute,
              private directionSvc: DirectionService,
              private toastSvc: ToastService,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private cartSvc: CartService,
              private prodSvc: ProdService,
              private router: Router) {
    footerSvc.setActive(1);
  }

  ngOnInit() {
    this.prodSvc.item(this.route.snapshot.params['id']).subscribe(res => {
      this.product = res.product;
      this.specs = res.specs;
      this.spec = this.specs[0];
    });

    this.directionSvc.get().subscribe(res => {
      this.direction = res.direction;
    });
  }

  select(spec) {
    this.spec = spec;
  }

  checkout() {
    this.addCart(true);
  }

  addCart(isRedirect?) {
    this.toastSvc.loading('操作中', 0);
    this.cartSvc.save({
      key: this.authSvc.getKey(),
      productId: this.product.productid,
      specId: this.spec.id,
      qty: this.qty,
      remark: ''
    }).subscribe(res => {
      console.log(res);
      this.cartSvc.updateCount(res.goodsCount);
      this.toastSvc.hide();
      this.toastSvc.success('成功加入购物车');
      if (isRedirect) {
        this.router.navigate(['/admin/cart']);
      }
    });
  }

}
