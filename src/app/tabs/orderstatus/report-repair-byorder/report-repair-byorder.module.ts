import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportRepairByorderPageRoutingModule } from './report-repair-byorder-routing.module';

import { ReportRepairByorderPage } from './report-repair-byorder.page';
import { PopupRepairbyorderPage } from 'src/app/tabs/orderstatus/popup-repairbyorder/popup-repairbyorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportRepairByorderPageRoutingModule
  ],
  declarations: [ReportRepairByorderPage, PopupRepairbyorderPage],
  entryComponents: [PopupRepairbyorderPage]
})
export class ReportRepairByorderPageModule {}
