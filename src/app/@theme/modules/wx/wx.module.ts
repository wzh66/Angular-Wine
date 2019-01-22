import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WxComponent} from './wx.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WxComponent],
  exports: [WxComponent],
  entryComponents: [WxComponent],
  providers: []
})
export class WxModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: WxModule, providers: []};
  }
}
