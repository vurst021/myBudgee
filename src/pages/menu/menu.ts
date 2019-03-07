import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';


import { DashboardPage } from '../dashboard/dashboard';
import { AccountPage } from '../account/account';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';
import { TermsPage } from '../terms/terms';
import { HelpPage } from '../help/help';
import { LoginPage } from '../login/login';
import 'firebase/auth';



/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface PageInterface{
	title: string;
	pageName: string;
	tabComponent?: any;
	index?: number; 
	icon: string;
} 


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  // rootPage = DashboardPage;
 
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
 

public userProfile: any;


  constructor(public navCtrl: NavController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider,
    public navParams: NavParams) {


  	
  }

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      
    });
  }  


  	goToAcct() {
    
      this.navCtrl.setRoot(AccountPage);
    
  	}
  	
  	goToDash(){
  		this.navCtrl.setRoot(DashboardPage);
  	}

  	goToExp(){
  		this.navCtrl.setRoot(ExpensehistoryPage);
  	}

  	goToHelp(){
  		this.navCtrl.setRoot(HelpPage);
  	}

  	goToTerms(){
  		this.navCtrl.setRoot(TermsPage);
  	}

  	logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot("LoginPage");
    });
  }
}
