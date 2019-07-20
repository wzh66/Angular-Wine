import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupListComponent} from './list/list.component';
import {GroupItemComponent} from './item/item.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'item', pathMatch: 'full'
  },
  {
    path: 'list',
    component: GroupListComponent,
  },
  {
    path: 'item/:id',
    component: GroupItemComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule {
}
