import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';

import {ADMIN_PAGES} from './index';


@NgModule({
  imports: [
    AdminRoutingModule
  ],
  declarations: [ADMIN_PAGES]
})
export class AdminModule {
}
