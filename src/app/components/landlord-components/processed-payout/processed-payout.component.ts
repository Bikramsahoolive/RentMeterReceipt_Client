import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';

@Component({
  selector: 'app-processed-payout',
  templateUrl: './processed-payout.component.html',
  styleUrls: ['./processed-payout.component.css']
})
export class ProcessedPayoutComponent {

  constructor(private landloreServe : LandlordService, private spinner:NgxSpinnerService, private toastr:ToastrService){}
  processedPayoutData:any=[{
payout_amt:0,
payout_details:"",
payout_method:"",
payout_transactionId:"",
process_date:"",
request_date:""
  }]

  ngOnInit(){
    this.spinner.show();

    this.landloreServe.getLandlordPayoutProcessed().subscribe({
      next:(res:any)=>{
        this.spinner.hide();
        this.processedPayoutData = res.reverse(); 
        
      },error:(err)=>{
        this.toastr.error('something wents wrong',"Error",{positionClass:'toast-top-center',progressBar:true});
        console.log(err.error);
        this.spinner.hide();
      }
    });
  
}
}
