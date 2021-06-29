import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopupRepairbyorderPage } from './popup-repairbyorder.page';

const routes: Routes = [
  {
    path: '',
    component: PopupRepairbyorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupRepairbyorderPageRoutingModule {}
