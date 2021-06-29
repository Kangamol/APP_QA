import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopupSelectrepairPage } from './popup-selectrepair.page';

const routes: Routes = [
  {
    path: '',
    component: PopupSelectrepairPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupSelectrepairPageRoutingModule {}
