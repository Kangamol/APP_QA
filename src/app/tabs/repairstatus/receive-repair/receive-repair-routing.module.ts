import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveRepairPage } from './receive-repair.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveRepairPage
  },
  {
    path: 'popup-repair-reason',
    loadChildren: () => import('./popup-repair-reason/popup-repair-reason.module').then( m => m.PopupRepairReasonPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveRepairPageRoutingModule {}
