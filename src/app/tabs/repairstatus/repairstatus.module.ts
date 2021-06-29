import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepairstatusPageRoutingModule } from './repairstatus-routing.module';

import { RepairstatusPage } from './repairstatus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepairstatusPageRoutingModule
  ],
  declarations: [RepairstatusPage]
})
export class RepairstatusPageModule {}
