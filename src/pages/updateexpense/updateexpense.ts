import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpenseProvider } from '../../providers/expense/expense';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';

/**
 * Generated class for the UpdateexpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: "expensehistory/:expenseId"
})
@Component({
  selector: 'page-updateexpense',
  templateUrl: 'updateexpense.html',
})
export class UpdateexpensePage {
  public currentExpense: any = {};
 // public currentSelectedCate:any;
  public currentAmt:any;
  public currentDate:any;
  public currentDesc:any;
  public currentRemark:any;
  public newDate:any;
  public date:any;
  public day:any;
  public month:any;
  public year:any;
  selected_cate:any;
  catgories: string[] = ['Food','Transport','Shopping','Entertainment','Education','Others'];

  updateExpenseForm:FormGroup;
  expenseId: string;
  public errorMessage: string; 

  constructor(public navCtrl: NavController, public navParams: NavParams,public expenseProvider:ExpenseProvider,fb:FormBuilder) {
  
  this.expenseId = this.navParams.get("expenseId");

 
  this.updateExpenseForm = fb.group({

    date: [
      "",
      Validators.compose([Validators.required])
    ],
    amount: [
      "",
      Validators.compose([Validators.required,Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")])
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



  
  formatdmy(date) {
    this.day = "";
    this.month = "";
    this.year = "";
    date = new Date(date);

    this.day = ('0' + date.getDate()).slice(-2);
    this.month = ('0' + (date.getMonth() + 1)).slice(-2);
    this.year = date.getFullYear();
  }


  ionViewDidLoad() {
    this.expenseProvider
      .getExpenseDetail(this.navParams.get("expenseId"))
      .on("value", expenseSnapshot => {
        this.currentExpense = expenseSnapshot.val();
        this.currentExpense.id = expenseSnapshot.key;
        this.selected_cate = expenseSnapshot.val().category;
        console.log("seleted cate " +this.selected_cate);
        this.currentAmt = expenseSnapshot.val().amount;
        this.date = expenseSnapshot.val().date;
        
        this.currentDate = new Date(this.date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        this.currentDate.setHours(0, - this.currentDate.getTimezoneOffset(), 0, 0);
        this.currentDate = this.currentDate.toISOString();
        this.currentDesc = expenseSnapshot.val().desc;
        this.currentRemark = expenseSnapshot.val().remark;
      });
  }

//  updateExpense(currentDate,currentAmt,selected_cate,currentDesc,currentRemark)

  updateExpense(spendDate:string,spendAmt:number,selected_cate:string,spendDesc:string,spendRemark:string) : void {

    this.formatdmy(spendDate);
    spendDate = this.day + "-" + this.month + "-" + this.year;
    if(!this.updateExpenseForm.valid){
      console.log("Invalid value ");
    }
    console.log("desc is " + spendDesc);
    if(spendDesc == null){
      spendDesc ="";
    }
    if(spendRemark == null){
      spendRemark = "";
    }

    this.expenseProvider.updateExpense(this.expenseId,spendDate,spendAmt,spendDesc,spendRemark,selected_cate)
    .then(() => {console.log("EXPENSE UPDATED"); 
    this.goToViewExpense(); 
      })
    .catch(error => {console.log('update ERROR: ' + error.message); });
    
  }
  goToViewExpense(){
    this.navCtrl.setRoot(ExpensehistoryPage);
  }

}
