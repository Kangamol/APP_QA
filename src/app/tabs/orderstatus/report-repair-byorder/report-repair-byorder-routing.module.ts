import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportRepairByorderPage } from './report-repair-byorder.page';

const routes: Routes = [
  {
    path: '',
    component: ReportRepairByorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRepairByorderPageRoutingModule {}
