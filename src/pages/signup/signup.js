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
import { IonicPage, NavController, AlertController, App, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, Validators } from '@angular/forms';
//import { AuthService } from '../../services/auth.service';
import { DashboardPage } from '../dashboard/dashboard';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(loadingCtrl, alertCtrl, app, navCtrl, fb, 
    //  public auth: AuthService,
    authProvider) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.backgroundImage = 'assets/imgs/background1.jpg';
        this.signupForm = fb.group({
            email: [
                "",
                Validators.compose([Validators.required, EmailValidator.isValid])
            ],
            password: [
                "",
                Validators.compose([Validators.minLength(6), Validators.required])
            ]
        });
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    /*
    signup(){
      let data = this.form.value;
          let credentials = {
              email: data.email,
              password: data.password
          };
          this.auth.signUp(credentials).then(
              () => this.navCtrl.setRoot(LoginPage),
              error => this.signupError = error.message
          );
    
  
  
    }
    */
    SignupPage.prototype.goToLogin = function () {
        this.navCtrl.setRoot(LoginPage);
    };
    SignupPage.prototype.signupUser = function () {
        var _this = this;
        if (!this.signupForm.valid) {
            console.log("Need to complete the form, current value: " + this.signupForm.value);
        }
        else {
            var email = this.signupForm.value.email;
            var password = this.signupForm.value.password;
            this.authProvider.signupUser(email, password).then(function (user) {
                _this.loading.dismiss().then(function () {
                    _this.navCtrl.setRoot(DashboardPage);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [{ text: "Ok", role: "cancel" }]
                    });
                    alert.present();
                    console.log(error.message);
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    SignupPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html',
        }),
        __metadata("design:paramtypes", [LoadingController,
            AlertController,
            App,
            NavController,
            FormBuilder,
            AuthProvider])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.js.map