import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthLoginComponent} from './login/login.component';
import {ForgotComponent} from './forgot/forgot.component';
import {AgreementComponent} from './agreement/agreement.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthLoginComponent,
  },
  {
    path: 'forgot',
    component: ForgotComponent,
  },
  {
    path: 'agreement',
    component: AgreementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
