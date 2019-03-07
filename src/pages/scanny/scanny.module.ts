import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScannyPage } from './scanny';

@NgModule({
  declarations: [
    ScannyPage,
  ],
  imports: [
    IonicPageModule.forChild(ScannyPage),
  ],
})
export class ScannyPageModule {}
