import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from 'moment';
import { ExpenseProvider } from '../../providers/expense/expense';
import { ExpensehistoryPage } from '../expensehistory/expensehistory';
import { MenuPage } from '../menu/menu'; 



import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ScanDetailsPage } from '../scan-details/scan-details';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  myImage: any;
  imageText: string;
  data: any;
  myPhoto:any;
  imageRef:any;
  myCameraImage:any;
  spendCate: any;
  spendRemark: any;
  user = firebase.auth().currentUser.uid;
  imageUrl: {};


  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection:0
  }
  	
  public expenseListRef: firebase.database.Reference;
  public expneseItem: firebase.database.Reference;
  public currentMonthTotalSpend  = 0;
  public currentMonthBudget  = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http,
      public db: AngularFireDatabase,
      public store: AngularFireStorage,
      public fireAuth: AngularFireAuth, 
      public toastCtrl: ToastController,
      private formBuilder: FormBuilder,
      private loadingCtrl: LoadingController,
      private camera: Camera,
      public expenseProvider: ExpenseProvider
   
    
      ) {
    
    this.myImage = this.navParams.get('data');
    this.myPhoto = this.myImage;
    

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.expenseListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/expenseList`);

       // this.expneseItem = firebase
       // .database()
       // .ref(`/userProfile/${user.uid}/expenseList`);
      }
    });
  }

  formatdmy(date) {

      date = new Date(date);

      var day = ('0' + date.getDate()).slice(-2);
      var month = ('0' + (date.getMonth() + 1)).slice(-2);
      var year = date.getFullYear();

      return day + '-' + month + '-' + year;
  }

  onImgChanged(event) {
    // const options: CameraOptions = {
    //   quality:70,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   saveToPhotoAlbum:false,
    //   allowEdit:true,
    //   correctOrientation:true
    // }

    // this.camera.getPicture(options).then((imageData)=>{
    //   this.myImage = 'data:image/jpeg;base64,' + imageData;
    //   this.navCtrl.push(ScanPage, {
    //     data: this.myImage
    //   });
    // },(err)=>{

    // });

     if(event.target.files && event.target.files[0]){
          let reader = new FileReader();

          reader.onload = (event:any) => {
            this.myPhoto = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
        }
          let fileList: FileList = event.target.files;  
          let file: File = fileList[0];
          console.log(file);

          this.myImage = event.target.files[0];
          console.log(this.myImage);
      }


  // takePhoto(){
  //     this.camera.getPicture({
  //     quality:100,
  //     destinationType:this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.CAMERA,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     correctOrientation:true,
  //     allowEdit:true,
  //     saveToPhotoAlbum:true,
  //   }).then(imageData=>{
  //     this.upload();
  //   });
  // }


   
  recognize(){

    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let headers = new Headers();
    
    headers.append('Accept', 'application/json');
    headers.append('apikey', 'aee073101c4f11e9bba4c5572eb43161');
     
       
    let formData = new FormData();
    
    formData.append('file', this.myImage);

    console.log(this.myImage);
    
    this.http.post('https://api.taggun.io/api/receipt/v1/simple/file', formData, {headers: headers})
    .pipe(map(res => res.json()))
      .subscribe(data =>{
        console.log(data);
        this.data = data;
        loader.dismiss();
        // this.data.date.data = moment(this.data.date.data).subtract(10, 'days').calendar();
        this.data.date.data = this.formatdmy(this.data.date.data);
        this.data.image = this.myImage;
        console.log(this.data.image);
        this.upload(this.data.image);
        // console.log(this.imageUrl);
        // this.saveToDatabase();
        
        
      });(err)=> {
        loader.dismiss()
        const toast = this.toastCtrl.create({
          message: 'The Receipt was not scanned',
          duration: 3000
        });
        toast.present();
      };
    }


    saveToDatabase(){

      // let expenseId = this.db.list(`/userProfile/${this.user}/expenseList`).push({}).key();
      
      let newRef = this.db.list(`/userProfile/${this.user}/expenseList`).push({
        desc: this.data.merchantName.data,
        amount: this.data.totalAmount.data,
        date: this.data.date.data,
        category: '',
        remark: '',
        imgUrl: this.imageUrl,
      });

      var newKey = newRef.key;

      console.log(newKey);

      console.log(this.data.image)

      
      const toast = this.toastCtrl.create({
          message: 'The Receipt was scanned successfully',
          duration: 3000
        });
        toast.present();

        this.goToUpdateExpense(newKey);
    
    }

  upload(image:any){

    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let file = this.data.image;
    
    const metaData = { contentType: 'image/jpeg'};
    // const storRef: firebase.storage.Reference = firebase.storage().ref(`/userProfile/${this.fireAuth.auth.currentUser.uid}/` + file.name);

    const storeRef = firebase.storage().ref();

    console.log(storeRef);

    // storRef.put(file).then(function(result){
    //   storRef.getDownloadURL().then(function(result){
    //     this.imageUrl = result;
    //     console.log(this.imageUrl);
    //     loader.dismiss();
    //   }).
    //   catch(function(error){
    //     console.log('tangina mali');
    //     loader.dismiss();
    //   });
    // });

    const uploadTask = storeRef.child(`userProfile/${this.fireAuth.auth.currentUser.uid}/`+file.name).put(file, metaData);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot){
        var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes)*100;
        console.log('Upload is ' + progress + '% done');
        switch (uploadTask.snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {

      switch (error.message) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          loader.dismiss();
          break;

        case 'storage/canceled':
          // User canceled the upload
          loader.dismiss();
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          loader.dismiss();
          break;
      }
    }, function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        this.imageUrl = downloadURL;
        console.log(this.imageUrl);
        loader.dismiss();
      });
    });
  }
  

  goToUpdateExpense(expenseId: string):void {
    this.navCtrl.push('UpdateexpensePage', { expenseId: expenseId });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }




}