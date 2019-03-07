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
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, App, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { DashboardPage } from '../dashboard/dashboard';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(loadingCtrl, alertCtrl, navCtrl, fb, app, toast, authProvider) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.app = app;
        this.toast = toast;
        this.authProvider = authProvider;
        this.backgroundImage = 'assets/imgs/background1.jpg';
        this.loginForm = fb.group({
            email: [
                '',
                Validators.compose([Validators.required, EmailValidator.isValid])
            ],
            password: [
                '',
                Validators.compose([Validators.required, Validators.minLength(6)])
            ]
        });
    }
    /*
      loginUser() {
        const loading = this.loadingCtrl.create({
          duration: 600
        });
            let data = this.loginForm.value;
    
            if (!data.email) {
                return;
            }
    
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
    
            this.authProvider.loginUser(email,password)
                .then(
                    () => this.navCtrl.setRoot(DashboardPage),
                    error => this.loginError = error.message
                );
        loading.present();
    
      //  this.navCtrl.setRoot(DashboardPage);
      }
    */
    LoginPage.prototype.goToSignup = function () {
        this.navCtrl.setRoot(SignupPage);
    };
    LoginPage.prototype.goToResetPassword = function () {
        // this.navCtrl.push(ResetPasswordPage);
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    /*
    ionViewWillLoad(){
      this.authProvider.afAuth.authState.subscribe(data => {
        if(data.email && data.uid){
          this.toast.create({
            message:"Welcome," + data.email,
            duration: 3000
          }).present();
        }
  
  
      });
    }
  */
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        if (!this.loginForm.valid) {
            console.log("Form is not valid yet, current value: " + this.loginForm.value);
        }
        else {
            var email = this.loginForm.value.email;
            var password = this.loginForm.value.password;
            this.authProvider.loginUser(email, password).then(function (authData) {
                _this.loading.dismiss().then(function () {
                    _this.navCtrl.setRoot(DashboardPage);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: _this.loginError = error.message,
                        buttons: [{ text: 'Ok', role: 'cancel' }]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [LoadingController,
            AlertController,
            NavController,
            FormBuilder,
            App,
            ToastController,
            AuthProvider])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map