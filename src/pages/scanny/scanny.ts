import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Camera} from '@ionic-native/camera';


/**
 * Generated class for the ScannyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanny',
  templateUrl: 'scanny.html',
})
export class ScannyPage {

	picData:any;
	picURL:any;
	myPicref:any;
	uid = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
  	this.myPicref = firebase.storage().ref('userProfile/${this.uid}/')
  }

  ionViewDidLoad() {
    console.log(this.uid);
  }

  takePhoto(){
  	this.camera.getPicture({
  		quality:100,
  		destinationType:this.camera.DestinationType.DATA_URL,
  		sourceType: this.camera.PictureSourceType.CAMERA,
  		encodingType: this.camera.EncodingType.PNG,
      correctOrientation:true,
      allowEdit:true,
      saveToPhotoAlbum:true,
  	}).then(imageData=>{
  		this.picData=imageData;
  		this.upload()
  	})
  }

  upload(){
  	this.myPicref.child(this.uid).child('pic.png')
  	.putString(this.picData, 'base64',{contentType:'image/png'})
  	.then(savepic=>{
  		this.picURL = savepic.downloadURL
  	})
  }

}
