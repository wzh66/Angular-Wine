import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

import {SwiperModule} from 'ngx-swiper-wrapper';
import {WeUiModule} from 'ngx-weui';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {IndexComponent} from './pages/index/index.component';
import {FrontComponent} from './pages/front/front.component';
import {AdminComponent} from './pages/admin/admin.component';
import {CacheComponent} from './pages/cache/cache.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FrontComponent,
    AdminComponent,
    CacheComponent
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
