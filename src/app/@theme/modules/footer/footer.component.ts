import {Component, Input} from '@angular/core';
import {CartService} from '../../../pages/admin/cart/cart.service';
import {FooterService} from './footer.service';
import {DirectionService} from '../../animates/direction.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() show = true;

  direction;
  items;

  constructor(private directionSvc: DirectionService,
              private cartSvc: CartService,
              private footer: FooterService) {
    footer.get().subscribe(items => {
      this.items = items;
    });
    cartSvc.getCount().subscribe(res => {
      this.items[2].badge = res;
    });
    directionSvc.get().subscribe(res => {
      this.direction = res.direction;
    });
    footer.updateCartNum();
  }
}
