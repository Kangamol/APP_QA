import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QastatusPageRoutingModule } from './qastatus-routing.module';

import { QastatusPage } from './qastatus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QastatusPageRoutingModule
  ],
  declarations: [QastatusPage]
})
export class QastatusPageModule {}
