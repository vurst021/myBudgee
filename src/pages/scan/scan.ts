import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as moment from 'moment';

import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ScanDetailsPage } from '../scan-details/scan-details';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


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
  myCameraImage:any;


  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection:0
  }
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http,
      public db: AngularFireDatabase,
      public fireAuth: AngularFireAuth, 
      public toastCtrl: ToastController,
      private formBuilder: FormBuilder,
      private loadingCtrl: LoadingController,
      private camera: Camera ,
   
    
      ) {
    
    this.myImage = this.navParams.get('data');
    this.myPhoto = this.myImage;

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

    
    this.http.post('https://api.taggun.io/api/receipt/v1/simple/file', formData, {headers: headers})
    .pipe(map(res => res.json()))
      .subscribe(data =>{
        console.log(data);
        this.data = data;
        loader.dismiss();
        this.data.date.data = moment(this.data.date.data).subtract(10, 'days').calendar();
        this.navCtrl.push(ScanDetailsPage, {data: this.data});
      });(err)=> {
        loader.dismiss()
        const toast = this.toastCtrl.create({
          message: 'The Receipt was not scanned',
          duration: 3000
        });
        toast.present();
      };
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }
}