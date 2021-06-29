import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'orderstatus',
        loadChildren: () => import('../orderstatus/orderstatus.module').then( m => m.OrderstatusPageModule)
      },
      {
        path: 'qastatus',
        loadChildren: () => import('../qastatus/qastatus.module').then( m => m.QastatusPageModule)
      },
      {
        path: 'repairstatus',
        loadChildren: () => import('../repairstatus/repairstatus.module').then( m => m.RepairstatusPageModule)
      },
      {
        path: 'receive-billfac',
        loadChildren: () => import('../receive-billfac/receive-billfac.module').then( m => m.ReceiveBillfacPageModule)
      },
      {
        path: '', redirectTo: '/tabs/orderstatus', pathMatch: 'full'
      }
    ]
  },
  {
    path: '', redirectTo: '/tabs/orderstatus', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
