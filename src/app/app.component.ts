import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { TabsPage } from '../pages/tabs/tabs'; 
import { AddexpensePage } from '../pages/addexpense/addexpense';
import { ExpensehistoryPage } from '../pages/expensehistory/expensehistory';
import { SignupPage } from '../pages/signup/signup';
import { UpdateexpensePage } from '../pages/updateexpense/updateexpense';
import { AddscanitemPage } from '../pages/addscanitem/addscanitem';
import firebase from 'firebase/app';
import { firebaseConfig } from './credentials';
import 'firebase/auth';


@Component({
  template: '<ion-nav #myNav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage:any = LoginPage;
  //rootPage:any = HomePage;
  //rootPage:any = DashboardPage;
  // rootPage:any = ExpensehistoryPage; 
 //  rootPage:any = AddexpensePage;
  // rootPage:any = LoginPage; 
   //  rootPage:any = SignupPage;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  
    firebase.initializeApp(firebaseConfig);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    
      
    });

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } 
      else {
       this.rootPage = DashboardPage;
       unsubscribe();
     }
    });
    
  }
 
}

