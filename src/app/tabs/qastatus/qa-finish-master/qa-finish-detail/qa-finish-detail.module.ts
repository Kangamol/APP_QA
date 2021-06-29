import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QaFinishDetailPageRoutingModule } from './qa-finish-detail-routing.module';

import { QaFinishDetailPage } from './qa-finish-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QaFinishDetailPageRoutingModule
  ],
  declarations: [QaFinishDetailPage]
})
export class QaFinishDetailPageModule {}
