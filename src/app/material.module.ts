import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule
];
@NgModule({
  exports:modules
})
export class MaterialModule { }
