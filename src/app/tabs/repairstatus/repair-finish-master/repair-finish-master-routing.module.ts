import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairFinishMasterPage } from './repair-finish-master.page';

const routes: Routes = [
  {
    path: '',
    component: RepairFinishMasterPage
  },
  {
    path: 'repair-finish-detail',
    loadChildren: () => import('./repair-finish-detail/repair-finish-detail.module').then( m => m.RepairFinishDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepairFinishMasterPageRoutingModule {}
