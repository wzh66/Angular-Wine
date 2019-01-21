import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ContentComponent} from './content.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ContentComponent],
  exports: [ContentComponent],
  entryComponents: [ContentComponent],
  providers: []
})
export class ContentModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: ContentModule, providers: []};
  }
}
