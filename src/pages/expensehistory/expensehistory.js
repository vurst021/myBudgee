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
import { DashboardPage } from '../dashboard/dashboard';
import { AddexpensePage } from '../addexpense/addexpense';
import { ExpenseProvider } from '../../providers/expense/expense';
//import { UpdateExpensePage } from '../updateexpense/updateexpense';
/**
 * Generated class for the ExpensehistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ExpensehistoryPage = /** @class */ (function () {
    function ExpensehistoryPage(navCtrl, navParams, expenseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.expenseProvider = expenseProvider;
        this.date = 'date';
        this.reverse = true;
        this.cat = "tab1";
    }
    ExpensehistoryPage.prototype.getMonth = function () {
        var nowdate = new Date();
        //console.log(nowdate);
        var dateArray = [];
        var TEST;
        //  var tab1date = nowdate.setDate(nowdate.getDate());
        //console.log(this.format(tab1date));
        // this.tab1 = this.format(tab1date);
        this.tab1 = this.getMonthString(nowdate);
        for (var i = 0; i < 2; i++) {
            TEST = nowdate.setDate(nowdate.getDate() - 30);
            this.format(TEST);
            //  console.log(this.format(TEST));
            dateArray.push(this.format(TEST));
        }
    };
    ExpensehistoryPage.prototype.getMonthString = function (date) {
        var month = "";
        if (date.getMonth() == 0) {
            month = "January";
        }
        else if (date.getMonth() == 1) {
            month = "February";
        }
        else if (date.getMonth() == 2) {
            month = "March";
        }
        else if (date.getMonth() == 3) {
            month = "April";
        }
        else if (date.getMonth() == 4) {
            month = "May";
        }
        else if (date.getMonth() == 5) {
            month = "June";
        }
        else if (date.getMonth() == 6) {
            month = "July";
        }
        else if (date.getMonth() == 7) {
            month = "August";
        }
        else if (date.getMonth() == 8) {
            month = "September";
        }
        else if (date.getMonth() == 9) {
            month = "October";
        }
        else if (date.getMonth() == 10) {
            month = "November";
        }
        else if (date.getMonth() == 11) {
            month = "December";
        }
        return month;
    };
    ExpensehistoryPage.prototype.format = function (date) {
        date = new Date(date);
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        return month + '-' + day + '-' + year;
    };
    ExpensehistoryPage.prototype.format2 = function (date) {
        date = new Date(date);
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        return day + '/' + month + '/' + year;
    };
    ExpensehistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ExpensehistoryPage');
        // this.getMonth();
        console.log("Expense list in uonViewDidLoad" + this.expenseList);
    };
    ExpensehistoryPage.prototype.ionViewDidEnter = function () {
        this.getMonth();
        // retrieve curreng month spending record
        this.getCurrentMthRecord();
    };
    ExpensehistoryPage.prototype.getCurrentMthRecord = function () {
        var _this = this;
        this.expenseProvider.getExpenseList().on("value", function (expenseListSnapshot) {
            _this.expenseList = [];
            expenseListSnapshot.forEach(function (snap) {
                var today = new Date();
                var snapDate = snap.val().date;
                var formattedDate = new Date(snapDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
                var formattedDate2 = _this.format2(formattedDate);
                if (formattedDate.getMonth() == today.getMonth() && formattedDate.getFullYear() == today.getFullYear())
                    _this.expenseList.push({
                        id: snap.key,
                        amount: snap.val().amount,
                        category: snap.val().category,
                        date: formattedDate2,
                        desc: snap.val().desc,
                        remark: snap.val().remark
                    });
                _this.loadedSpendingList = _this.expenseList;
                return false;
            });
        });
    };
    ExpensehistoryPage.prototype.getAllRecord = function () {
        var _this = this;
        this.expenseProvider.getExpenseList().on("value", function (expenseListSnapshot) {
            _this.expenseList = [];
            expenseListSnapshot.forEach(function (snap) {
                var snapDate = snap.val().date;
                var formattedDate = new Date(snapDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
                var formattedDate2 = _this.format2(formattedDate);
                _this.expenseList.push({
                    id: snap.key,
                    amount: snap.val().amount,
                    category: snap.val().category,
                    date: formattedDate2,
                    desc: snap.val().desc,
                    remark: snap.val().remark
                });
                _this.loadedSpendingList = _this.expenseList;
                return false;
            });
        });
    };
    // search bar
    ExpensehistoryPage.prototype.initializeItems = function () {
        this.expenseList = this.loadedSpendingList;
    };
    ExpensehistoryPage.prototype.getItems = function (searchbar) {
        var _this = this;
        // Reset items back to all of the items
        this.initializeItems();
        // set q to the value of the searchbar
        var q = searchbar.srcElement.value;
        //console.log(q);
        // if the value is an empty string don't filter the items
        if (!q) {
            return;
        }
        // search by all field
        this.expenseList = this.expenseList.filter(function (item) {
            if (item.desc && q || item.category && q || item.remark && q || item.date && q || item.amount && q) {
                console.log("name");
                console.log(item.desc);
                //var date1 = item.date;
                //  var formattedDate =  new Date(date1.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
                var formatDate2 = _this.format2(item.date);
                var amount2 = String(item.amount);
                console.log("formatted date2 " + formatDate2);
                if (item.desc.toLowerCase().indexOf(q.toLowerCase()) > -1 || item.category.toLowerCase().indexOf(q.toLowerCase()) > -1 || item.remark.toLowerCase().indexOf(q.toLowerCase()) > -1
                    || formatDate2.toLowerCase().indexOf(q.toLowerCase()) > -1 || amount2.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
    };
    ExpensehistoryPage.prototype.goToDashboard = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    ExpensehistoryPage.prototype.goToAddExpense = function () {
        this.navCtrl.setRoot(AddexpensePage);
    };
    ExpensehistoryPage.prototype.goToUpdateExpense = function (expenseId) {
        this.navCtrl.push('UpdateexpensePage', { expenseId: expenseId });
    };
    ExpensehistoryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-expensehistory',
            templateUrl: 'expensehistory.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ExpenseProvider])
    ], ExpensehistoryPage);
    return ExpensehistoryPage;
}());
export { ExpensehistoryPage };
//# sourceMappingURL=expensehistory.js.map