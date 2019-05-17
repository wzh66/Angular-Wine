import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';
import {ThemeModule} from '../../@theme/theme.module';

import {ADMIN_PAGES} from './index';


@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule.forRoot(),
    ThemeModule
  ],
  declarations: [ADMIN_PAGES]
})
export class AdminModule {
}
