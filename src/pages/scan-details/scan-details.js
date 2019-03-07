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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
/**
 * Generated class for the ScanResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScanDetailsPage = /** @class */ (function () {
    function ScanDetailsPage(navCtrl, navParams, fireAuth, toastCtrl, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fireAuth = fireAuth;
        this.toastCtrl = toastCtrl;
        this.db = db;
        this.data = this.navParams.get('data');
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.expenseListRef = firebase
                    .database()
                    .ref("/userProfile/" + user.uid + "/expenseList");
                // this.expneseItem = firebase
                // .database()
                // .ref(`/userProfile/${user.uid}/expenseList`);
            }
        });
    }
    ScanDetailsPage.prototype.ionViewDidLoad = function () {
        console.log(this.data);
    };
    // Adding a product
    ScanDetailsPage.prototype.saveToDatabase = function () {
        var _this = this;
        this.db.list("/receipt").push({
            store: this.data.merchantName.data,
            price: this.data.totalAmount.data,
            date: this.data.date.data,
            owner: this.fireAuth.auth.currentUser.uid
        }).then(function (data) {
            var toast = _this.toastCtrl.create({
                message: 'The Receipt was added successfully',
                duration: 3000
            });
            toast.present();
        });
    };
    ScanDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-scan-details',
            templateUrl: 'scan-details.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AngularFireAuth,
            ToastController, AngularFireDatabase])
    ], ScanDetailsPage);
    return ScanDetailsPage;
}());
export { ScanDetailsPage };
//# sourceMappingURL=scan-details.js.map