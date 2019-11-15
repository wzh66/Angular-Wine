import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {IndexComponent} from './pages/index/index.component';
import {RedirectComponent} from './pages/redirect/redirect.component';

import {MsgSuccessComponent} from './pages/msg/success/success.component';
import {MsgInfoComponent} from './pages/msg/info/info.component';

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
    loadChildren: () => import('./pages/front/front.module').then(m => m.FrontModule),
    data: {state: 'front'}
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    data: {state: 'admin'}
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
