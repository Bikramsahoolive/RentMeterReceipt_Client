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
  toPaidAmount:number=0;
  payableAmount:any;
  ngOnInit(){
    this.currentDate = this.createDate();
  }

  createDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth()+1).toString().padStart(2,"0");
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  dateFormater(date:any){

    let dateData =new Date(date);
    let year = dateData.getFullYear();
    let month =(dateData.getMonth()+1).toString().padStart(2,'0');
    let day = dateData.getDate();
    return `${day}-${month}-${year}`;
  }

  billPayment(form:NgForm){
    this.spinner.show();
    let data = form.value;
    let reDate = this.dateFormater(data.payment_date);
    data.payment_date = reDate;
    let id = data.id;

    if(data.paid_amt>this.toPaidAmount){
      this.toastr.warning('Invalid paid amount','Warning');
      this.spinner.hide();
    }
    
    else{

      delete data.id;
this.landlordServe.paymentBillData(data,id).subscribe({
  next:(res:any)=>{
    this.toastr.success(res.message,'Success');
    form.reset();
    this.currentDate = this.createDate();
  },
  error:(err)=>{
    console.log(err.error);
    this.toastr.error('Something Wents wrong.','Error');
  },
  complete:()=>this.spinner.hide()
});

    }
    
    
  }


  getPaymentAmount(id:any){
    if(id.value ==="" || (id.value).length<13){
      this.toastr.error('Invalid Bill ID','Error');
    }else{

      this.landlordServe.getSingleRentBillData(id.value).subscribe({
        next:(res:any)=>{
          
          if(res.final_amt == res.paid_amt){
            this.toastr.warning('Bill Already Paid','Warning');
            this.spinner.hide();
          }else{
            this.toPaidAmount = res.final_amt - res.paid_amt;
            this.payableAmount = res.final_amt - res.paid_amt;

          }
        },error:(error)=>{
          console.log(error);
          this.toastr.error('error while fetch bill data.','Error');
        }
      })

    }
    
  }

}
