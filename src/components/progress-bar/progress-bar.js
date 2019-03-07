var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { ExpenseProvider } from '../../providers/expense/expense';
import { ProfileProvider } from '../../providers/profile/profile';
/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ProgressBarComponent = /** @class */ (function () {
    //noSetting:string;
    function ProgressBarComponent(expenseProvider, profileProvider, cdr) {
        this.expenseProvider = expenseProvider;
        this.profileProvider = profileProvider;
        this.cdr = cdr;
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
    ProgressBarComponent.prototype.getProgress = function () {
        //console.log("PRORESS BAR CALL");
        var _this = this;
        // setTimeout(() => {
        this.profileProvider.getUserProfile().on("value", function (userProfileSnapshot) {
            _this.userProfile = userProfileSnapshot.val();
            _this.budgetNumber = userProfileSnapshot.val().monthlyBudget;
            _this.currentSpending = userProfileSnapshot.val().monthSpending;
            //     console.log(this.currentSpending);
        });
        //  this.progress = ("$"+ this.currentSpending + "/$" +this.budgetNumber);
        // var value = this.progress;
        if (this.budgetNumber > 0) {
            this.progress = ((this.currentSpending / this.budgetNumber) * 100).toFixed(2);
            // var width1 = this.progress;
            // var stringMsg = (this.progress).toString();
            // this.progress = "On Track: " + stringMsg;
            if (this.currentSpending > this.budgetNumber) {
                this.progress = ((((this.currentSpending - this.budgetNumber) / this.budgetNumber) * 100).toFixed(2));
                /*
                this.progress = (this.currentSpending/this.bugetNumber)*100;
                var value = this.progress;
                if(value > 100){
                */
                // when excessive
                this.statusMsg = "Excceed";
                this.unit = "%";
                document.getElementById('progressbarDiv').style.backgroundColor = "#ff6666";
                document.getElementById('progressbarDiv').style.width = "100%";
            }
            else {
                this.statusMsg = "On Track";
                this.unit = "%";
                document.getElementById('progressbarDiv').style.backgroundColor = "#47c695";
            }
        }
        else {
            this.unit = "";
            document.getElementById('progressbarDiv').style.backgroundColor = "#616a77";
            document.getElementById('progressbarDiv').style.width = "100%";
            this.progress = "No Budget is Set";
        }
        //}, 600);
        // return value;
        return this.progress;
    };
    __decorate([
        Input('progress'),
        __metadata("design:type", Object)
    ], ProgressBarComponent.prototype, "progress", void 0);
    ProgressBarComponent = __decorate([
        Component({
            selector: 'progress-bar',
            templateUrl: 'progress-bar.html'
        }),
        __metadata("design:paramtypes", [ExpenseProvider,
            ProfileProvider,
            ChangeDetectorRef])
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());
export { ProgressBarComponent };
//# sourceMappingURL=progress-bar.js.map