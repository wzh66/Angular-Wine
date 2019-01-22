import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {SwiperModule} from 'ngx-swiper-wrapper';
import {WeUiModule} from 'ngx-weui';
import {MatButtonModule, MatIconModule} from '@angular/material';

const THIRD_PART = [MatButtonModule, MatIconModule, SwiperModule];

import {WxModule} from './modules/wx';
import {FabModule} from './modules/fab/fab.module';
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
    HttpClientModule,
    WeUiModule.forRoot(),
    THIRD_PART,
    FabModule,
    WxModule.forRoot(),
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
    HttpClientModule,
    WeUiModule,
    THIRD_PART,
    FabModule,
    WxModule,
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
