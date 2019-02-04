import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';


import { DashboardPage } from '../dashboard/dashboard';
import { AccountPage } from '../account/account';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';
import { TermsPage } from '../terms/terms';
import { HelpPage } from '../help/help';
import { LoginPage } from '../login/login';
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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	
  }

  	goToAcct() {
    
      this.navCtrl.push(AccountPage);
    
  	}
  	
  	goToDash(){
  		this.navCtrl.setRoot(DashboardPage);
  	}

  	goToExp(){
  		this.navCtrl.push(ExpensehistoryPage);
  	}

  	goToHelp(){
  		this.navCtrl.push(HelpPage);
  	}

  	goToTerms(){
  		this.navCtrl.push(TermsPage);
  	}

  	logOut(){
  		// this.auth.signOut();
			this.navCtrl.setRoot(LoginPage);
  	}
}
