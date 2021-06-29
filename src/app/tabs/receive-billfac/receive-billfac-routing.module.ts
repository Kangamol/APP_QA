import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveBillfacPage } from './receive-billfac.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveBillfacPage
  },
  {
    path: 'receive-detail',
    loadChildren: () => import('./receive-detail/receive-detail.module').then( m => m.ReceiveDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveBillfacPageRoutingModule {}
