import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guard/_guard';
import {IndexComponent} from './pages/index/index.component';
import {CacheComponent} from './pages/cache/cache.component';
import {RedirectComponent} from './pages/redirect/redirect.component';

import {MsgSuccessComponent} from './pages/msg/success/success.component';
import {MsgInfoComponent} from './pages/msg/info/info.component';
import {MsgErrorComponent} from './pages/msg/error/error.component';
import {MsgRedComponent} from './pages/msg/red/red.component';
import {SearchComponent} from './@theme/modules/search-bar/search.component';

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
    loadChildren: () => import('./pages/front/front.module').then(m => m.FrontModule),
    data: {state: 'front'}
  },
  {
    path: 'group',
    loadChildren: () => import('./pages/group/group.module').then(m => m.GroupModule),
    data: {state: 'front'}
  },
  /*{
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    data: {state: 'admin'}
  },*/
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
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
  {path: 'msg/success', component: MsgSuccessComponent},
  {path: 'msg/info', component: MsgInfoComponent},
  {path: 'msg/red', component: MsgRedComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
