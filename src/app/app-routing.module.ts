import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'orderitems',
    loadChildren: () => import('./tabs/orderstatus/orderitems/orderitems.module').then( m => m.OrderitemsPageModule)
  },
  {
    path: 'qastatusdetail',
    loadChildren: () => import('./tabs/qastatus/qastatusdetail/qastatusdetail.module').then( m => m.QastatusdetailPageModule)
  },
  {
    path: 'receive-detail',
    loadChildren: () => import('./tabs/receive-billfac/receive-detail/receive-detail.module').then( m => m.ReceiveDetailPageModule)
  },
  {
    path: 'receive-repair',
    loadChildren: () => import('./tabs/repairstatus/receive-repair/receive-repair.module').then( m => m.ReceiveRepairPageModule)
  },
  {
    path: 'qafinish-master',
    loadChildren: () => import('./tabs/qastatus/qa-finish-master/qa-finish-master.module').then( m => m.QaFinishMasterPageModule)
  },
  {
    path: 'qafinish-detail',
    loadChildren: () => import('./tabs/qastatus/qa-finish-master/qa-finish-detail/qa-finish-detail.module').then
    ( m => m.QaFinishDetailPageModule)
  },
  {
    path: 'repairfinish-master',
    loadChildren: () => import('./tabs/repairstatus/repair-finish-master/repair-finish-master.module').then
    ( m => m.RepairFinishMasterPageModule)
  },
  {
    path: 'repairfinish-detail',
    loadChildren: () => import('./tabs/repairstatus/repair-finish-master/repair-finish-detail/repair-finish-detail.module').then
    ( m => m.RepairFinishDetailPageModule)
  },
  {
    path: 'report-repair-byorder',
    loadChildren: () => import('./tabs/orderstatus/report-repair-byorder/report-repair-byorder.module').then
    ( m => m.ReportRepairByorderPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
