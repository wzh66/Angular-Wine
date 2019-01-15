import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FrontListComponent} from './list/list.component';
import {FrontItemComponent} from './item/item.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'list', pathMatch: 'full'
  },
  {
    path: 'list',
    component: FrontListComponent,
  },
  {
    path: 'item/:id',
    component: FrontItemComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule {
}
