import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
export class PayoutComponent {
  constructor(
    private spinner:NgxSpinnerService,
    private toaster:ToastrService,
    private landlordServ:LandlordService,
    private router:Router,
     ){}
     @ViewChild('payoutM')payoutM!:ElementRef;
     payoutAmt:number = 0;
     cDate:string= "";
     landlordData:any;
  ngOnInit(){
    this.cDate = this.setCurrentDate();
    this.spinner.show();
    let landlordEncData:any= localStorage.getItem('connect.sid');
    let landlordData:any = atob(landlordEncData);
        landlordData = JSON.parse(landlordData);

        this.landlordServ.checklandlordPayout(landlordData.id).subscribe({
          next:(res:any)=>{
            
            if(res.status==false){
              
              this.landlordServ.getLandlordData(landlordData.id).subscribe({
                next:(res:any)=>{
                  this.spinner.hide();
                  this.landlordData = res;
                  this.payoutAmt = res.payout;
                },
                error:(err)=>{
                  this.spinner.hide();
                  console.log(err.error);
                  this.toaster.error('Something wents wrong.','Error',{positionClass:'toast-top-center',progressBar:true});
                }
              });
      
            }else{
              this.spinner.hide();
              Swal.fire({
                title:"Payout in queue.",
                icon:"info",
                html:`You have already requested for payout with <br/>
                Amount: ₹ ${res.payout_amt}/-<br/>
                Request Date: ${res.request_date}<br/>
                will be settled within 3 to 5 days.
                `
              })
              .then(()=>{
                  this.router.navigate(['dashbord-landlord']);
              })
            }
          },
          error:(err)=>{
            this.spinner.hide();
                  console.log(err.error);
                  this.toaster.error('Something wents wrong.','Error',{positionClass:'toast-top-center',progressBar:true});
            
          }
        });

  }
  payoutDetails:any;
  paymentMethod:string=""
  payoutMethod(method:string){
    this.paymentMethod = method;
    this.payoutM.nativeElement.innerHTML="";
    if(method=="upi"){
      let upiData = document.createElement('strong');
      upiData.innerHTML=`UPI ID : ${this.landlordData.upi||"Not Available"}`
      this.payoutM.nativeElement.appendChild(upiData);
    }else{
      let upiData = document.createElement('strong');
      upiData.innerHTML=`Name : ${this.landlordData.name} <br/> 
      A/c no : ${this.landlordData.account_no||"Not Available "} <br/>
      IFSC : ${this.landlordData.ifsc||"Not Available"}`
      this.payoutM.nativeElement.appendChild(upiData);
    }

  }

  setCurrentDate(){
    let date= new Date();
    let year = date.getFullYear();
    let month =(date.getMonth()+1).toString().padStart(2,'0');
    let day = date.getDate().toString().padStart(2,'0');
    return `${year}-${month}-${day}`;
    // console.log(this.dToday);
  }

  payoutRequest(form:NgForm){
    let landlordEncData:any= localStorage.getItem('connect.sid');
    let landlordData:any = atob(landlordEncData);
        landlordData = JSON.parse(landlordData);

    let data = form.value;

    data.id = landlordData.id;
    data.name = landlordData.name
    data.email = landlordData.email;
    data.phone = landlordData.phone;

    if(data.payout_amt>this.payoutAmt){
      this.toaster.error("Exceed total payout balance.","Invalid Payout Amount",{positionClass:'toast-top-center',progressBar:true});
      return;
    }
    if(data.payout_amt < 100 || data.payout_amt > 10000){
      this.toaster.error("Invalid Payout Amount (₹100 - ₹10,000).","",{positionClass:'toast-top-center',progressBar:true});
      return;
    }
    if(this.paymentMethod===""){
      this.toaster.error("Please Select a Payout Method.","",{positionClass:'toast-top-center',progressBar:true});
      return;
    }
  

    if(this.paymentMethod ==='neft' || this.paymentMethod ==='imps' ){
      if(!this.landlordData.account_no || !this.landlordData.ifsc){
        this.toaster.error("Bank details unavailable, Please Provide","",{positionClass:'toast-top-center',progressBar:true});
      return;
      }
    }

    if(this.paymentMethod ==='upi'){
      if(!this.landlordData.upi){
        this.toaster.error("UPI ID unavailable, Please provide","",{positionClass:'toast-top-center',progressBar:true});
      return;
    }
  }
    data.account_no = this.landlordData.account_no ||'NA';
    data.ifsc = this.landlordData.ifsc || 'NA';
    data.upi = this.landlordData.upi || 'NA';
    
    this.spinner.show();

    this.landlordServ.landlordPayout(data).subscribe({
      next:(res:any)=>{
        this.spinner.hide();
        if(res.status ==="success"){
        Swal.fire({
          title:"Payout in queue.",
          html:"Your Payout request queued successfully and will be settled in 3 to 5 days.<br/> Thank you <br/>Team RNMR.",
          icon:"success"
        })
        .then(()=>{
          this.router.navigate(['dashbord-landlord']);
        })
      }
      },
      error:(err)=>{
        this.spinner.hide;
        console.log(err.error);
        this.toaster.error('Something wents wrong.','Error',{positionClass:'toast-top-center',progressBar:true});

      }
    });
    
  }

}