import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MatButtonModule, MatIconModule} from '@angular/material';
import {FabModule} from './modules/fab/fab.module';

const THIRD_PART = [MatButtonModule, MatIconModule, FabModule];

import {OverlayModule} from './modules/overlay';

import {COMPONENTS, DIRECTIVES} from './index';

@NgModule({
  imports: [CommonModule, RouterModule, THIRD_PART, OverlayModule.forRoot()],
  exports: [CommonModule, RouterModule, THIRD_PART, OverlayModule, ...DIRECTIVES, ...COMPONENTS],
  declarations: [...DIRECTIVES, ...COMPONENTS],
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
