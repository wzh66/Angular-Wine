import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './pages/index/index.component';
import {CacheComponent} from './pages/cache/cache.component';
import {RedirectComponent} from './pages/redirect/redirect.component';

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
    path: 'group',
    loadChildren: './pages/group/group.module#GroupModule',
    data: {state: 'front'}
  },
  {
    path: 'auth',
    loadChildren: './pages/auth/auth.module#AuthModule',
    data: {state: 'admin'}
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
  {
    path: 'redirect',
    component: RedirectComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
