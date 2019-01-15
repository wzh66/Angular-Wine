import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {COMPONENTS} from './index';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, RouterModule, ...COMPONENTS],
  declarations: [...COMPONENTS],
  entryComponents: [],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [],
    };
  }
}
