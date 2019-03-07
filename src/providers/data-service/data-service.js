var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { HttpModule } from '@angular/http';
/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataServiceProvider = /** @class */ (function () {
    // itemId:string;
    function DataServiceProvider(http) {
        this.http = http;
        //getApiUrl : string = "https://www.datakick.org/api/items";
        // using of third party website
        this.getApiUrl = "https://cors.io/?https://www.datakick.org/api/items";
        console.log('Hello DataServiceProvider Provider');
    }
    //getApiUrl2 : string = "https://cors.io/?https://www.datakick.org/api/items/" + this.itemId;
    DataServiceProvider.prototype.getListDetails = function () {
        return this.http.get(this.getApiUrl)
            .map(function (res) { return res; });
    };
    DataServiceProvider.prototype.getItem = function (itemId) {
        return this.http.get(this.getApiUrl + "/" + itemId)
            .map(function (res) { return res; });
    };
    DataServiceProvider.prototype.postData = function (itemId, desc) {
        this.http.post('https://cors.io/?https://www.datakick.org/api/items', {
            gtin14: itemId,
            name: desc,
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
            .toPromise()
            .then(function (data) {
            console.log(data);
        }).catch(function (error) {
            console.log(error.status);
        });
    };
    DataServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataServiceProvider);
    return DataServiceProvider;
}());
export { DataServiceProvider };
//# sourceMappingURL=data-service.js.map