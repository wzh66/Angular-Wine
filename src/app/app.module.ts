import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

import {ThemeModule} from './@theme/theme.module';

import {INTERCEPTORS} from './@core/interceptors';

import {AuthGuard} from './guard/_guard';
import {AppComponent} from './app.component';
import {PAGES} from './pages';
import {MsgSuccessComponent} from './pages/msg/success/success.component';
import {MsgInfoComponent} from './pages/msg/info/info.component';
import {MsgErrorComponent} from './pages/msg/error/error.component';
import {MsgRedComponent} from './pages/msg/red/red.component';


@NgModule({
  declarations: [
    AppComponent,
    MsgSuccessComponent,
    MsgInfoComponent,
    MsgErrorComponent,
    MsgRedComponent,
    ...PAGES
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    ThemeModule,
  ],
  providers: [AuthGuard, INTERCEPTORS, {provide: 'PREFIX_URL', useValue: '/api/interface/call.html?action='}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
