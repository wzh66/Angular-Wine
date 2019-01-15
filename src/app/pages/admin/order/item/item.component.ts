import {Component, OnInit} from '@angular/core';
import {Slide} from '../../../../@theme/animates/router.animation';

@Component({
  selector: 'app-admin-order-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [Slide]
})
export class AdminOrderItemComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
