import {NgModule} from '@angular/core';
import {FrontRoutingModule} from './front-routing.module';

import {FRONT_PAGES} from './index';

@NgModule({
  imports: [
    FrontRoutingModule
  ],
  declarations: [
    FRONT_PAGES
  ]
})
export class FrontModule {
}
