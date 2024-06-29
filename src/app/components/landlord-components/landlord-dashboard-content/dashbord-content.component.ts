import { Component } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr'
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
      next:(res:any)=>{        
        // this.rentHolderData=res;
        if(res.status == false){
          return;
        }
        this.rentHolderCount=res.length;
        
      //   let count =0;
      //   res.forEach((d:any)=>{
         
      //     count = count + Number(d.paid_amt);
      //   });
      //  console.log(count);
        
        
      },error:(err)=>{
        console.error(err.error);
        this.spinner.hide();
        this.toastr.error('Something wents wrong.','Error');
      },complete:()=>{
        this.spinner.hide();
      }
    });

    this.landlordServ.getAllRentBillData().subscribe({
      next:(res:any)=>{

        if(res.status === false){
          return;
        }
          let due = 0;
          res.forEach((element:any) => {
            due = due + Number(element.final_amt);
          });
  
          let totalPaid =0;
          res.forEach((element:any)=>{
            totalPaid = totalPaid + Number(element.paid_amt);
          })
  
          this.totalPaidAmt = totalPaid;
          this.totalDueAmt=due - totalPaid;
        
        
        
      },
      error:(err)=>{
        console.log(err.error);
        this.toastr.error('something wents wrong','Error!');
        
      }
    })
  }

}
