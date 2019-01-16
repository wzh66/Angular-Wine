import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FabActionsComponent,
  FabComponent,
  FabTriggerComponent,
} from './fab';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FabActionsComponent,
    FabComponent,
    FabTriggerComponent,
  ],
  exports: [
    FabActionsComponent,
    FabComponent,
    FabTriggerComponent,
  ],
})
export class FabModule {
}
