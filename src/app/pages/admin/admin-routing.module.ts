import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminCartComponent} from './cart/cart.component';
import {AdminHomeComponent} from './home/home.component';
import {AdminOrderListComponent} from './order/list/list.component';
import {AdminOrderItemComponent} from './order/item/item.component';

import {AdminSettingAddressComponent} from './setting/address/address.component';
import {AdminSettingAddressAddComponent} from './setting/address/add/add.component';
import {AdminSettingAddressEditComponent} from './setting/address/edit/edit.component';

import {AdminWithdrawComponent} from './withdraw/withdraw.component';
import {AdminResellerComponent} from './reseller/reseller.component';
import {AdminSellerComponent} from './seller/seller.component';

import {AdminProfileComponent} from './profile/profile.component';

import {AdminShareComponent} from './share/share.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'order/list', pathMatch: 'full',
  },
  {
    path: 'home',
    component: AdminHomeComponent,
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
  },
  {path: 'setting/address', component: AdminSettingAddressComponent},
  {path: 'setting/address/add', component: AdminSettingAddressAddComponent},
  {path: 'setting/address/edit/:id', component: AdminSettingAddressEditComponent},

  {path: 'withdraw', component: AdminWithdrawComponent},
  {path: 'reseller', component: AdminResellerComponent},
  {path: 'seller', component: AdminSellerComponent},
  {path: 'profile', component: AdminProfileComponent},
  {path: 'share', component: AdminShareComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
