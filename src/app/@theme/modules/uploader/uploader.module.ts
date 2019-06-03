import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {UploaderComponent} from './uploader.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [UploaderComponent],
  exports: [UploaderComponent],
  entryComponents: [UploaderComponent],
  providers: []
})
export class UploaderModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: UploaderModule, providers: []};
  }
}
