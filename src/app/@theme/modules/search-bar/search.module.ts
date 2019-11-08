import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SearchComponent} from './search.component';
import {SearchBarModule} from 'ngx-weui';
import {HttpClientJsonpModule} from '@angular/common/http';

@NgModule({
  imports: [CommonModule, RouterModule, SearchBarModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
  entryComponents: [SearchComponent],
  providers: []
})
export class SearchModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: SearchModule, providers: []};
  }
}
