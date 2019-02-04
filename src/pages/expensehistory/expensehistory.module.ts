import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpensehistoryPage } from './expensehistory';

@NgModule({
  declarations: [
    ExpensehistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpensehistoryPage),
  ],
})
export class ExpensehistoryPageModule {}
