import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [MenuComponent],
  exports: [MenuComponent],
  entryComponents: [MenuComponent],
  providers: []
})
export class MenuModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: MenuModule, providers: []};
  }
}
