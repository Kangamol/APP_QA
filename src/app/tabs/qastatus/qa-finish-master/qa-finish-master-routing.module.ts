import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QaFinishMasterPage } from './qa-finish-master.page';

const routes: Routes = [
  {
    path: '',
    component: QaFinishMasterPage
  },
  {
    path: 'qa-finish-detail',
    loadChildren: () => import('./qa-finish-detail/qa-finish-detail.module').then( m => m.QaFinishDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QaFinishMasterPageRoutingModule {}
