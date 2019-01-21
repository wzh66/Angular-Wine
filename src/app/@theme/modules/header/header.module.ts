import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  entryComponents: [HeaderComponent],
  providers: []
})
export class HeaderModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: HeaderModule, providers: []};
  }
}
