import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {FrontRoutingModule} from './front-routing.module';

import {FRONT_PAGES} from './index';

@NgModule({
  imports: [
    FrontRoutingModule,
    ThemeModule.forRoot()
  ],
  declarations: [
    FRONT_PAGES
  ]
})
export class FrontModule {
}
