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
import { ExpenseProvider } from '../../providers/expense/expense';
import { FormBuilder, Validators } from '@angular/forms';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';
/**
 * Generated class for the UpdateexpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UpdateexpensePage = /** @class */ (function () {
    function UpdateexpensePage(navCtrl, navParams, expenseProvider, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.expenseProvider = expenseProvider;
        this.currentExpense = {};
        this.catgories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Education', 'Others'];
        this.expenseId = this.navParams.get("expenseId");
        this.updateExpenseForm = fb.group({
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
        /*
        this.dateTime = this.updateExpenseForm.controls['datetime'];
        this.email = this.updateExpenseForm.controls['email'];
        //when you edit data try code like below
        this.editdata = his.navParams.get('Details');
        if(this.navParams.get('Details')){
        this.newuser.email= this.editdata.email;
        this.newuser.username= this.editdata.username;
        */
    }
    UpdateexpensePage.prototype.formatdmy = function (date) {
        this.day = "";
        this.month = "";
        this.year = "";
        date = new Date(date);
        this.day = ('0' + date.getDate()).slice(-2);
        this.month = ('0' + (date.getMonth() + 1)).slice(-2);
        this.year = date.getFullYear();
    };
    UpdateexpensePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.expenseProvider
            .getExpenseDetail(this.navParams.get("expenseId"))
            .on("value", function (expenseSnapshot) {
            _this.currentExpense = expenseSnapshot.val();
            _this.currentExpense.id = expenseSnapshot.key;
            _this.selected_cate = expenseSnapshot.val().category;
            console.log("seleted cate " + _this.selected_cate);
            _this.currentAmt = expenseSnapshot.val().amount;
            _this.date = expenseSnapshot.val().date;
            _this.currentDate = new Date(_this.date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
            _this.currentDate.setHours(0, -_this.currentDate.getTimezoneOffset(), 0, 0);
            _this.currentDate = _this.currentDate.toISOString();
            _this.currentDesc = expenseSnapshot.val().desc;
            _this.currentRemark = expenseSnapshot.val().remark;
        });
    };
    //  updateExpense(currentDate,currentAmt,selected_cate,currentDesc,currentRemark)
    UpdateexpensePage.prototype.updateExpense = function (spendDate, spendAmt, selected_cate, spendDesc, spendRemark) {
        var _this = this;
        this.formatdmy(spendDate);
        spendDate = this.day + "-" + this.month + "-" + this.year;
        if (!this.updateExpenseForm.valid) {
            console.log("Invalid value ");
        }
        console.log("desc is " + spendDesc);
        if (spendDesc == null) {
            spendDesc = "";
        }
        if (spendRemark == null) {
            spendRemark = "";
        }
        this.expenseProvider.updateExpense(this.expenseId, spendDate, spendAmt, spendDesc, spendRemark, selected_cate)
            .then(function () {
            console.log("EXPENSE UPDATED");
            _this.goToViewExpense();
        })
            .catch(function (error) { console.log('update ERROR: ' + error.message); });
    };
    UpdateexpensePage.prototype.goToViewExpense = function () {
        this.navCtrl.setRoot(ExpensehistoryPage);
    };
    UpdateexpensePage = __decorate([
        IonicPage({
            segment: "expensehistory/:expenseId"
        }),
        Component({
            selector: 'page-updateexpense',
            templateUrl: 'updateexpense.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ExpenseProvider, FormBuilder])
    ], UpdateexpensePage);
    return UpdateexpensePage;
}());
export { UpdateexpensePage };
//# sourceMappingURL=updateexpense.js.map