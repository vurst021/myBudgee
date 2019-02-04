import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController,App,Loading, NavParams,Alert, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
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

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupError: string; 
  signupForm:FormGroup
  public backgroundImage = 'assets/imgs/background1.jpg';
  public loading: Loading;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    fb:FormBuilder,
  //  public auth: AuthService,
    public authProvider: AuthProvider
  ) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
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
  goToLogin() {
     this.navCtrl.setRoot(LoginPage);
  }

signupUser(): void {
  if (!this.signupForm.valid) {
    console.log(
      `Need to complete the form, current value: ${this.signupForm.value}`
    );
  } else {
    const email: string = this.signupForm.value.email;
    const password: string = this.signupForm.value.password;

    this.authProvider.signupUser(email, password).then(
      user => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(DashboardPage);
        });
      },
      error => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: "Ok", role: "cancel" }]
          });
          alert.present();
          console.log(error.message);
        });
      }
    );
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}

}
   


