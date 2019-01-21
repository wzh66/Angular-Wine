import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MatButtonModule, MatIconModule} from '@angular/material';
import {FabModule} from './modules/fab/fab.module';

const THIRD_PART = [MatButtonModule, MatIconModule, FabModule];

import {OverlayModule} from './modules/overlay';
import {MenuModule} from './modules/menu/menu.module';
import {HeaderModule} from './modules/header/header.module';
import {FooterModule} from './modules/footer/footer.module';
import {ContentModule} from './modules/content/content.module';

import {COMPONENTS, DIRECTIVES} from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    THIRD_PART,
    MenuModule.forRoot(),
    HeaderModule.forRoot(),
    FooterModule.forRoot(),
    ContentModule.forRoot(),
    OverlayModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    THIRD_PART,
    MenuModule,
    HeaderModule,
    FooterModule,
    ContentModule,
    OverlayModule,
    ...DIRECTIVES,
    ...COMPONENTS
  ],
  declarations: [...DIRECTIVES, ...COMPONENTS],
  entryComponents: [COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [],
    };
  }
}
