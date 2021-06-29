import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OrderitemsPageRoutingModule } from './orderitems-routing.module';

import { OrderitemsPage } from './orderitems.page';
import { PopupReportrepairItemPage } from '../popup-reportrepair-item/popup-reportrepair-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderitemsPageRoutingModule
  ],
  declarations: [OrderitemsPage, PopupReportrepairItemPage],
  entryComponents: [PopupReportrepairItemPage]
})
export class OrderitemsPageModule {}
