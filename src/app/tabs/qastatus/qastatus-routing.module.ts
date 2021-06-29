import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QastatusPage } from './qastatus.page';

const routes: Routes = [
  {
    path: '',
    component: QastatusPage
  },
  {
    path: 'qastatusdetail',
    loadChildren: () => import('./qastatusdetail/qastatusdetail.module').then( m => m.QastatusdetailPageModule)
  },
  {
    path: 'qa-finish-master',
    loadChildren: () => import('./qa-finish-master/qa-finish-master.module').then( m => m.QaFinishMasterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QastatusPageRoutingModule {}
