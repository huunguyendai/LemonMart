import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { UserManagementComponent } from './user-management/user-management.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';

@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerComponent,
    UserManagementComponent,
    ReceiptLookupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
