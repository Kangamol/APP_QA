import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveRepairPageRoutingModule } from './receive-repair-routing.module';

import { ReceiveRepairPage } from './receive-repair.page';
import { PopupRepairReasonPage } from './popup-repair-reason/popup-repair-reason.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveRepairPageRoutingModule
  ],
  declarations: [ReceiveRepairPage, PopupRepairReasonPage],
  entryComponents: [PopupRepairReasonPage]
})
export class ReceiveRepairPageModule {}
