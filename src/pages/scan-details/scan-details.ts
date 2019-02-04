import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

/**
 * Generated class for the ScanResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-results',
  templateUrl: 'scan-results.html',
})
export class ScanDetailsPage {

	data;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireAuth: AngularFireAuth, 
      public toastCtrl: ToastController,public db: AngularFireDatabase) {
  	this.data = this.navParams.get('data');

  }

  ionViewDidLoad() {
    console.log(this.data);
  }

          // Adding a product
   saveToDatabase(){

       this.db.list(`/receipt`).push({
          store: this.data.merchantName.data,
          price: this.data.totalAmount.data,
          date: this.data.date.data,
          owner: this.fireAuth.auth.currentUser.uid
       }).then(data => {
        const toast = this.toastCtrl.create({
          message: 'The Receipt was added successfully',
          duration: 3000
        });
        toast.present();
       });
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
