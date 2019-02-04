import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddexpensePage } from './addexpense';

@NgModule({
  declarations: [
    AddexpensePage,
  ],
  imports: [
    IonicPageModule.forChild(AddexpensePage),
  ],
})
export class AddexpensePageModule {}
