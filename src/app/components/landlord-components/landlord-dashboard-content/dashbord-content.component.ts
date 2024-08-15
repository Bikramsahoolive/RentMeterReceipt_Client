import { Component } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr'
import { landlordData, rentBillData, rentholderData } from 'src/app/model/data';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';

@Component({
  selector: 'app-dashbord-content',
  templateUrl: './dashbord-content.component.html',
  styleUrls: ['./dashbord-content.component.css']
})
export class DashbordContentComponent {
  constructor(
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private landlordServ:LandlordService
    ){}
    rentHolderCount:number=0;
    // rentHolderData:any;
    totalPaidAmt:number=0;
    totalDueAmt:number=0;
    billCount:number=0;
    pendingPayout:number=0;
    processedPayoutAmount:number=0;
  ngOnInit(){
    this.spinner.show();
    this.landlordServ.getAllRentholder().subscribe({
      next:(res:rentholderData[])=>{ 
        // this.rentHolderData=res;
        this.rentHolderCount=res.length;
        
      //   let count =0;
      //   res.forEach((d:any)=>{
         
      //     count = count + Number(d.paid_amt);
      //   });
      //  console.log(count);
        
        
      },error:(err)=>{
        console.error(err.error);
        if(err.error.status !== false){
          this.toastr.error('Something wents wrong.','Error');
        }
        this.spinner.hide();
      },complete:()=>{
        this.spinner.hide();
      }
    });

    this.landlordServ.getAllRentBillData().subscribe({
      next:(res:rentBillData[])=>{
        this.billCount = res.length;
          let due = 0;
          res.forEach((element:rentBillData) => {
            due = due + Number(element.final_amt);
          });
  
          let totalPaid =0;
          res.forEach((element:rentBillData)=>{
            totalPaid = totalPaid + Number(element.paid_amt);
          })
  
          this.totalPaidAmt = totalPaid;
          this.totalDueAmt=due - totalPaid;
        
      },
      error:(err)=>{
        if(err.error.status !== false){
          this.toastr.error('something wents wrong','Error!');
        }
        console.log(err.error);
       
        
      }
    });

    let getEncData:any = localStorage.getItem('connect.sid');
    let actualData = atob(getEncData)
    let userData = JSON.parse(actualData);

    this.landlordServ.getLandlordData(userData.id).subscribe({
      next:(res:any)=>{
        this.pendingPayout = res.payout;
      },error:(error)=>{
        console.log(error);
      }
    });

    this.landlordServ.getLandlordPayoutProcessed().subscribe({
      next:(res:any)=>{
        this.spinner.hide();
        let amount = 0;
        res.forEach((element:any) => {
          amount += (+element.payout_amt);
        });
        this.processedPayoutAmount = amount;
        
      },error:(err)=>{
        this.toastr.error('something wents wrong',"Error",{positionClass:'toast-top-center',progressBar:true});
        console.log(err.error);
        this.spinner.hide();
      }
    });
  }

}
