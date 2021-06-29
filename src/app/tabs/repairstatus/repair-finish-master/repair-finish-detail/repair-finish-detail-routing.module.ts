import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairFinishDetailPage } from './repair-finish-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RepairFinishDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepairFinishDetailPageRoutingModule {}
