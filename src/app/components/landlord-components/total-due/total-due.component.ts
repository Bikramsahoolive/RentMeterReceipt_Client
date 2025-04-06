import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { create } from 'qrcode';
import { rentBillData, rentholderData } from 'src/app/model/data';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-total-due',
  templateUrl: './total-due.component.html',
  styleUrls: ['./total-due.component.css']
})
export class TotalDueComponent {
  constructor(private landloreServe : LandlordService, private spinner:NgxSpinnerService, private toastr:ToastrService){}
  rentholderData:any=[{
    id:"",
    name:"",
    paid_amt:0,
    bill_amt:0
  }]

  ngOnInit(){
    
    let finalArray:any = [];
    this.spinner.show();
      this.landloreServe.getAllRentholder().subscribe({
        next:(res:rentholderData[])=>{
          // this.rentholderData = res;
          console.log(res);
          
          res.forEach((e:any)=>{
            let obj = {id:e.id,name:e.name,paid_amt:e.paid_amt,phone:e.phone,email:e.email};
            finalArray.push(obj);
          });

          this.landloreServe.getAllRentBillData().subscribe({
        next:(res:rentBillData[])=>{

            finalArray.forEach((obj:any)=>{
              let billAmt = 0;
              res.forEach((bill:any)=>{
                if(obj.id === bill.rentholder_id){
                  billAmt += bill.final_amt;
                }
              });
              obj.bill_amt = billAmt;
            });
            this.rentholderData = finalArray;
            this.spinner.hide();
        },
        error:(err)=>{
          this.spinner.hide();
          console.log(err.error);
          if(err.error.status !==false){
            this.toastr.error('something wents wrong',"Error",{positionClass:'toast-top-center',progressBar:true});
          }
        }
      });
          
          this.spinner.hide();
        },error:(err)=>{
          console.log(err.error);
          this.spinner.hide();
          if(err.error.status !==false){
            // this.toastr.error('something wents wrong',"Error",{positionClass:'toast-top-center',progressBar:true});
          }
        }
      });

  }

  makePhoneCall(num:string){
    const call = document.createElement('a');
    call.href = `tel:+91${num}`;
    call.click();
  }

  sendMail(mailId:string){
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: `Email send to ${mailId}`
    });
  }
}
