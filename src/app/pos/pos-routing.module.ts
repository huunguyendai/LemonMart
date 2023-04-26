import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PosComponent } from './pos.component';

const routes: Routes = [
  {path:'', component:PosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
