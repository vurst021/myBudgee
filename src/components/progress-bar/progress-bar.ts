import { Component, Input,ChangeDetectorRef } from '@angular/core';
import { ExpenseProvider } from '../../providers/expense/expense';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  @Input('progress') progress;
  text: string;
  budgetNumber:number;
  currentSpending:number;
  status:boolean;
  userProfile: any;
  unit:string;
  statusMsg:string;
  //noSetting:string;
  constructor(public expenseProvider: ExpenseProvider,
              public profileProvider:ProfileProvider,
              private cdr: ChangeDetectorRef) {
             console.log("PROGRESS Constructor");
             this.budgetNumber = 0;
             this.currentSpending = 0;
             this.unit = "";
             this.statusMsg = "";
         
            
          
          }   

//    ngAfterViewInit(){
     // this.getProgress();
 //      this.cdr.detectChanges();
  //        }

  getProgress(){

   //console.log("PRORESS BAR CALL");

   // setTimeout(() => {
      this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.val();
         this.budgetNumber = userProfileSnapshot.val().monthlyBudget;
          this.currentSpending = userProfileSnapshot.val().monthSpending;
     //     console.log(this.currentSpending);
      });

    
     
    
     //  this.progress = ("$"+ this.currentSpending + "/$" +this.budgetNumber);
       
     // var value = this.progress;
      if(this.budgetNumber > 0){
        this.progress = ((this.currentSpending/this.budgetNumber)*100).toFixed(2);
       // var width1 = this.progress;
       // var stringMsg = (this.progress).toString();
      // this.progress = "On Track: " + stringMsg;
      if(this.currentSpending > this.budgetNumber){
     
       this.progress = ((((this.currentSpending - this.budgetNumber)/this.budgetNumber)*100).toFixed(2));
      /*
      this.progress = (this.currentSpending/this.bugetNumber)*100;
      var value = this.progress;
      if(value > 100){
      */
       // when excessive
       this.statusMsg = "Excceed";
       this.unit = "%";
       (document.getElementById('progressbarDiv') as HTMLImageElement).style.backgroundColor = "#ff6666";
       (document.getElementById('progressbarDiv') as HTMLImageElement).style.width = "100%";
      }else{
        this.statusMsg = "On Track";
        this.unit = "%";
        (document.getElementById('progressbarDiv') as HTMLImageElement).style.backgroundColor = "#47c695";
       
      }
    }
    else{
      this.unit = "";
      (document.getElementById('progressbarDiv') as HTMLImageElement).style.backgroundColor = "#616a77";
      (document.getElementById('progressbarDiv') as HTMLImageElement).style.width = "100%";
      this.progress = "No Budget is Set";
    }
    
  //}, 600);
      
     // return value;
     return this.progress;
   
    


  
}

}
