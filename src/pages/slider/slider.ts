import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
/**
 * Generated class for the SliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }

  goToLogin(){
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
  	this.navCtrl.setRoot(LoginPage);
    loader.dismiss();
  }

}
