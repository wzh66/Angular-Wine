import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminCartComponent} from './cart/cart.component';
import {AdminCheckoutComponent} from './checkout/checkout.component';
import {AdminHomeComponent} from './home/home.component';
import {AdminOrderListComponent} from './order/list/list.component';
import {AdminOrderItemComponent} from './order/item/item.component';

import {AdminSettingAddressComponent} from './setting/address/address.component';
import {AdminSettingAddressEditComponent} from './setting/address/edit/edit.component';

import {AdminFinanceComponent} from './finance/finance.component';
import {AdminFinanceRecordsComponent} from './finance/records/records.component';
import {AdminFinanceWithdrawComponent} from './finance/withdraw/withdraw.component';

import {AdminProfileComponent} from './profile/profile.component';

import {AdminShareComponent} from './share/share.component';
import {AdminShareListComponent} from './share/list/list.component';

import {AdminCommissionListComponent} from './commission/list/list.component';
import {AdminSearchComponent} from './search/search.component';
import {AdminPartnerComponent} from './partner/partner.component';

import {AdminMarketingComponent} from './marketing/marketing.component';
import {AdminMarketingBonusComponent} from './marketing/bonus/bonus.component';
import {AdminMarketingCustomComponent} from './marketing/custom/custom.component';
import {AdminMarketingCommissionListComponent} from './marketing/commission/list/list.component';
import {AdminCashCardComponent} from './cash-card/cash-card.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'order/list', pathMatch: 'full'
  },
  {
    path: 'home',
    component: AdminHomeComponent
  },
  {
    path: 'cart',
    component: AdminCartComponent
  },
  {
    path: 'checkout',
    component: AdminCheckoutComponent
  },
  {
    path: 'search',
    component: AdminSearchComponent
  },
  {
    path: 'order/list',
    component: AdminOrderListComponent
  },
  {
    path: 'order/item/:no',
    component: AdminOrderItemComponent
  },
  {
    path: 'commission/list',
    component: AdminCommissionListComponent
  },
  {path: 'setting/address', component: AdminSettingAddressComponent},
  {path: 'setting/address/edit/:id', component: AdminSettingAddressEditComponent},

  {path: 'finance', component: AdminFinanceComponent},
  {path: 'finance/records', component: AdminFinanceRecordsComponent},
  {path: 'finance/withdraw', component: AdminFinanceWithdrawComponent},
  {path: 'profile', component: AdminProfileComponent},
  {path: 'share', component: AdminShareComponent},
  {path: 'share/list', component: AdminShareListComponent},
  {path: 'partner', component: AdminPartnerComponent},
  {path: 'marketing', component: AdminMarketingComponent},
  {path: 'marketing/bonus', component: AdminMarketingBonusComponent},
  {path: 'marketing/custom', component: AdminMarketingCustomComponent},
  {path: 'marketing/commission/list', component: AdminMarketingCommissionListComponent},
  {path: 'cash', component: AdminCashCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
