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
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import firebase from 'firebase/app';
import { firebaseConfig } from './credentials';
import 'firebase/auth';
import { Storage } from '@ionic/storage';
var MyApp = /** @class */ (function () {
    //rootPage:any = HomePage;
    //rootPage:any = DashboardPage;
    // rootPage:any = ExpensehistoryPage; 
    //  rootPage:any = AddexpensePage;
    // rootPage:any = LoginPage; 
    //  rootPage:any = SignupPage;
    function MyApp(platform, statusBar, splashScreen, storage, loadingCtrl) {
        var _this = this;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.rootPage = LoginPage;
        firebase.initializeApp(firebaseConfig);
        this.presentLoading();
        platform.ready().then(function () {
            _this.storage.get('introShown').then(function (result) {
                if (result) {
                    _this.rootPage = 'LoginPage';
                }
                else {
                    _this.rootPage = 'SliderPage';
                    _this.storage.set('introShown', true);
                }
                _this.loader.dismiss();
            });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // statusBar.styleDefault();
            // splashScreen.hide();
        });
        var unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                _this.rootPage = 'LoginPage';
                unsubscribe();
            }
            else {
                _this.rootPage = DashboardPage;
                unsubscribe();
            }
        });
    }
    MyApp.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: "Authenticating..."
        });
        this.loader.present();
    };
    MyApp = __decorate([
        Component({
            template: '<ion-nav #myNav [root]="rootPage"></ion-nav>'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, Storage, LoadingController])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map