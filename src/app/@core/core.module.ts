import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

/*import {RouteReuseStrategy} from '@angular/router';*/
/*import {RouteStrategy} from './strategies/route.strategy';*/

import {throwIfAlreadyLoaded} from './module-import-guard';
import {INTERCEPTORS} from './interceptors';

export const CORE_PROVIDERS = [
  ...INTERCEPTORS
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...CORE_PROVIDERS,
        /*{provide: RouteReuseStrategy, useClass: RouteStrategy}*/
      ],
    };
  }
}
