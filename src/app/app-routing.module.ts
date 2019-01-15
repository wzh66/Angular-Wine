import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './pages/index/index.component';
import {CacheComponent} from './pages/cache/cache.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'index', pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'front',
    loadChildren: './pages/front/front.module#FrontModule',
    data: {state: 'front'}
  },
  {
    path: 'admin',
    loadChildren: './pages/admin/admin.module#AdminModule',
    data: {state: 'admin'}
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
