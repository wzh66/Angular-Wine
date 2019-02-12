import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-group-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class GroupItemComponent implements OnInit {
  imgs = ['/assets/images/banner/1.png'];
  qty = 1;
  loading = true;
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

  onClick(e) {
    console.log(e);
  }

}
