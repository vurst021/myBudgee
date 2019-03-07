import { Component } from "@angular/core";
import {
  Alert,
  AlertController,
  IonicPage,
  NavController,
  ActionSheetController,
  LoadingController
} from "ionic-angular";

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';

// import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { ProfileProvider } from "../../providers/profile/profile";
import { AuthProvider } from "../../providers/auth/auth";
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "account.html"
})
export class AccountPage {
  public userProfile: any;
  public birthDate: string;
  image: any = null;

  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon = true;


  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider,
    public camera: Camera,
    public afDb: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    // public imgservice: ImghandlerProvider
  ) {}



  	ionViewDidLoad() {
	  this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
	    this.userProfile = userProfileSnapshot.val();
	    this.birthDate = userProfileSnapshot.val().birthDate;
	  });

	  

	}

	logOut(): void {
	  this.authProvider.logoutUser().then(() => {
	    this.navCtrl.setRoot("LoginPage");
	  });
	}

	updateName(): void {
	  const alert: Alert = this.alertCtrl.create({
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
	        handler: data => {
	          this.profileProvider.updateName(data.firstName, data.lastName);
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	updateDOB(birthDate:string):void {
	  this.profileProvider.updateDOB(birthDate);
	}

	updateEmail(): void {
	  let alert: Alert = this.alertCtrl.create({
	    inputs: [{ name: 'newEmail', placeholder: 'Your new email' },
	    { name: 'password', placeholder: 'Your password', type: 'password' }],
	    buttons: [
	      { text: 'Cancel' },
	      { text: 'Save',
	        handler: data => {
	          this.profileProvider
	            .updateEmail(data.newEmail, data.password)
	            .then(() => { console.log('Email Changed Successfully'); })
	            .catch(error => { console.log('ERROR: ' + error.message); });
	      }}]
	  });
	  alert.present();
	}

	updatePassword(): void {
	  let alert: Alert = this.alertCtrl.create({
	    inputs: [
	      { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
        { name: 'newPassword', placeholder: 'New password', type: 'password' }],
	    buttons: [
	      { text: 'Cancel' },
	      { text: 'Save',
	        handler: data => {
	          this.profileProvider.updatePassword(
	            data.oldPassword,
              data.newPassword
	          );
	        }
	      }
	    ]
	  });
	  alert.present();
	}

// chooseimage() {
//     let loader = this.loadingCtrl.create({
//       content: 'Please wait'
//     })
//     loader.present();
//     this.imgservice.uploadimage().then((uploadedurl: any) => {
//       loader.dismiss();
//       this.zone.run(() => {
//         this.imgurl = uploadedurl;
//         this.moveon = false;
//       })
//     })
//   }
 
//   updateproceed() {
//     let loader = this.loadingCtrl.create({
//       content: 'Please wait'
//     })
//     loader.present();
//     this.userservice.updateimage(this.imgurl).then((res: any) => {
//       loader.dismiss();
//       if (res.success) {
//         this.navCtrl.setRoot('TabsPage');
//       }
//       else {
//         alert(res);
//       }
//     })
//   }
 

  goToMenu() {
    // this.auth.signOut();
    this.navCtrl.push(MenuPage);
  }

}