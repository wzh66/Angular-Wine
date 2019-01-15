import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

import {SwiperModule} from 'ngx-swiper-wrapper';
import {WeUiModule} from 'ngx-weui';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {PAGES} from './pages';

@NgModule({
  declarations: [
    AppComponent,
    ...PAGES
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SwiperModule,
    WeUiModule.forRoot(),
    ThemeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
