import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopupRepairReasonPageRoutingModule } from './popup-repair-reason-routing.module';

import { PopupRepairReasonPage } from './popup-repair-reason.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopupRepairReasonPageRoutingModule
  ],
  declarations: []
})
export class PopupRepairReasonPageModule {}
