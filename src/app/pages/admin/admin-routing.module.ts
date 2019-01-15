import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminCartComponent} from './cart/cart.component';
import {AdminOrderListComponent} from './order/list/list.component';
import {AdminOrderItemComponent} from './order/item/item.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'order/list', pathMatch: 'full',
  },
  {
    path: 'cart',
    component: AdminCartComponent,
  },
  {
    path: 'order/list',
    component: AdminOrderListComponent,
  },
  {
    path: 'order/item/:id',
    component: AdminOrderItemComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
