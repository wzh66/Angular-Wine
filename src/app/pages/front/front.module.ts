import {NgModule} from '@angular/core';
import {FrontRoutingModule} from './front-routing.module';
import {ThemeModule} from '../../@theme/theme.module';

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
