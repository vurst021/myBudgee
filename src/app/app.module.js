var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
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
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { firebaseConfig } from '../config';
// import { NgxErrorsModule } from '@ultimate/ngxerrors';
// import { AuthService } from '../services/auth.service';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPageModule } from '../pages/login/login.module';
import { ProfileProvider } from '../providers/profile/profile';
import { ExpenseProvider } from '../providers/expense/expense';
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
import { IonicStorageModule } from '@ionic/storage';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                AngularFirestoreModule,
                AngularFireAuthModule,
                AngularFireStorageModule,
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
                ScanDetailsPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                Camera,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
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
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map