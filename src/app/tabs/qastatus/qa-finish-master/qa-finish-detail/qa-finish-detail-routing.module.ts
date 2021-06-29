import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QaFinishDetailPage } from './qa-finish-detail.page';

const routes: Routes = [
  {
    path: '',
    component: QaFinishDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QaFinishDetailPageRoutingModule {}
