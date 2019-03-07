import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';
import { ExpenseProvider } from '../../providers/expense/expense';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';
import { MenuPage } from '../menu/menu';


/**
 * Generated class for the AddexpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addexpense',
  templateUrl: 'addexpense.html',
})
export class AddexpensePage {
  spendCate: any;
  addExpenseForm: FormGroup;
  public errorMessage: string; 

  constructor(public navCtrl: NavController,fb:FormBuilder,
    public navParams: NavParams ,
    public expenseProvider: ExpenseProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    this.addExpenseForm = fb.group({
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

  }

  formatdmy(date) {

    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return day + '-' + month + '-' + year;
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddexpensePage');
  }
  goToViewExpense(){
    this.navCtrl.push(ExpensehistoryPage);
  }
  goToDashboard(){
    this.navCtrl.setRoot(DashboardPage);
  }
  goToExpenseHistory(){
    this.navCtrl.push(ExpensehistoryPage);
  }
  createExpense(
    spendDate: string,
    spentAmt: number,
    spendDesc:string,
    spendRemark:string, 
    ):void {
      if(!this.addExpenseForm.valid){
        console.log("Invalid value ");
      }
      console.log("desc is " + spendDesc);
      if(spendDesc == null){
        spendDesc ="";
      }
      if(spendRemark == null){
        spendRemark = "";
      }
      //spendDate =  this.formatdmy(spendDate);
    //console.log("Spend date is here " + spendDate);
    //  var spendDate2 = new Date(spendDate.replace(/-/g, "/"));
    //  console.log("spend date 2 is here " + spendDate2);
      spendDate = this.formatdmy(spendDate);
      this.expenseProvider
      .createExpense(spendDate,spentAmt,spendDesc,spendRemark,this.spendCate)
      .then(newExpense =>{
        this.addExpenseForm.reset();
        const toast = this.toastCtrl.create({
          message: 'The Expense was added to Database',
          duration: 3000
        });
        toast.present();
        this.goToViewExpense()
      });
    
  }
  goToMenu() {
    // this.auth.signOut();
    this.navCtrl.push(MenuPage);
  }



}
