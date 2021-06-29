import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QastatusdetailPage } from './qastatusdetail.page';

const routes: Routes = [
  {
    path: '',
    component: QastatusdetailPage
  },
  {
    path: 'popup-selectrepair',
    loadChildren: () => import('./popup-selectrepair/popup-selectrepair.module').then( m => m.PopupSelectrepairPageModule)
  },
  {
    path: 'popup-qafinish',
    loadChildren: () => import('./popup-qafinish/popup-qafinish.module').then( m => m.PopupQafinishPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QastatusdetailPageRoutingModule {}
