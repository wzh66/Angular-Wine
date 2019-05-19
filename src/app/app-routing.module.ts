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
