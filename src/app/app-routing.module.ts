import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './pages/index/index.component';
import {FrontComponent} from './pages/front/front.component';
import {AdminComponent} from './pages/admin/admin.component';
import {CacheComponent} from './pages/cache/cache.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'front',
    component: FrontComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'cache',
    component: CacheComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
