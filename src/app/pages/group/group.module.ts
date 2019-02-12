import {NgModule} from '@angular/core';
import {GroupRoutingModule} from './group-routing.module';
import {ThemeModule} from '../../@theme/theme.module';

import {GROUP_PAGES} from './index';

@NgModule({
  imports: [
    GroupRoutingModule,
    ThemeModule.forRoot()
  ],
  declarations: [
    GROUP_PAGES
  ]
})
export class GroupModule {
}
