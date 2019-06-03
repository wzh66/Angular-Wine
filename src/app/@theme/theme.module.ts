import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {SwiperModule} from 'ngx-swiper-wrapper';
import {WeUiModule} from 'ngx-weui';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgxQRCodeModule} from 'ngx-qrcode2';

const THIRD_PART = [MatButtonModule, MatIconModule, SwiperModule, NgxQRCodeModule];

import {WxModule} from './modules/wx';
import {FabModule} from './modules/fab/fab.module';
import {OverlayModule} from './modules/overlay';
import {MenuModule} from './modules/menu/menu.module';
import {HeaderModule} from './modules/header/header.module';
import {FooterModule} from './modules/footer/footer.module';
import {ContentModule} from './modules/content/content.module';
import {FooterBtnModule} from './modules/footer-btn/footer-btn.module';

import {COMPONENTS, DIRECTIVES, PIPES} from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    WeUiModule,
    THIRD_PART,
    FabModule,
    WxModule.forRoot(),
    MenuModule.forRoot(),
    HeaderModule.forRoot(),
    FooterModule.forRoot(),
    ContentModule.forRoot(),
    OverlayModule.forRoot(),
    FooterBtnModule.forRoot()
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
    FooterBtnModule,
    ...DIRECTIVES,
    ...COMPONENTS,
    ...PIPES
  ],
  declarations: [...DIRECTIVES, ...COMPONENTS, ...PIPES],
  entryComponents: [COMPONENTS]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: []
    };
  }
}
