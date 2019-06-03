import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {WeUiModule} from 'ngx-weui';
import {FooterBtnComponent} from './footer-btn.component';

@NgModule({
  imports: [CommonModule, RouterModule, WeUiModule],
  declarations: [FooterBtnComponent],
  exports: [FooterBtnComponent],
  entryComponents: [FooterBtnComponent],
  providers: []
})
export class FooterBtnModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: FooterBtnModule, providers: []};
  }
}
