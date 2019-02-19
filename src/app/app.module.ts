import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

import {ThemeModule} from './@theme/theme.module';

import {INTERCEPTORS} from './@core/interceptors';

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
    ThemeModule.forRoot()
  ],
  providers: [INTERCEPTORS, {provide: 'PREFIX_URL', useValue: '/api/interface/call.html?action='}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
