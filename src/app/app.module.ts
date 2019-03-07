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
import { AccountPage } from '../pages/account/account';
import { TermsPage } from '../pages/terms/terms';
import { HelpPage } from '../pages/help/help';
import { ScanPage } from '../pages/scan/scan';
import { ScanDetailsPage } from '../pages/scan-details/scan-details';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { ScannyPage } from '../pages/scanny/scanny';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/database';

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
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
// import { ImghandlerProvider } from '../providers/imghandler/imghandler';


import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
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
    ScanDetailsPage,
    ResetpasswordPage,
    ScannyPage,

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
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    AddscanitemPageModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
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
    ScanDetailsPage,
    ResetpasswordPage,
    ScannyPage

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
    DataServiceProvider,
    // ImghandlerProvider
  ]
})
export class AppModule {}
