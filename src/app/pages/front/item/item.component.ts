import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-front-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class FrontItemComponent implements OnInit {
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

  constructor() {
  }

  ngOnInit() {
  }

}
