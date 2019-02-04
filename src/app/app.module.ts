import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AddexpensePage } from '../pages/addexpense/addexpense';
import { ExpensehistoryPage } from '../pages/expensehistory/expensehistory';
import { SignupPage } from '../pages/signup/signup';
import { UpdateexpensePage } from '../pages/updateexpense/updateexpense';
import { AddscanitemPage } from '../pages/addscanitem/addscanitem';
import { MenuPage } from '../pages/menu/menu';
import { TabsPage } from '../pages/tabs/tabs';
import { AccountPage } from '../pages/account/account';
import { TermsPage } from '../pages/terms/terms';
import { HelpPage } from '../pages/help/help';
import { ScanPage } from '../pages/scan/scan';
import { ScanDetailsPage } from '../pages/scan-details/scan-details';

import { AngularFireModule } from '@angular/fire/';
import { AngularFireAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../config';
// import { NgxErrorsModule } from '@ultimate/ngxerrors';
// import { AuthService } from '../services/auth.service';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPageModule } from '../pages/login/login.module';
import { ProfileProvider } from '../providers/profile/profile';
import { ExpenseProvider } from '../providers/expense/expense';
import { from } from 'rxjs/observable/from';
import { UpdateexpensePageModule } from '../pages/updateexpense/updateexpense.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { AddexpensePageModule } from '../pages/addexpense/addexpense.module';
import { AddscanitemPageModule } from '../pages/addscanitem/addscanitem.module';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { Camera } from '@ionic-native/camera/ngx';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    TabsPage,
   // LoginPage,
    DashboardPage,
    //AddexpensePage,
    ExpensehistoryPage,
    SignupPage,
    ProgressBarComponent,
    AccountPage,
    HelpPage,
    TermsPage,
    ScanPage,
    ScanDetailsPage

   // AddscanitemPage
    
   // UpdateexpensePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
  // NgxErrorsModule,
    LoginPageModule,
    UpdateexpensePageModule,
    AddexpensePageModule,
    HttpClientModule,
    OrderModule,
    AddscanitemPageModule,
    HttpModule
    
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    MenuPage,
    DashboardPage,
    AddexpensePage,
    ExpensehistoryPage,
    SignupPage,
    UpdateexpensePage,
    AddscanitemPage,
    AccountPage,
    TermsPage,
    HelpPage,
    ScanPage,
    ScanDetailsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    // AuthService,
    AuthProvider,
    ProfileProvider,
    ExpenseProvider,
    BarcodeScanner,
    Toast,
    DataServiceProvider
  ]
})
export class AppModule {}
