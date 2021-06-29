import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveBillfacPageRoutingModule } from './receive-billfac-routing.module';

import { ReceiveBillfacPage } from './receive-billfac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveBillfacPageRoutingModule
  ],
  declarations: [ReceiveBillfacPage]
})
export class ReceiveBillfacPageModule {}
