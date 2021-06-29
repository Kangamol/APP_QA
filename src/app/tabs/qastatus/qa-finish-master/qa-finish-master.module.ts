import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QaFinishMasterPageRoutingModule } from './qa-finish-master-routing.module';

import { QaFinishMasterPage } from './qa-finish-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QaFinishMasterPageRoutingModule
  ],
  declarations: [QaFinishMasterPage]
})
export class QaFinishMasterPageModule {}
