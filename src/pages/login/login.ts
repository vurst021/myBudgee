import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,Loading } from 'ionic-angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Alert,AlertController, App, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { DashboardPage } from '../dashboard/dashboard';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { ResetpasswordPage } from '../resetpassword/resetpassword'


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  public loginForm: FormGroup;
  public loginError: string; 
  public backgroundImage = 'assets/imgs/background1.jpg';
  public loading: Loading;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    fb: FormBuilder,
    public app: App,
    private toast: ToastController,
    public authProvider: AuthProvider,
   
  ) { 
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
  goToSignup() {
     this.navCtrl.setRoot(SignupPage);
  }

  goToResetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
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

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.loginForm.value}`
      );
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
  
      this.authProvider.loginUser(email, password).then(
        authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(DashboardPage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: this.loginError = error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
