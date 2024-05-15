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
    rentHolderData:any;
    totalPaidAmt:number=0;
    totalDueAmt:number=0;
  ngOnInit(){
    
    this.landlordServ.getAllRentholder().subscribe({
      next:(res:any)=>{
        // this.rentHolderData=res;
        this.rentHolderCount=res.length;
        this.totalPaidAmt= res.reduce((a:any,b:any)=>(+a.paid_amt)+(+b.paid_amt));
      },error:(err)=>{
        console.error(err.error);
        this.toastr.error('Something wents wrong.','Error');
      },complete:()=>{
        // for(let i=0; i<this.rentHolderData.length;i++){
        //   this.totalPaidAmt= this.totalPaidAmt+(+this.rentHolderData[i].paid_amt);
        // }
      }
    });

    this.landlordServ.getAllRentBillData().subscribe({
      next:(res:any)=>{
        console.log(res[0]);
         if(res.length==1){
          this.totalPaidAmt=res[0].paid_amt;
          this.totalDueAmt=(+res[0].final_amt) - (+res[0].paid_amt);
          
        }
        else{let totalDue = res.reduce((a:any,b:any)=>(+a.final_amt) + (+b.final_amt));
        let totalPaid =res.reduce((a:any,b:any)=>(+a.paid_amt)+(+b.paid_amt));
        this.totalPaidAmt = totalPaid;
        this.totalDueAmt=totalDue-totalPaid;
      }
        
        
      },
      error:(err)=>{
        console.log(err.error);
        this.toastr.error('something wents wrong','Error!');
        
      }
    })
  }

}
