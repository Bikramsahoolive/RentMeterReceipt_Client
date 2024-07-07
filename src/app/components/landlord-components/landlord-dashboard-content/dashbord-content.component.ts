import { Component } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr'
import { rentBillData, rentholderData } from 'src/app/model/data';
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
    })
  }

}
