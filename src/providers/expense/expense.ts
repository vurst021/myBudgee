import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

/*
  Generated class for the ExpenseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpenseProvider {

  public expenseListRef: firebase.database.Reference;
  public expneseItem: firebase.database.Reference;
  public currentMonthTotalSpend  = 0;
  public currentMonthBudget  = 0;

  constructor() {
    console.log('Hello Expense Provider');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.expenseListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/expenseList`);
      //  this.expneseItem = firebase
       // .database()
       // .ref(`/userProfile/${user.uid}/expenseList/${.}`);
      }
    });
  }

createExpense(
  spendDate: string,
  spentAmt: number,
  spendDesc:string,
  spendRemark:string, 
  spendCate:string
): firebase.database.ThenableReference {
  return this.expenseListRef.push({
    date: spendDate,
    amount: spentAmt,
    category:spendCate,
    desc: spendDesc,
    remark:spendRemark
  });
}

getExpenseList(): firebase.database.Reference {
 
  return this.expenseListRef;

}

getExpenseDetail(expenseId:string): firebase.database.Reference {
  return this.expenseListRef.child(expenseId);
}

updateExpense(expenseId:string,date:string,amount:number,desc:string,remark:string,category:string): Promise<any> {
  console.log("UPDATE EXPENSE METHOD");
  console.log("Date " + date);
  
  console.log("SpendAmt " + amount);
  console.log("Selected-category " + category);
  console.log("Spend desc " + desc );
  console.log("Spend remark" + remark);
  

  return this.expenseListRef.child(expenseId).update({date, amount,desc,remark,category});
}
setCurrentMonthlySpending(currentMonthTotalSpending:number){
  this.currentMonthTotalSpend = currentMonthTotalSpending;
  
}
getCurrentMonthlySpending(){
  return this.currentMonthTotalSpend;
}

setMonthBudget(monthBudget:number){
  this.currentMonthBudget = monthBudget;
}

getMonthlyBudget(){
  return this.currentMonthBudget
}

}