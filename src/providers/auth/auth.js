var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
var AuthProvider = /** @class */ (function () {
    function AuthProvider() {
    }
    AuthProvider.prototype.loginUser = function (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
    AuthProvider.prototype.signupUser = function (email, password) {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (newUserCredential) {
            firebase
                .database()
                .ref("/userProfile/" + newUserCredential.user.uid + "/email")
                .set(email);
        })
            .catch(function (error) {
            console.error(error);
            throw new Error(error);
        });
    };
    AuthProvider.prototype.resetPassword = function (email) {
        return firebase.auth().sendPasswordResetEmail(email);
    };
    AuthProvider.prototype.logoutUser = function () {
        var userId = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("/userProfile/" + userId)
            .off();
        return firebase.auth().signOut();
    };
    AuthProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], AuthProvider);
    return AuthProvider;
}());
export { AuthProvider };
//# sourceMappingURL=auth.js.map