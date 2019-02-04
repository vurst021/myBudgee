import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanDetailsPage } from './scan-details';

@NgModule({
  declarations: [
    ScanDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanDetailsPage),
  ],
})
export class ScanDetailsPageModule {}
