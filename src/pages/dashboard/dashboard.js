var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AddexpensePage } from '../addexpense/addexpense';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';
import { MenuPage } from '../menu/menu';
import { ExpenseProvider } from '../../providers/expense/expense';
//import { AuthService } from '../../services/auth.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import 'rxjs/add/operator/map';
import { ProfileProvider } from '../../providers/profile/profile';
import { ScanPage } from '../scan/scan';
import { Camera } from '@ionic-native/camera/ngx';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DashboardPage = /** @class */ (function () {
    function DashboardPage(navCtrl, navParams, expenseProvider, barcodeScanner, toast, dataService, alertCtrl, profileProvider, cdr, camera, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.expenseProvider = expenseProvider;
        this.barcodeScanner = barcodeScanner;
        this.toast = toast;
        this.dataService = dataService;
        this.alertCtrl = alertCtrl;
        this.profileProvider = profileProvider;
        this.cdr = cdr;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.lastSixMonthSpendingArray = [];
        this.lastSixMonthNameArray = [];
        //monthlySpendingData: any[] = [];
        this.monthArrayList = [];
        this.categorySpendingList = [];
        this.categoryNameArray = [];
        this.categoryDataArray = [];
        this.budgetList = [];
        this.productFound = false;
        this.barChartData1 = [];
        this.weekList = [{
                id: "",
                date: "",
                amount: 0
            }];
        this.jan = 0;
        this.feb = 0;
        this.mar = 0;
        this.apr = 0;
        this.may = 0;
        this.jun = 0;
        this.jul = 0;
        this.aug = 0;
        this.sep = 0;
        this.oct = 0;
        this.nov = 0;
        this.dec = 0;
        this.currentMonthSpending = 0;
        this.currentBudget = 0;
        this.totalWeeklySpend = 0;
        this.food = 0;
        this.transport = 0;
        this.shopping = 0;
        this.entertainment = 0;
        this.education = 0;
        this.others = 0;
        this.barcodeData = "";
    }
    // scan() {
    //   this.selectedProduct = {};
    // this.barcodeScanner.scan().then((barcodeData) => {
    //   console.log(barcodeData);
    // this.dataService.getItem(barcodeData.text)
    // .subscribe((data) => {
    //   this.products = data;
    //       console.log("MY DATA LOOK HERE" + JSON.stringify(this.products));
    //       if (this.products !== undefined && this.products != "") {
    //         this.productFound = true;
    //         this.productId = barcodeData.text;
    //         console.log("DASHIBOARD PAGE PRODUCT ID" + this.productId);
    //         this.goToAddScanExpense(this.productId);
    //       } else {
    //         this.productFound = false;
    //         this.toast.show(`Product not found`, '5000', 'center').subscribe(
    //           toast => {
    //             console.log(toast);
    //           }
    //         );
    //       }
    // });
    //   }, (err) => {
    //     this.toast.show(err, '5000', 'center').subscribe(
    //       toast => {
    //         console.log(toast);
    //       }
    //     );
    //   }
    //   );
    // }
    DashboardPage.prototype.editMonthlyBudget = function () {
        var _this = this;
        console.log("ENTER EDIT MONTHLY BUDGET");
        var alert = this.alertCtrl.create({
            message: "Edit current monthly budget",
            inputs: [
                {
                    name: "BudgetAmount",
                    placeholder: "$",
                    value: this.userProfile.monthlyBudget
                },
            ],
            buttons: [
                { text: "Cancel" },
                {
                    text: "Save",
                    handler: function (data) {
                        _this.profileProvider.updateBudget(data.BudgetAmount);
                    }
                }
            ]
        });
        this.profileProvider.updateMonthlySpending(this.currentMonthSpending);
        alert.present();
    };
    DashboardPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log("NG ON IN IT");
        this.getWeekData();
        this.profileProvider.getUserProfile().on("value", function (userProfileSnapshot) {
            _this.userProfile = userProfileSnapshot.val();
            _this.currentBudget = userProfileSnapshot.val().monthlyBudget;
            _this.currentMonthSpending = userProfileSnapshot.val().monthSpending;
            // solve the progress bar 
            _this.cdr.detectChanges();
        });
    };
    DashboardPage.prototype.getTotalWeeklySpending = function (array) {
        console.log("Spending Method");
        console.log("Length" + array.length);
        for (var a = 0; a < array.length; a++) {
            console.log("Spending Method");
            console.log(Number(array[a]));
            this.totalWeeklySpend += Number(array[a]);
        }
    };
    DashboardPage.prototype.goToAddScanExpense = function (productId) {
        this.navCtrl.push('AddscanitemPage', { productId: productId });
    };
    DashboardPage.prototype.addToCategoryNameArray = function (category) {
        this.categoryNameArray.push(category);
    };
    DashboardPage.prototype.getLastSixMonthArray = function () {
        // count from today's month and back for 6 months.
        // get the spending that is belongs to that month.
        // group into arrays
        var today = new Date();
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var d;
        var month;
        var dismonth;
        // console.log("Today's month" + today.getMonth());
        // Last Six Month spending included this month 
        var spendArray2 = [];
        var spendNameArray = [];
        for (var a = 6; a >= 0; a -= 1) {
            d = new Date(today.getFullYear(), today.getMonth() - a, 1);
            var yearTobeCalculate = d.getFullYear();
            month = monthNames[d.getMonth()];
            // console.log("year is " + yearTobeCalculate);
            //console.log("month is " + month);
            var monthTobeCalculate = today.getMonth() - a;
            // console.log(monthTobeCalculate);
            if (month == "January") {
                monthTobeCalculate = 0;
                dismonth = "Jan";
            }
            else if (month == "February") {
                monthTobeCalculate = 1;
                dismonth = "Feb";
            }
            else if (month == "March") {
                monthTobeCalculate = 2;
                dismonth = "Mar";
            }
            else if (month == "April") {
                monthTobeCalculate = 3;
                dismonth = "Apr";
            }
            else if (month == "May") {
                monthTobeCalculate = 4;
                dismonth = "May";
            }
            else if (month == "June") {
                monthTobeCalculate = 5;
                dismonth = "Jun";
            }
            else if (month == "July") {
                monthTobeCalculate = 6;
                dismonth = "Jul";
            }
            else if (month == "August") {
                monthTobeCalculate = 7;
                dismonth = "Aug";
            }
            else if (month == "September") {
                monthTobeCalculate = 8;
                dismonth = "Sep";
            }
            else if (month == "October") {
                monthTobeCalculate = 9;
                dismonth = "Oct";
            }
            else if (month == "November") {
                monthTobeCalculate = 10;
                dismonth = "Nov";
            }
            else if (month == "December") {
                monthTobeCalculate = 11;
                dismonth = "Dec";
            }
            var monthlyList = [];
            var spendAmt = 0;
            monthlyList = this.monthArrayList;
            for (var i = 0; i < monthlyList.length; i++) {
                var spendingDate = new Date(monthlyList[i].date);
                if (spendingDate.getFullYear() == yearTobeCalculate && spendingDate.getMonth() == monthTobeCalculate && Number(monthlyList[i].amount) > 0) {
                    // console.log("PUSH IN SPEND AMT OF" + spendAmt);
                    spendAmt = spendAmt + Number(monthlyList[i].amount);
                    //     console.log(spendAmt);
                }
            }
            spendNameArray.push(dismonth + " " + yearTobeCalculate);
            spendArray2.push(spendAmt);
        }
        this.lastSixMonthNameArray = spendNameArray;
        this.lastSixMonthSpendingArray = spendArray2;
    };
    DashboardPage.prototype.groupCategory = function () {
        var today = new Date();
        var month = today.getMonth();
        // NEED ADD CODE FOR CURRENT MONTH DATA
        /*
            var isFoodAdded = false;
            var isShopAdded = false;
            var isTransAdded = false;
            var isEduAdded = false;
            var isEntertainAdded = false;
            var isOthersAdded = false;
        */
        for (var i = 0; i < this.categorySpendingList.length; i++) {
            var item = this.categorySpendingList[i];
            var listDate = this.categorySpendingList[i].date;
            var formattedDate = new Date(listDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
            //  console.log("list date" + listDate);
            // console.log("formatted date" + formattedDate);
            if (formattedDate.getMonth() == today.getMonth() && formattedDate.getFullYear() == today.getFullYear()) {
                // console.log("ITEM CATEGORY" + item);
                if (item.category == "Food") {
                    this.food += parseFloat(item.amount);
                    //  if (isFoodAdded == false) {
                    this.addToCategoryNameArray(item.category);
                    //  isFoodAdded = true;
                    // }
                }
                else if (item.category == "Transport") {
                    this.transport += parseFloat(item.amount);
                    //    if (isTransAdded == false) {
                    this.addToCategoryNameArray(item.category);
                    //    isTransAdded = true;
                    // }
                }
                else if (item.category == "Shopping") {
                    this.shopping += parseFloat(item.amount);
                    //   if (isShopAdded == false) {
                    this.addToCategoryNameArray(item.category);
                    //   isShopAdded = true;
                    //}
                }
                else if (item.category == "Entertainment") {
                    this.entertainment += parseFloat(item.amount);
                    //    if (isEntertainAdded == false) {
                    this.addToCategoryNameArray(item.category);
                    //     isEntertainAdded = true;
                    // }
                }
                else if (item.category == "Education") {
                    this.education += parseFloat(item.amount);
                    //    if (isEduAdded == false) {
                    this.addToCategoryNameArray(item.category);
                    //        isEduAdded = true;
                    //    }
                }
                else if (item.category == "Others") {
                    this.others += parseFloat(item.amount);
                    // if (isOthersAdded == false) {
                    this.addToCategoryNameArray(item.category);
                    //  isOthersAdded = true;
                    //  }
                }
            }
            /*
               console.log("food");
               console.log(this.food);
               console.log("trasport");
               console.log(this.transport);
               console.log("shopping");
               console.log(this.shopping);
               console.log("entertainment");
               console.log(this.entertainment);
               console.log("education");
               console.log(this.education);
               console.log("others");
               console.log(this.others);
           */
        }
    };
    DashboardPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.getMonthListData().then(function (monthdata) {
            //  console.log("My MonthlySpendingList");
            // console.log(monthdata)
            _this.monthArrayList = monthdata;
            _this.getLastSixMonthArray();
            //console.log(this.currentMonthSpending);
            setTimeout(function () {
                _this.barChart = _this.getBarChart();
                _this.dailyBarChart = _this.getDailyChart();
            }, 200);
            _this.currentMonthSpending = _this.lastSixMonthSpendingArray[_this.lastSixMonthSpendingArray.length - 1];
        });
        this.getCategoryListData().then(function (categoryData) {
            //  console.log("My SpendingCategory List");
            // console.log(categoryData);
            _this.categorySpendingList = categoryData;
            _this.groupCategory();
            /*
                  for(var a = 0;a < this.categorySpendingList.length;a++){
                    this.categoryDataArray.push(this.categorySpendingList[a].amount);
                    this.categoryNameArray.push(this.categorySpendingList[a].category);
                  }
            */
            setTimeout(function () {
                _this.pieChart = _this.getPieChart();
            }, 500);
            ;
            //    this.currentMonthSpending = this.lastSixMonthSpendingArray[this.lastSixMonthSpendingArray.length - 1 ];
        });
        //this.cdr.detectChanges();
    };
    /*
      updateData() {
        // After instantiating your chart, its data is accessible and
        // can be changed anytime with the function update().
        // It takes care of everything and even redraws the animations :D
        this.pieChart.data.datasets[0].data = [Math.random() * 1000, Math.random() * 1000, Math.random() * 1000];
        this.pieChart.update();
      }
      */
    DashboardPage.prototype.getChart = function (context, chartType, data, options) {
        return new Chart(context, {
            data: data,
            options: options,
            type: chartType,
        });
    };
    DashboardPage.prototype.getPieChart = function () {
        var data = {
            labels: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Education', 'Others'],
            // labels: this.categoryNameArray,
            datasets: [
                {
                    // data: this.categoryDataArray,
                    data: [this.food, this.transport, this.shopping, this.entertainment, this.education, this.others],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#09c1a9', '#6e49cc', '#7e7e91'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#09c1a9', '#6e49cc', '#7e7e91']
                }
            ]
        };
        return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
    };
    DashboardPage.prototype.getCategoryListData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var temp, expenseList, snapshot, categoryList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expenseList = this.expenseProvider.getExpenseList();
                        return [4 /*yield*/, expenseList.once('value')];
                    case 1:
                        snapshot = _a.sent();
                        categoryList = [];
                        snapshot.forEach(function (childSnapshot) {
                            // var fbDate = childSnapshot.val().category;
                            //   var formattedDate = new Date(fbDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
                            //  console.log(formattedDate.getMonth());
                            var today = new Date();
                            var childDate = childSnapshot.val().date;
                            // formatted into date format
                            var formattedDate = new Date(childDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
                            // only get the data for current month
                            if (formattedDate.getMonth() == today.getMonth() && formattedDate.getFullYear() == today.getFullYear()) {
                                temp = { id: childSnapshot.key, date: childSnapshot.val().date, category: childSnapshot.val().category, amount: childSnapshot.val().amount };
                                categoryList.push(temp);
                            }
                            return false;
                        });
                        //console.log("MY CATEGORY AND AMT LIST");
                        //console.log(categoryList);
                        return [2 /*return*/, categoryList];
                }
            });
        });
    };
    DashboardPage.prototype.getMonthListData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var temp, expenseList, snapshot, monthList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expenseList = this.expenseProvider.getExpenseList();
                        return [4 /*yield*/, expenseList.once('value')];
                    case 1:
                        snapshot = _a.sent();
                        monthList = [];
                        snapshot.forEach(function (childSnapshot) {
                            var fbDate = childSnapshot.val().date;
                            var formattedDate = new Date(fbDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
                            //console.log(formattedDate.getMonth());
                            temp = { id: childSnapshot.key, date: formattedDate, amount: childSnapshot.val().amount };
                            monthList.push(temp);
                            return false;
                        });
                        return [2 /*return*/, monthList];
                }
            });
        });
    };
    DashboardPage.prototype.getWeekData = function () {
        var _this = this;
        console.log("i called getweekData()");
        this.weekList = [];
        var now = new Date();
        //  console.log(now);
        var getYear = this.y2k(now.getFullYear());
        var arrayLength = 0;
        this.getMonthListData().then(function (monthdata) {
            console.log("My MonthlySpendingList");
            console.log(monthdata);
            var transArray = monthdata;
            // console.log("transArray");
            // console.log(transArray);
            for (var i = 0; i < transArray.length; i++) {
                var newDate = new Date(transArray[i].date);
                var getDYear = _this.y2k(newDate.getFullYear());
                var weeknum = _this.getWeek(getDYear, newDate.getMonth(), newDate.getDate());
                var currentWkNum = _this.getWeek(getYear, now.getMonth(), now.getDate());
                //     console.log(this.getDateOfWeek(currentWkNum,getYear));
                var firstDayOfWeek = _this.getDateOfWeek(currentWkNum, getYear);
                //      console.log(firstDayOfWeek);
                //      console.log("Converted");
                _this.stringDateArray = [];
                var formattedfirst = _this.formatdm(firstDayOfWeek);
                //var day1 = firstDayOfWeek.getDay();
                _this.stringDateArray.push("Mon " + formattedfirst);
                for (var a = 1; a < 7; a++) {
                    var SubDayOfWeek2 = firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
                    //    var TEST = firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 20);
                    //     console.log("StartDate" + this.formatdmy(SubDayOfWeek2));
                    //    TEST = this.formatdmy(TEST);
                    //  console.log(TEST); 
                    SubDayOfWeek2 = SubDayOfWeek2;
                    var day = new Date(SubDayOfWeek2).getDay();
                    var dayInString = "";
                    //         console.log(day);
                    if (day == 2) {
                        dayInString = "Tue ";
                    }
                    else if (day == 3) {
                        dayInString = "Wed ";
                    }
                    else if (day == 4) {
                        dayInString = "Thu ";
                    }
                    else if (day == 5) {
                        dayInString = "Fri ";
                    }
                    else if (day == 6) {
                        dayInString = "Sat";
                        // 0 is for sunday
                    }
                    else if (day == 0) {
                        dayInString = "Sun";
                    }
                    var formattedDate = _this.formatdm(SubDayOfWeek2);
                    _this.stringDateArray.push(dayInString + formattedDate);
                }
                if (weeknum == currentWkNum) {
                    _this.weekList.push({ id: transArray[i].id, date: newDate, amount: transArray[i].amount });
                }
            }
            console.log("look here");
            console.log(_this.stringDateArray);
            //    console.log("i am at the data");
            var list = _this.weekList;
            // console.log(list);
            var mon = 0;
            var tue = 0;
            var wed = 0;
            var thu = 0;
            var fri = 0;
            var sat = 0;
            var sun = 0;
            var day = 0;
            for (var k = 0; k < list.length; k++) {
                day = list[k].date.getDay();
                if (day == 1) {
                    mon = mon + list[k].amount;
                }
                if (day == 2) {
                    tue = tue + list[k].amount;
                }
                if (day == 3) {
                    wed = wed + list[k].amount;
                }
                if (day == 4) {
                    thu = thu + list[k].amount;
                }
                if (day == 5) {
                    fri = fri + list[k].amount;
                }
                if (day == 6) {
                    sat = sat + list[k].amount;
                    //                          console.log("fri has " +fri);
                }
                if (day == 7) {
                    sun = sun + list[k].amount;
                    //                          console.log("fri has " +fri);
                }
            }
            _this.gmon = mon;
            _this.gtue = tue;
            _this.gwed = wed;
            _this.gthu = thu;
            _this.gfri = fri;
            _this.gsat = sat;
            _this.gsun = sun;
            _this.barChartData1.push(_this.gmon);
            _this.barChartData1.push(_this.gtue);
            _this.barChartData1.push(_this.gwed);
            _this.barChartData1.push(_this.gthu);
            _this.barChartData1.push(_this.gfri);
            _this.barChartData1.push(_this.gsat);
            _this.barChartData1.push(_this.gsun);
            for (var a = 0; a < _this.barChartData1.length; a++) {
                //console.log("data");
                _this.totalWeeklySpend = _this.totalWeeklySpend + Number(_this.barChartData1[a]);
            }
            _this.getDailyChart();
        });
    };
    DashboardPage.prototype.formatdm = function (date) {
        date = new Date(date);
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        return day + '/' + month;
    };
    DashboardPage.prototype.y2k = function (number) {
        return (number < 1000) ? number + 1900 : number;
    };
    DashboardPage.prototype.getWeek = function (year, month, day) {
        var when = new Date(year, month, day);
        var newYear = new Date(year, 0, 1);
        var modDay = newYear.getDay();
        if (modDay == 0)
            modDay = 6;
        else
            modDay--;
        var daynum = ((Date.UTC(this.y2k(year), when.getMonth(), when.getDate(), 0, 0, 0) - Date.UTC(this.y2k(year), 0, 1, 0, 0, 0)) / 1000 / 60 / 60 / 24) + 1;
        if (modDay < 4) {
            var weeknum = Math.floor((daynum + modDay - 1) / 7) + 1;
        }
        else {
            var weeknum = Math.floor((daynum + modDay - 1) / 7);
            if (weeknum == 0) {
                year--;
                var prevNewYear = new Date(year, 0, 1);
                var prevmodDay = prevNewYear.getDay();
                if (prevmodDay == 0)
                    prevmodDay = 6;
                else
                    prevmodDay--;
                if (prevmodDay < 4)
                    weeknum = 53;
                else
                    weeknum = 52;
            }
        }
        return +weeknum;
    };
    DashboardPage.prototype.getDailyChart = function () {
        this.dailyBarChart = new Chart(this.dailyBarCanvas.nativeElement, {
            responsive: true,
            type: 'bar',
            data: {
                labels: this.stringDateArray,
                datasets: [{
                        label: 'Amount($)',
                        data: this.barChartData1,
                        backgroundColor: [
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)'
                        ],
                        borderColor: [
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)',
                            'rgb(88, 189, 196)'
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
    };
    DashboardPage.prototype.getBarChart = function () {
        var data = {
            labels: this.lastSixMonthNameArray,
            datasets: [{
                    label: 'Amount',
                    data: this.lastSixMonthSpendingArray,
                    backgroundColor: [
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)'
                    ],
                    borderColor: [
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)',
                        'rgb(88, 189, 196)'
                    ],
                    borderWidth: 1
                }]
        };
        var options = {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        };
        return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
    };
    DashboardPage.prototype.getDateOfWeek = function (weekNumber, year) {
        //Create a date object starting january first of chosen year, plus the number of days in a week multiplied by the week number to get the right date.
        return new Date(year, 0, 1 + ((weekNumber - 1) * 7));
    };
    DashboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DashboardPage');
    };
    DashboardPage.prototype.goToAddExpense = function () {
        this.navCtrl.push(AddexpensePage);
    };
    DashboardPage.prototype.goToViewExpense = function () {
        this.navCtrl.push(ExpensehistoryPage);
    };
    DashboardPage.prototype.goToMenu = function () {
        // this.auth.signOut();
        this.navCtrl.push(MenuPage);
    };
    DashboardPage.prototype.gallery = function () {
        this.navCtrl.push(ScanPage);
    };
    __decorate([
        Input('progress'),
        __metadata("design:type", Object)
    ], DashboardPage.prototype, "progress", void 0);
    __decorate([
        ViewChild('barCanvas'),
        __metadata("design:type", Object)
    ], DashboardPage.prototype, "barCanvas", void 0);
    __decorate([
        ViewChild('lineCanvas'),
        __metadata("design:type", Object)
    ], DashboardPage.prototype, "lineCanvas", void 0);
    __decorate([
        ViewChild('pieCanvas'),
        __metadata("design:type", Object)
    ], DashboardPage.prototype, "pieCanvas", void 0);
    __decorate([
        ViewChild('doughnutCanvas'),
        __metadata("design:type", Object)
    ], DashboardPage.prototype, "doughnutCanvas", void 0);
    __decorate([
        ViewChild('dailyBarCanvas'),
        __metadata("design:type", Object)
    ], DashboardPage.prototype, "dailyBarCanvas", void 0);
    DashboardPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-dashboard',
            templateUrl: 'dashboard.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ExpenseProvider,
            BarcodeScanner,
            Toast,
            DataServiceProvider,
            AlertController,
            ProfileProvider,
            ChangeDetectorRef,
            Camera,
            ToastController])
    ], DashboardPage);
    return DashboardPage;
}());
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map