import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupListComponent} from './list/list.component';
import {GroupItemComponent} from './item/item.component';
import {GroupOrderListComponent} from './order/list/list.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'item', pathMatch: 'full'
  },
  {
    path: 'list',
    component: GroupListComponent
  },
  {
    path: 'item/:id',
    component: GroupItemComponent
  },
  {
    path: 'order/list',
    component: GroupOrderListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule {
}
