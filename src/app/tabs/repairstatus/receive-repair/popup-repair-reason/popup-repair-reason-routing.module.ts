import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopupRepairReasonPage } from './popup-repair-reason.page';

const routes: Routes = [
  {
    path: '',
    component: PopupRepairReasonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupRepairReasonPageRoutingModule {}
