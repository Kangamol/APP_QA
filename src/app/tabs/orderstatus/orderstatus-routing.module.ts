import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderstatusPage } from './orderstatus.page';

const routes: Routes = [
  {
    path: '',
    component: OrderstatusPage
  },
  {
    path: 'orderitems',
    loadChildren: () => import('./orderitems/orderitems.module').then( m => m.OrderitemsPageModule)
  },
  {
    path: 'popup-reportrepair-item',
    loadChildren: () => import('./popup-reportrepair-item/popup-reportrepair-item.module').then( m => m.PopupReportrepairItemPageModule)
  },
  {
    path: 'popup-repairbyorder',
    loadChildren: () => import('./popup-repairbyorder/popup-repairbyorder.module').then( m => m.PopupRepairbyorderPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderstatusPageRoutingModule {}
