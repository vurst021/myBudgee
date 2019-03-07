import firebase, { User } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

public userProfile: firebase.database.Reference;
public currentUser: User;

constructor() {
  console.log('Hello Profile Provider');
  firebase.auth().onAuthStateChanged( user => {
    if(user){
      this.currentUser = user;
      this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
    }
  });
}
getUserProfile(): firebase.database.Reference {
  return this.userProfile;
}
updateName(firstName: string, lastName: string): Promise<any> {
  return this.userProfile.update({ firstName, lastName });
}
updateDOB(birthDate:string): Promise<any> {
  return this.userProfile.update({ birthDate });
}

updateBudget(monthlyBudget:number): Promise<any>{
  return this.userProfile.update({monthlyBudget});
}
updateMonthlySpending(monthSpending:number): Promise<any>{
  return this.userProfile.update({monthSpending});
}

updateEmail(newEmail: string, password: string): Promise<any> {
  const credential: firebase.auth.AuthCredential = firebase.auth.
    EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
  return this.currentUser
    .reauthenticateWithCredential(credential)
    .then(user => {
      this.currentUser.updateEmail(newEmail).then(user => {
        this.userProfile.update({ email: newEmail });
      });
    })
    .catch(error => {
      console.error(error);
    });
}

updatePassword(oldPassword: string, newPassword: string ): Promise<any> {
  const credential: firebase.auth.AuthCredential = firebase.auth
    .EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

  return this.currentUser
    .reauthenticateWithCredential(credential)
    .then(user => {
      this.currentUser.updatePassword(newPassword).then(user => {
        console.log('Password Changed');
      });
    })
    .catch(error => {
      console.error(error);
    });
}

  // updateimage(imageurl) {
  //       var promise = new Promise((resolve, reject) => {
  //           firebase.auth().currentUser.updateProfile({
  //               displayName: firebase.auth().currentUser.displayName,
  //               photoURL: imageurl      
  //           }).then(() => {
  //               firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid).update({
  //               displayName: firebase.auth().currentUser.displayName,
  //               photoURL: imageurl,
  //               uid: firebase.auth().currentUser.uid
  //               }).then(() => {
  //                   resolve({ success: true });
  //                   }).catch((err) => {
  //                       reject(err);
  //                   })
  //           }).catch((err) => {
  //                 reject(err);
  //              })  
  //       })
  //       return promise;
  //   }

}
