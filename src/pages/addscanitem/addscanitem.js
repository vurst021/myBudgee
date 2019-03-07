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
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the AddscanitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddscanitemPage = /** @class */ (function () {
    function AddscanitemPage(navCtrl, fb, navParams, expenseProvider, dataService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.expenseProvider = expenseProvider;
        this.dataService = dataService;
        this.productFound = false;
        this.productId = this.navParams.get("productId");
        console.log("PRODUCT ID " + this.productId);
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
    AddscanitemPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dataService.getItem(this.productId)
            .subscribe(function (response) {
            console.log('my data', response);
            _this.products = response;
            //this.selectedProduct = {};
            console.log("pass over para id" + _this.productId);
            //   this.selectedProduct = this.products.find(product => product.gtin14 === this.productId);
            if (_this.products !== undefined) {
                _this.productFound = true;
                console.log("HI I AM IN THE API");
                _this.itemDesc = _this.products.brand_name + " " + _this.products.name;
                //this.itemPrice = this.selectedProduct.price;
                // this.itemRemark = this.products.brand_name;
            }
            else {
            }
        });
    };
    AddscanitemPage.prototype.formatdmy = function (date) {
        date = new Date(date);
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        return day + '-' + month + '-' + year;
    };
    AddscanitemPage.prototype.ionViewDidLoad = function () {
        //this.scan();
        console.log('ionViewDidLoad AddscanitemPage');
    };
    AddscanitemPage.prototype.goToViewExpense = function () {
        this.navCtrl.setRoot(ExpensehistoryPage);
    };
    AddscanitemPage.prototype.goToDashboard = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    AddscanitemPage.prototype.createExpense = function (spendDate, spentAmt, spendDesc, spendRemark) {
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
        spendDate = this.formatdmy(spendDate);
        this.expenseProvider
            .createExpense(spendDate, spentAmt, spendDesc, spendRemark, this.spendCate)
            .then(function (newExpense) {
            _this.goToViewExpense();
        });
    };
    AddscanitemPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-addscanitem',
            templateUrl: 'addscanitem.html',
        }),
        __metadata("design:paramtypes", [NavController, FormBuilder, NavParams, ExpenseProvider,
            DataServiceProvider])
    ], AddscanitemPage);
    return AddscanitemPage;
}());
export { AddscanitemPage };
//# sourceMappingURL=addscanitem.js.map