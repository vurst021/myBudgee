var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var ExpenseProvider = /** @class */ (function () {
    function ExpenseProvider() {
        var _this = this;
        this.currentMonthTotalSpend = 0;
        this.currentMonthBudget = 0;
        console.log('Hello Expense Provider');
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.expenseListRef = firebase
                    .database()
                    .ref("/userProfile/" + user.uid + "/expenseList");
                //  this.expneseItem = firebase
                // .database()
                // .ref(`/userProfile/${user.uid}/expenseList/${.}`);
            }
        });
    }
    ExpenseProvider.prototype.createExpense = function (spendDate, spentAmt, spendDesc, spendRemark, spendCate) {
        return this.expenseListRef.push({
            date: spendDate,
            amount: spentAmt,
            category: spendCate,
            desc: spendDesc,
            remark: spendRemark
        });
    };
    ExpenseProvider.prototype.getExpenseList = function () {
        return this.expenseListRef;
    };
    ExpenseProvider.prototype.getExpenseDetail = function (expenseId) {
        return this.expenseListRef.child(expenseId);
    };
    ExpenseProvider.prototype.updateExpense = function (expenseId, date, amount, desc, remark, category) {
        console.log("UPDATE EXPENSE METHOD");
        console.log("Date " + date);
        console.log("SpendAmt " + amount);
        console.log("Selected-category " + category);
        console.log("Spend desc " + desc);
        console.log("Spend remark" + remark);
        return this.expenseListRef.child(expenseId).update({ date: date, amount: amount, desc: desc, remark: remark, category: category });
    };
    ExpenseProvider.prototype.setCurrentMonthlySpending = function (currentMonthTotalSpending) {
        this.currentMonthTotalSpend = currentMonthTotalSpending;
    };
    ExpenseProvider.prototype.getCurrentMonthlySpending = function () {
        return this.currentMonthTotalSpend;
    };
    ExpenseProvider.prototype.setMonthBudget = function (monthBudget) {
        this.currentMonthBudget = monthBudget;
    };
    ExpenseProvider.prototype.getMonthlyBudget = function () {
        return this.currentMonthBudget;
    };
    ExpenseProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], ExpenseProvider);
    return ExpenseProvider;
}());
export { ExpenseProvider };
//# sourceMappingURL=expense.js.map