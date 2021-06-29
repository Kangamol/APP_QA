import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QastatusdetailPageRoutingModule } from './qastatusdetail-routing.module';

import { QastatusdetailPage } from './qastatusdetail.page';
import { PopupQafinishPage } from './popup-qafinish/popup-qafinish.page';
import { PopupSelectrepairPage } from './popup-selectrepair/popup-selectrepair.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QastatusdetailPageRoutingModule
  ],
  declarations: [QastatusdetailPage,  PopupQafinishPage, PopupSelectrepairPage],
  entryComponents: [PopupQafinishPage, PopupSelectrepairPage]
})
export class QastatusdetailPageModule {}
