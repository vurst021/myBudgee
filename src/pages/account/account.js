var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { AlertController, IonicPage, NavController, ActionSheetController, LoadingController } from "ionic-angular";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Camera } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { ProfileProvider } from "../../providers/profile/profile";
import { AuthProvider } from "../../providers/auth/auth";
var AccountPage = /** @class */ (function () {
    function AccountPage(navCtrl, actionSheetCtrl, alertCtrl, authProvider, profileProvider, camera, afDb, afAuth, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.authProvider = authProvider;
        this.profileProvider = profileProvider;
        this.camera = camera;
        this.afDb = afDb;
        this.afAuth = afAuth;
        this.loadingCtrl = loadingCtrl;
        this.image = null;
    }
    AccountPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.profileProvider.getUserProfile().on("value", function (userProfileSnapshot) {
            _this.userProfile = userProfileSnapshot.val();
            _this.birthDate = userProfileSnapshot.val().birthDate;
        });
    };
    AccountPage.prototype.logOut = function () {
        var _this = this;
        this.authProvider.logoutUser().then(function () {
            _this.navCtrl.setRoot("LoginPage");
        });
    };
    AccountPage.prototype.updateName = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Your first name & last name",
            inputs: [
                {
                    name: "firstName",
                    placeholder: "Your first name",
                    value: this.userProfile.firstName
                },
                {
                    name: "lastName",
                    placeholder: "Your last name",
                    value: this.userProfile.lastName
                }
            ],
            buttons: [
                { text: "Cancel" },
                {
                    text: "Save",
                    handler: function (data) {
                        _this.profileProvider.updateName(data.firstName, data.lastName);
                    }
                }
            ]
        });
        alert.present();
    };
    AccountPage.prototype.updateDOB = function (birthDate) {
        this.profileProvider.updateDOB(birthDate);
    };
    AccountPage.prototype.updateEmail = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            inputs: [{ name: 'newEmail', placeholder: 'Your new email' },
                { name: 'password', placeholder: 'Your password', type: 'password' }],
            buttons: [
                { text: 'Cancel' },
                { text: 'Save',
                    handler: function (data) {
                        _this.profileProvider
                            .updateEmail(data.newEmail, data.password)
                            .then(function () { console.log('Email Changed Successfully'); })
                            .catch(function (error) { console.log('ERROR: ' + error.message); });
                    } }
            ]
        });
        alert.present();
    };
    AccountPage.prototype.updatePassword = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            inputs: [
                { name: 'newPassword', placeholder: 'New password', type: 'password' },
                { name: 'oldPassword', placeholder: 'Old password', type: 'password' }
            ],
            buttons: [
                { text: 'Cancel' },
                { text: 'Save',
                    handler: function (data) {
                        _this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
                    }
                }
            ]
        });
        alert.present();
    };
    AccountPage.prototype.selectImage = function () {
        var _this = this;
        this.actionSheetCtrl.create({
            title: 'Set Profile Picture',
            buttons: [
                {
                    text: 'Take a Photo',
                    handler: function () {
                        _this.selectImageInCamera();
                    }
                },
                {
                    text: 'Choose from Gallery',
                    handler: function () {
                        _this.selectImageInGallery();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        }).present();
    };
    AccountPage.prototype.selectImageInCamera = function () {
        var _this = this;
        var CAMERA_OPTIONS = {
            allowEdit: true,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(CAMERA_OPTIONS).then(function (imageData) {
            _this.image = "data:image/jpeg;base64," + imageData;
        }).catch(function (err) { return console.error(err); });
    };
    AccountPage.prototype.selectImageInGallery = function () {
        var _this = this;
        var CAMERA_OPTIONS = {
            allowEdit: true,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(CAMERA_OPTIONS).then(function (imageData) {
            _this.image = "data:image/jpeg;base64," + imageData;
        }).catch(function (err) { return console.error(err); });
    };
    AccountPage.prototype.uploadPhoto = function (uid) {
        var _this = this;
        var storageRef = firebase.storage().ref();
        var loading = this.loadingCtrl.create();
        loading.present();
        storageRef.child("/profile_pictures/" + uid + ".png")
            .putString(this.image, 'data_url')
            .then(function (imageResult) {
            _this.afDb.object("/users/" + uid + "/photoURL").set(imageResult.downloadURL);
            loading.dismiss();
        }).catch(function (err) { return console.error(err); });
    };
    AccountPage = __decorate([
        IonicPage(),
        Component({
            selector: "page-profile",
            templateUrl: "account.html"
        }),
        __metadata("design:paramtypes", [NavController,
            ActionSheetController,
            AlertController,
            AuthProvider,
            ProfileProvider,
            Camera,
            AngularFireDatabase,
            AngularFireAuth,
            LoadingController])
    ], AccountPage);
    return AccountPage;
}());
export { AccountPage };
//# sourceMappingURL=account.js.map