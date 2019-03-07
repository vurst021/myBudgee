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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { DashboardPage } from '../dashboard/dashboard';
import { AccountPage } from '../account/account';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';
import { TermsPage } from '../terms/terms';
import { HelpPage } from '../help/help';
import 'firebase/auth';
var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, authProvider, profileProvider, navParams) {
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.profileProvider = profileProvider;
        this.navParams = navParams;
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.profileProvider.getUserProfile().on("value", function (userProfileSnapshot) {
            _this.userProfile = userProfileSnapshot.val();
        });
    };
    MenuPage.prototype.goToAcct = function () {
        this.navCtrl.push(AccountPage);
    };
    MenuPage.prototype.goToDash = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    MenuPage.prototype.goToExp = function () {
        this.navCtrl.push(ExpensehistoryPage);
    };
    MenuPage.prototype.goToHelp = function () {
        this.navCtrl.push(HelpPage);
    };
    MenuPage.prototype.goToTerms = function () {
        this.navCtrl.push(TermsPage);
    };
    MenuPage.prototype.logOut = function () {
        var _this = this;
        this.authProvider.logoutUser().then(function () {
            _this.navCtrl.setRoot("LoginPage");
        });
    };
    MenuPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-menu',
            templateUrl: 'menu.html',
        }),
        __metadata("design:paramtypes", [NavController,
            AuthProvider,
            ProfileProvider,
            NavParams])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.js.map