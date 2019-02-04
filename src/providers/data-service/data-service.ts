import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Http ,Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


//import { HttpModule } from '@angular/http';


/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

 // itemId:string;
  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }


  //getApiUrl : string = "https://www.datakick.org/api/items";
  // using of third party website

  getApiUrl : string = "https://cors.io/?https://www.datakick.org/api/items";
  //getApiUrl2 : string = "https://cors.io/?https://www.datakick.org/api/items/" + this.itemId;
  
  getListDetails(){
   
    return  this.http.get(this.getApiUrl)
    .map(res => res);
    
  
    }
    getItem(itemId:string){
   
      return  this.http.get(this.getApiUrl+"/"+itemId)
      .map(res => res);
      
    
      }

      postData(itemId:string,desc:string){
        this.http.post('https://cors.io/?https://www.datakick.org/api/items', 
    { 
      gtin14 : itemId,
      name:desc,
    
  }, 
  {
  headers: { 'Content-Type': 'application/json' }
  })
  .toPromise()
  .then(data => {
  console.log(data);
  }).catch(error => {
  console.log(error.status);
  });
      }

}
