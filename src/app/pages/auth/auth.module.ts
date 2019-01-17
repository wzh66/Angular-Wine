import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {AuthRoutingModule} from './auth-routing.module';

import {FRONT_PAGES} from './index';

@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule.forRoot()
  ],
  declarations: [
    FRONT_PAGES
  ]
})
export class AuthModule {
}
