import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepairFinishMasterPageRoutingModule } from './repair-finish-master-routing.module';

import { RepairFinishMasterPage } from './repair-finish-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepairFinishMasterPageRoutingModule
  ],
  declarations: [RepairFinishMasterPage]
})
export class RepairFinishMasterPageModule {}
