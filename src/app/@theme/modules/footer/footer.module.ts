import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
  entryComponents: [FooterComponent],
  providers: []
})
export class FooterModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: FooterModule, providers: []};
  }
}
