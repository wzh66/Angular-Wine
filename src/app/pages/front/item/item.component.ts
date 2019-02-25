import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProdService} from '../list/list.service';

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

  constructor(private route: ActivatedRoute, private prodSvc: ProdService) {
  }

  ngOnInit() {
    this.prodSvc.item(this.route.snapshot.params['id']).subscribe(res => {
      this.product = res.product;
      this.specs = res.specs;
      this.spec = this.specs[0];
      console.log(res);
    });
  }

  checkout(e) {
    if (!e) {
      return false;
    }

    console.log(e);
  }

}
