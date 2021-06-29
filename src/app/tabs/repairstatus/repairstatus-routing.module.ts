import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairstatusPage } from './repairstatus.page';

const routes: Routes = [
  {
    path: '',
    component: RepairstatusPage
  },
  {
    path: 'receive-repair',
    loadChildren: () => import('./receive-repair/receive-repair.module').then( m => m.ReceiveRepairPageModule)
  },
  {
    path: 'repair-finish-master',
    loadChildren: () => import('./repair-finish-master/repair-finish-master.module').then( m => m.RepairFinishMasterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepairstatusPageRoutingModule {}
