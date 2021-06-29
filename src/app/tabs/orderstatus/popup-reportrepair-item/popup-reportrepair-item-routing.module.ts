import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopupReportrepairItemPage } from './popup-reportrepair-item.page';

const routes: Routes = [
  {
    path: '',
    component: PopupReportrepairItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupReportrepairItemPageRoutingModule {}
