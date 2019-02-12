import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupItemComponent} from './item/item.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'list', pathMatch: 'full'
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
