var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';
import { ExpenseProvider } from '../../providers/expense/expense';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the AddexpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddexpensePage = /** @class */ (function () {
    function AddexpensePage(navCtrl, fb, navParams, expenseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.expenseProvider = expenseProvider;
        this.addExpenseForm = fb.group({
            date: [
                "",
                Validators.compose([Validators.required])
            ],
            amount: [
                "",
                Validators.compose([Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")])
            ],
            category: [
                "",
                Validators.compose([Validators.required])
            ],
            desc: [
                "",
                Validators.compose([Validators.required])
            ],
            remark: [
                "",
            ]
        });
    }
    AddexpensePage.prototype.formatdmy = function (date) {
        date = new Date(date);
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        return day + '-' + month + '-' + year;
    };
    AddexpensePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddexpensePage');
    };
    AddexpensePage.prototype.goToViewExpense = function () {
        this.navCtrl.setRoot(ExpensehistoryPage);
    };
    AddexpensePage.prototype.goToDashboard = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    AddexpensePage.prototype.goToExpenseHistory = function () {
        this.navCtrl.setRoot(ExpensehistoryPage);
    };
    AddexpensePage.prototype.createExpense = function (spendDate, spentAmt, spendDesc, spendRemark) {
        var _this = this;
        if (!this.addExpenseForm.valid) {
            console.log("Invalid value ");
        }
        console.log("desc is " + spendDesc);
        if (spendDesc == null) {
            spendDesc = "";
        }
        if (spendRemark == null) {
            spendRemark = "";
        }
        //spendDate =  this.formatdmy(spendDate);
        //    console.log("Spend date is here " + spendDate);
        //  var spendDate2 = new Date(spendDate.replace(/-/g, "/"));
        //  console.log("spend date 2 is here " + spendDate2);
        spendDate = this.formatdmy(spendDate);
        this.expenseProvider
            .createExpense(spendDate, spentAmt, spendDesc, spendRemark, this.spendCate)
            .then(function (newExpense) {
            _this.goToViewExpense();
        });
    };
    AddexpensePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-addexpense',
            templateUrl: 'addexpense.html',
        }),
        __metadata("design:paramtypes", [NavController, FormBuilder, NavParams, ExpenseProvider])
    ], AddexpensePage);
    return AddexpensePage;
}());
export { AddexpensePage };
//# sourceMappingURL=addexpense.js.map