import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';

@Component({
  selector: 'app-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.css']
})
export class BillPaymentComponent {
  constructor(private landlordServe :LandlordService,private spinner:NgxSpinnerService,private toastr:ToastrService){}
  currentDate:any;

  ngOnInit(){
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth()+1).toString().padStart(2,"0");
    const day = date.getDate();
    this.currentDate=`${year}-${month}-${day}`;
  }

  billPayment(form:NgForm){
    this.spinner.show();
    let data = form.value;
    let id = data.id;
    this.landlordServe.getSingleRentBillData(id).subscribe({
      next:(res:any)=>{
        let toPaidAmount = res.final_amt - res.paid_amt;
        if(res.final_amt == res.paid_amt){
          this.toastr.warning('Bill Already Paid','Warning');
          this.spinner.hide();
        }
        // else if(data.paid_amt>res.final_amt){
        //   this.toastr.warning('Invalid paid amount','Warning');
        //   this.spinner.hide();
        // }
         else if(data.paid_amt>toPaidAmount){
          this.toastr.warning('Invalid paid amount','Warning');
          this.spinner.hide();
        }
        
        else{

          delete data.id;
    this.landlordServe.paymentBillData(data,id).subscribe({
      next:(res:any)=>{
        this.toastr.success(res.message,'Success');
      },
      error:(err)=>{
        console.log(err.error);
        this.toastr.error('Something Wents wrong.','Error');
      },
      complete:()=>this.spinner.hide()
  });

        }
      }
    })
    
  }

}
