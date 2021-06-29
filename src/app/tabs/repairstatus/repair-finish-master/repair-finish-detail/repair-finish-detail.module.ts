import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepairFinishDetailPageRoutingModule } from './repair-finish-detail-routing.module';

import { RepairFinishDetailPage } from './repair-finish-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepairFinishDetailPageRoutingModule
  ],
  declarations: [RepairFinishDetailPage]
})
export class RepairFinishDetailPageModule {}
