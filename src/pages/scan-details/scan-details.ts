import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// import { UpdateexpensePage } from '../updateexpense/updateexpense';


/**
 * Generated class for the ScanResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-details',
  templateUrl: 'scan-details.html',
})
export class ScanDetailsPage {

	data;
  spendCate: any;
  spendRemark: any;
  public expenseListRef: firebase.database.Reference;
  public expneseItem: firebase.database.Reference;
  user = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireAuth: AngularFireAuth, 
      public toastCtrl: ToastController,public db: AngularFireDatabase) {
  	this.data = this.navParams.get('data');

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.expenseListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/expenseList`);
       // this.expneseItem = firebase
       // .database()
       // .ref(`/userProfile/${user.uid}/expenseList`);
      }
    });

  }

  ionViewDidLoad() {
    console.log(this.user);
  }

          // Adding a product
  saveToDatabase(){

      // let expenseId = this.db.list(`/userProfile/${this.user}/expenseList`).push({}).key();

       
      let newRef = this.db.list(`/userProfile/${this.user}/expenseList`).push({
        store: this.data.merchantName.data,
        price: this.data.totalAmount.data,
        date: this.data.date.data,
        category: '',
        remark: '',
      });

      var newKey = newRef.key;

      console.log(newKey);

      const toast = this.toastCtrl.create({
          message: 'The Receipt was saved successfully',
          duration: 3000
        });
        toast.present();
        this.goToUpdateExpense(newKey);
  }

  goToUpdateExpense(expenseId: string):void {
    this.navCtrl.push('UpdateexpensePage', { expenseId: expenseId });
  }
// createReceipt(
//       receiptStore: string,
//       receiptDate: string,
//       receiptPrice: number,
//     ): void {
//       this.receiptProvider
//         .createReceipt(receiptStore, receiptDate, receiptPrice)
//         .then(newReceipt => {
//           this.navCtrl.pop();
//         });
//     }

    


}
