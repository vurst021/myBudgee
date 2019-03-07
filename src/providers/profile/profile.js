var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Injectable } from '@angular/core';
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ProfileProvider = /** @class */ (function () {
    function ProfileProvider() {
        var _this = this;
        console.log('Hello Profile Provider');
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.currentUser = user;
                _this.userProfile = firebase.database().ref("/userProfile/" + user.uid);
            }
        });
    }
    ProfileProvider.prototype.getUserProfile = function () {
        return this.userProfile;
    };
    ProfileProvider.prototype.updateName = function (firstName, lastName) {
        return this.userProfile.update({ firstName: firstName, lastName: lastName });
    };
    ProfileProvider.prototype.updateDOB = function (birthDate) {
        return this.userProfile.update({ birthDate: birthDate });
    };
    ProfileProvider.prototype.updateBudget = function (monthlyBudget) {
        return this.userProfile.update({ monthlyBudget: monthlyBudget });
    };
    ProfileProvider.prototype.updateMonthlySpending = function (monthSpending) {
        return this.userProfile.update({ monthSpending: monthSpending });
    };
    ProfileProvider.prototype.updateEmail = function (newEmail, password) {
        var _this = this;
        var credential = firebase.auth.
            EmailAuthProvider.credential(this.currentUser.email, password);
        return this.currentUser
            .reauthenticateWithCredential(credential)
            .then(function (user) {
            _this.currentUser.updateEmail(newEmail).then(function (user) {
                _this.userProfile.update({ email: newEmail });
            });
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    ProfileProvider.prototype.updatePassword = function (newPassword, oldPassword) {
        var _this = this;
        var credential = firebase.auth
            .EmailAuthProvider.credential(this.currentUser.email, oldPassword);
        return this.currentUser
            .reauthenticateWithCredential(credential)
            .then(function (user) {
            _this.currentUser.updatePassword(newPassword).then(function (user) {
                console.log('Password Changed');
            });
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    ProfileProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], ProfileProvider);
    return ProfileProvider;
}());
export { ProfileProvider };
//# sourceMappingURL=profile.js.map