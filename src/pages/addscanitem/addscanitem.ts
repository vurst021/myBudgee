import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';
import { ExpenseProvider } from '../../providers/expense/expense';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the AddscanitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addscanitem',
  templateUrl: 'addscanitem.html',
})
export class AddscanitemPage {

  spendCate: any;
  addExpenseForm: FormGroup;
  public errorMessage: string; 

  productId:any;
  itemDesc:any;
  itemPrice:any;
  itemRemark:any;

  products: any;
  selectedProduct: any;
  productFound: boolean = false;
 

  constructor(public navCtrl: NavController,fb:FormBuilder,public navParams: NavParams ,public expenseProvider: ExpenseProvider,
    public dataService: DataServiceProvider) {
    this.productId = this.navParams.get("productId");
    

    console.log("PRODUCT ID " + this.productId);
    


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



  ngAfterViewInit() {

    this.dataService.getItem(this.productId)
    .subscribe((response)=> {
      console.log('my data', response);
       this.products = response;
       //this.selectedProduct = {};
       console.log("pass over para id" + this.productId);
    //   this.selectedProduct = this.products.find(product => product.gtin14 === this.productId);
       if(this.products !== undefined) {
         this.productFound = true;
         console.log("HI I AM IN THE API");
        this.itemDesc = this.products.brand_name + " " +this.products.name;
        //this.itemPrice = this.selectedProduct.price;
       // this.itemRemark = this.products.brand_name;
        
       }
       else{
       }
 
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
    //this.scan();
    console.log('ionViewDidLoad AddscanitemPage');
  }
  goToViewExpense(){
    this.navCtrl.setRoot(ExpensehistoryPage);
  }
  goToDashboard(){
    this.navCtrl.setRoot(DashboardPage);
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
      spendDate = this.formatdmy(spendDate);
      this.expenseProvider
      .createExpense(spendDate,spentAmt,spendDesc,spendRemark,this.spendCate)
      .then(newExpense =>{
        this.goToViewExpense()
        
          

      });
    
  }

}
