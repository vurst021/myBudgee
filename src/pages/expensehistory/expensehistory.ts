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

@IonicPage()
@Component({
  selector: 'page-expensehistory',
  templateUrl: 'expensehistory.html',
})
export class ExpensehistoryPage {

  public expenseList: Array<any>;
  //public currentExpense: any = {};
  tab1: string;
  date: string = 'date';
  reverse: boolean = true;
  cat: string = "tab1"
  public loadedSpendingList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public expenseProvider:ExpenseProvider) {
    
  }


  getMonth() {
    var nowdate = new Date();
    //console.log(nowdate);
    var dateArray: any[] = [];
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
  }
  getMonthString(date:Date){
    var month = "";
    if(date.getMonth() == 0){
      month = "January";
    }
    else if(date.getMonth() == 1){
      month = "February";
    }
    else if(date.getMonth() == 2){
      month = "March";
    }
    else if(date.getMonth() == 3){
      month = "April";
    }
    else if(date.getMonth() == 4){
      month = "May";
    }
    else if(date.getMonth() == 5){
      month = "June";
    }
    else if(date.getMonth() == 6){
      month = "July";
    }
    else if(date.getMonth() == 7){
      month = "August";
    }
    else if(date.getMonth() == 8){
      month = "September";
    }
    else if(date.getMonth() == 9){
     month = "October"; 
    }
    else if(date.getMonth() == 10){
      month = "November";
    }
    else if(date.getMonth() == 11){
      month = "December";
    }
    return month;

  }

  

  

  format(date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return month + '-' + day + '-' + year;
  }


  format2 (date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return day + '/' + month + '/' + year;
  }

    
  ionViewDidLoad() { 
    console.log('ionViewDidLoad ExpensehistoryPage');
   // this.getMonth();
  
    console.log("Expense list in uonViewDidLoad" + this.expenseList);
  }

  ionViewDidEnter() {

    this.getMonth();
     // retrieve curreng month spending record
     this.getCurrentMthRecord();

  }

  getCurrentMthRecord(){
    this.expenseProvider.getExpenseList().on("value", expenseListSnapshot => {
      this.expenseList = [];
      expenseListSnapshot.forEach(snap => {
        var today = new Date();
        var snapDate = snap.val().date;
        var formattedDate =  new Date(snapDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        var formattedDate2 = this.format2(formattedDate);

        if(formattedDate.getMonth() == today.getMonth() && formattedDate.getFullYear() == today.getFullYear())
        this.expenseList.push({
          id: snap.key,
          amount: snap.val().amount,
          category: snap.val().category,
          date: formattedDate2,
          desc: snap.val().desc,
          remark: snap.val().remark
        });
        this.loadedSpendingList = this.expenseList;
        return false;
      });
    });
  }
  getAllRecord(){
    this.expenseProvider.getExpenseList().on("value", expenseListSnapshot => {
      this.expenseList = [];
      expenseListSnapshot.forEach(snap => {
        var snapDate = snap.val().date;
        var formattedDate =  new Date(snapDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        var  formattedDate2 = this.format2(formattedDate);
        this.expenseList.push({
          id: snap.key,
          amount: snap.val().amount,
          category: snap.val().category,
          date: formattedDate2,
          desc: snap.val().desc,
          remark: snap.val().remark
        });
        this.loadedSpendingList = this.expenseList;
        return false;
      });
    });

  }
  // search bar

  initializeItems(): void {
    this.expenseList = this.loadedSpendingList;
  }

  getItems(searchbar) {
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
    this.expenseList = this.expenseList.filter((item) => {
      if (item.desc && q || item.category && q || item.remark && q || item.date && q || item.amount && q) {
        console.log("name");
       console.log(item.desc)
       //var date1 = item.date;
     //  var formattedDate =  new Date(date1.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
       var formatDate2 = this.format2(item.date);
       var amount2 = String(item.amount);
        console.log("formatted date2 " + formatDate2);
        if (item.desc.toLowerCase().indexOf(q.toLowerCase()) > -1 || item.category.toLowerCase().indexOf(q.toLowerCase()) > -1 || item.remark.toLowerCase().indexOf(q.toLowerCase()) > -1 
        || formatDate2.toLowerCase().indexOf(q.toLowerCase()) > -1 || amount2.toLowerCase().indexOf(q.toLowerCase()) > -1 ) {
          return true;
        }
        return false;
      }
    });
  }



  goToDashboard(){
    this.navCtrl.setRoot(DashboardPage);
  }
  goToAddExpense(){
   this.navCtrl.setRoot(AddexpensePage);
 }
 goToUpdateExpense(expenseId: string):void {
  this.navCtrl.push('UpdateexpensePage', { expenseId: expenseId });
}
}

