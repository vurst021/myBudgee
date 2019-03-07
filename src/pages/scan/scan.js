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
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Camera } from '@ionic-native/camera/ngx';
import { ExpenseProvider } from '../../providers/expense/expense';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { ScanDetailsPage } from '../scan-details/scan-details';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
var ScanPage = /** @class */ (function () {
    function ScanPage(navCtrl, navParams, http, db, fireAuth, toastCtrl, formBuilder, loadingCtrl, camera, expenseProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.db = db;
        this.fireAuth = fireAuth;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.expenseProvider = expenseProvider;
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            cameraDirection: 0
        };
        this.currentMonthTotalSpend = 0;
        this.currentMonthBudget = 0;
        this.myImage = this.navParams.get('data');
        this.myPhoto = this.myImage;
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
    ScanPage.prototype.formatdmy = function (date) {
        date = new Date(date);
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        return day + '-' + month + '-' + year;
    };
    ScanPage.prototype.onImgChanged = function (event) {
        // const options: CameraOptions = {
        //   quality:70,
        //   destinationType: this.camera.DestinationType.DATA_URL,
        //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        //   saveToPhotoAlbum:false,
        //   allowEdit:true,
        //   correctOrientation:true
        // }
        var _this = this;
        // this.camera.getPicture(options).then((imageData)=>{
        //   this.myImage = 'data:image/jpeg;base64,' + imageData;
        //   this.navCtrl.push(ScanPage, {
        //     data: this.myImage
        //   });
        // },(err)=>{
        // });
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.myPhoto = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        var fileList = event.target.files;
        var file = fileList[0];
        console.log(file);
        this.myImage = event.target.files[0];
        console.log(this.myImage);
    };
    ScanPage.prototype.recognize = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('apikey', 'aee073101c4f11e9bba4c5572eb43161');
        var formData = new FormData();
        formData.append('file', this.myImage);
        this.http.post('https://api.taggun.io/api/receipt/v1/simple/file', formData, { headers: headers })
            .pipe(map(function (res) { return res.json(); }))
            .subscribe(function (data) {
            console.log(data);
            _this.data = data;
            loader.dismiss();
            // this.data.date.data = moment(this.data.date.data).subtract(10, 'days').calendar();
            _this.data.date.data = _this.formatdmy(_this.data.date.data);
            _this.navCtrl.push(ScanDetailsPage, { data: _this.data });
        });
        (function (err) {
            loader.dismiss();
            var toast = _this.toastCtrl.create({
                message: 'The Receipt was not scanned',
                duration: 3000
            });
            toast.present();
        });
    };
    ScanPage.prototype.goToViewExpense = function () {
        this.navCtrl.setRoot(ExpensehistoryPage);
    };
    // createRe
    ScanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ScanPage');
    };
    ScanPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-scan',
            templateUrl: 'scan.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Http,
            AngularFireDatabase,
            AngularFireAuth,
            ToastController,
            FormBuilder,
            LoadingController,
            Camera,
            ExpenseProvider])
    ], ScanPage);
    return ScanPage;
}());
export { ScanPage };
//# sourceMappingURL=scan.js.map