import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AddexpensePage } from '../pages/addexpense/addexpense';
import { ExpensehistoryPage } from '../pages/expensehistory/expensehistory';
import { SignupPage } from '../pages/signup/signup';
import { UpdateexpensePage } from '../pages/updateexpense/updateexpense';
import { AddscanitemPage } from '../pages/addscanitem/addscanitem';
import firebase from 'firebase/app';
import { firebaseConfig } from './credentials';
import 'firebase/auth';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../pages/menu/menu';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'SliderPage';
  loader:any;
  //rootPage:any = HomePage;
  //rootPage:any = DashboardPage;
  // rootPage:any = ExpensehistoryPage; 
 //  rootPage:any = AddexpensePage;
  // rootPage:any = LoginPage; 
   //  rootPage:any = SignupPage;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public loadingCtrl: LoadingController) {
  
    firebase.initializeApp(firebaseConfig);

    this.presentLoading();
    

    platform.ready().then(() => {


      this.storage.get('introShown').then((result) =>{

        if(result){
          this.rootPage = 'LoginPage';
        }else{
          this.rootPage = 'SliderPage';
          this.storage.set('introShown', true);
        }
        this.loader.dismiss();
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();

    
      
    });

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = 'SliderPage';
        unsubscribe();
      } 
      else {
       this.rootPage = DashboardPage;
       unsubscribe();
     }
    });
    
  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });
    this.loader.present();
  }
 
}

