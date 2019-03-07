import { Component, ViewChild,Input,ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Footer, Alert, AlertController, ToastController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AddexpensePage } from '../addexpense/addexpense';
import { AddscanitemPage } from '../addscanitem/addscanitem';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';
import { ExpenseProvider } from '../../providers/expense/expense';
//import { AuthService } from '../../services/auth.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import 'rxjs/add/operator/map';
import { ProfileProvider } from '../../providers/profile/profile';
import { ScanPage } from '../scan/scan';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ScannyPage } from '../scanny/scanny'; 


/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  // options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE,
  //   cameraDirection:0
  // }
  


  myImage:any;
  @Input('progress') progress;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('pieCanvas') pieCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('dailyBarCanvas') dailyBarCanvas;
  barChart: any;
  dailyBarChart: any;
  lineChart: any;
  pieChart: any;
  doughnutChart: any;
  lastSixMonthSpendingArray: any[] = [];
  lastSixMonthNameArray: any[] = [];
  //monthlySpendingData: any[] = [];
  monthArrayList: any[] = [];
  categorySpendingList: any[] = [];
  categoryNameArray: any[] = [];
  categoryDataArray: any[] = [];
  budgetList:any[] = [];
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  currentMonthSpending: any;
  currentBudget:any;
  food: number;
  transport: number;
  shopping: number;
  entertainment: number;
  education: number;
  others: number;

  products: any;
  selectedProduct: any;
  productFound: boolean = false;
  productId: any;
  barcodeData: string;

  gmon: number;
  gtue: number;
  gwed: number;
  gthu: number;
  gfri: number;
  gsat: number;
  gsun: number;
  stringDateArray: any[];
  barChartData1: any[] = [];
  totalWeeklySpend: number;
  public userProfile: any;

  weekList: any[] = [{
    id: "",
    date: "",
    amount: 0
  }];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public expenseProvider: ExpenseProvider,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataService: DataServiceProvider,
    public alertCtrl:AlertController,
    public profileProvider:ProfileProvider,
    private cdr: ChangeDetectorRef,
    public camera: Camera,
    public toastCtrl: ToastController,) {


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


  editMonthlyBudget():void {
    console.log("ENTER EDIT MONTHLY BUDGET");
    const alert: Alert = this.alertCtrl.create({
      message: "Edit current monthly budget",
      inputs: [
        {
          name: "BudgetAmount",
          placeholder: "P",
          value: this.userProfile.monthlyBudget
        },
       
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateBudget(data.BudgetAmount);
          
          }
        }
      ]
    });
    this.profileProvider.updateMonthlySpending(this.currentMonthSpending);
    alert.present();

  }

  ngOnInit() {
    console.log("NG ON IN IT");
    this.getWeekData();
   
    
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
       this.currentBudget = userProfileSnapshot.val().monthlyBudget;
       this.currentMonthSpending = userProfileSnapshot.val().monthSpending;

      // solve the progress bar 
       this.cdr.detectChanges();
   
    });
    

  }

  getTotalWeeklySpending(array:any){
    console.log("Spending Method");
    console.log("Length" + array.length);

    for(var a = 0;a < array.length;a++){
      console.log("Spending Method");
      console.log(Number(array[a]));
      this.totalWeeklySpend += Number(array[a]);
    }
  }


  goToAddScanExpense(productId: string): void {
    this.navCtrl.push('AddscanitemPage', { productId: productId });
  }

  addToCategoryNameArray(category: string) {
    this.categoryNameArray.push(category);

  }
  getLastSixMonthArray() {
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
    var spendArray2: any[] = [];
    var spendNameArray: any[] = [];

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


      var monthlyList: any[] = [];
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
      spendNameArray.push(dismonth + " " + yearTobeCalculate)
      spendArray2.push(spendAmt);


    }

    this.lastSixMonthNameArray = spendNameArray;
    this.lastSixMonthSpendingArray = spendArray2;
 


  }

  groupCategory() {
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
          this.food += parseFloat(item.amount)
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

  }

  ngAfterViewInit() {


   
    this.getMonthListData().then(monthdata => {
      //  console.log("My MonthlySpendingList");
      // console.log(monthdata)
      this.monthArrayList = monthdata;
      this.getLastSixMonthArray();
      //console.log(this.currentMonthSpending);
     

      setTimeout(() => {

        this.barChart = this.getBarChart();
        this.dailyBarChart = this.getDailyChart();


      }, 200);

      this.currentMonthSpending = this.lastSixMonthSpendingArray[this.lastSixMonthSpendingArray.length - 1];
    

    });

    this.getCategoryListData().then(categoryData => {
      //  console.log("My SpendingCategory List");
      // console.log(categoryData);
      this.categorySpendingList = categoryData;
      this.groupCategory();
      /*
            for(var a = 0;a < this.categorySpendingList.length;a++){
              this.categoryDataArray.push(this.categorySpendingList[a].amount);
              this.categoryNameArray.push(this.categorySpendingList[a].category);
            }
      */
      setTimeout(() => {

        this.pieChart = this.getPieChart();

      }, 500);
      ;
      //    this.currentMonthSpending = this.lastSixMonthSpendingArray[this.lastSixMonthSpendingArray.length - 1 ];

    });

 
    //this.cdr.detectChanges();
  }
  /*
    updateData() {
      // After instantiating your chart, its data is accessible and
      // can be changed anytime with the function update().
      // It takes care of everything and even redraws the animations :D
      this.pieChart.data.datasets[0].data = [Math.random() * 1000, Math.random() * 1000, Math.random() * 1000];
      this.pieChart.update();
    }
    */

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType,
    });
  }

  getPieChart() {
    const data = {
      labels: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Education', 'Others'],
      // labels: this.categoryNameArray,
      datasets: [
        {
          // data: this.categoryDataArray,
          data: [this.food, this.transport, this.shopping, this.entertainment, this.education, this.others],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#09c1a9', '#6e49cc', '#7e7e91'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#09c1a9', '#6e49cc', '#7e7e91']
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);

  }





  async getCategoryListData(): Promise<any> {

    //  let monthList: any[] = [];
    var temp;
    var expenseList = this.expenseProvider.getExpenseList();
    const snapshot = await expenseList.once('value');
    const categoryList: any[] = [];
    snapshot.forEach(childSnapshot => {
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
    return categoryList;
  }


  async getMonthListData(): Promise<any> {

    //  let monthList: any[] = [];
    var temp;
    var expenseList = this.expenseProvider.getExpenseList();
    const snapshot = await expenseList.once('value');
    const monthList: any[] = [];
    snapshot.forEach(childSnapshot => {
      var fbDate = childSnapshot.val().date;
      var formattedDate = new Date(fbDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
      //console.log(formattedDate.getMonth());
      temp = { id: childSnapshot.key, date: formattedDate, amount: childSnapshot.val().amount };
      monthList.push(temp);
      return false;
    });
    return monthList;
  }


  getWeekData() {

    console.log("i called getweekData()");
    this.weekList = [];
    var now = new Date();
    //  console.log(now);
    var getYear = this.y2k(now.getFullYear());

    var arrayLength = 0;

    this.getMonthListData().then(monthdata => {
      console.log("My MonthlySpendingList");
      console.log(monthdata)
      var transArray = monthdata;


      // console.log("transArray");
      // console.log(transArray);
      for (var i = 0; i < transArray.length; i++) {
        var newDate = new Date(transArray[i].date);
        var getDYear = this.y2k(newDate.getFullYear());
        var weeknum = this.getWeek(getDYear, newDate.getMonth(), newDate.getDate());
        var currentWkNum = this.getWeek(getYear, now.getMonth(), now.getDate());
        //     console.log(this.getDateOfWeek(currentWkNum,getYear));
        var firstDayOfWeek = this.getDateOfWeek(currentWkNum, getYear);
        //      console.log(firstDayOfWeek);
        //      console.log("Converted");

        this.stringDateArray = [];
        var formattedfirst = this.formatdm(firstDayOfWeek);
        //var day1 = firstDayOfWeek.getDay();
        this.stringDateArray.push("Mon " + formattedfirst);
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
          } else if (day == 3) {
            dayInString = "Wed ";
          } else if (day == 4) {
            dayInString = "Thu ";
          } else if (day == 5) {
            dayInString = "Fri ";
          } else if (day == 6) {
            dayInString = "Sat";
            // 0 is for sunday
          } else if (day == 0) {

            dayInString = "Sun";
          }

          var formattedDate = this.formatdm(SubDayOfWeek2);
          this.stringDateArray.push(dayInString + formattedDate);

        }

        if (weeknum == currentWkNum) {

          this.weekList.push({ id: transArray[i].id, date: newDate, amount: transArray[i].amount });


        }

      }





      console.log("look here");
      console.log(this.stringDateArray);

      //    console.log("i am at the data");
      var list = this.weekList;
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
      this.gmon = mon;
      this.gtue = tue;
      this.gwed = wed;
      this.gthu = thu;
      this.gfri = fri;
      this.gsat = sat;
      this.gsun = sun;


      this.barChartData1.push(this.gmon);
      this.barChartData1.push(this.gtue);
      this.barChartData1.push(this.gwed);
      this.barChartData1.push(this.gthu);
      this.barChartData1.push(this.gfri);
      this.barChartData1.push(this.gsat);
      this.barChartData1.push(this.gsun);

      for(var a = 0;a < this.barChartData1.length;a++){
        //console.log("data");
        this.totalWeeklySpend = this.totalWeeklySpend + Number(this.barChartData1[a]);
      }
      this.getDailyChart();



    });





  }

  formatdm(date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return day + '/' + month;
  }
  y2k(number) {

    return (number < 1000) ? number + 1900 : number;
  }

  getWeek(year, month, day) {


    var when = new Date(year, month, day);
    var newYear = new Date(year, 0, 1);
    var modDay = newYear.getDay();

    if (modDay == 0) modDay = 6; else modDay--;

    var daynum = ((Date.UTC(this.y2k(year), when.getMonth(), when.getDate(), 0, 0, 0) - Date.UTC(this.y2k(year), 0, 1, 0, 0, 0)) / 1000 / 60 / 60 / 24) + 1;


    if (modDay < 4) {
      var weeknum = Math.floor((daynum + modDay - 1) / 7) + 1;
    } else {


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

    return + weeknum;

  }

  getDailyChart() {

    this.dailyBarChart = new Chart(this.dailyBarCanvas.nativeElement, {

      responsive: true,
      type: 'bar',
      data: {

        labels: this.stringDateArray,

        datasets: [{
          label: 'Amount(P)',
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
  }




  getBarChart() {
    const data = {
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

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }

  getDateOfWeek(weekNumber, year) {
    //Create a date object starting january first of chosen year, plus the number of days in a week multiplied by the week number to get the right date.
    return new Date(year, 0, 1 + ((weekNumber - 1) * 7));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
   
  }
  goToAddExpense() {
    this.navCtrl.push(AddexpensePage);
  }

  goToViewExpense() {
    this.navCtrl.push(ExpensehistoryPage);
  }
  goToMenu() {
    // this.auth.signOut();
    this.navCtrl.push(MenuPage);
  }
 
  gallery(){
    this.navCtrl.push(ScanPage);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    this.getWeekData();
   
    
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
       this.currentBudget = userProfileSnapshot.val().monthlyBudget;
       this.currentMonthSpending = userProfileSnapshot.val().monthSpending;

      // solve the progress bar 
       this.cdr.detectChanges();
       event.target.complete();
    });
  }

  scan(){
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit:true,
      correctOrientation:true,
      saveToPhotoAlbum:true,

    }

    this.camera.getPicture(options).then((imageData)=>{
      this.myImage = 'data:image/jpeg;base64,' + imageData;
      const toast = this.toastCtrl.create({
          message: 'The Image was captured successfully',
          duration: 3000
        });
        toast.present();
      this.navCtrl.push(ScanPage);
         
     },(err)=>{

    });
  }

  goToScan(){
    this.navCtrl.setRoot(ScannyPage);
  }


}
