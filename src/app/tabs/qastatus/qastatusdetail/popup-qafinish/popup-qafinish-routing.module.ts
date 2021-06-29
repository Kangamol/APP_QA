import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopupQafinishPage } from './popup-qafinish.page';

const routes: Routes = [
  {
    path: '',
    component: PopupQafinishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupQafinishPageRoutingModule {}
