import { Component } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { landlordData, rentBillData } from 'src/app/model/data';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import { RentholderServiceService } from 'src/app/services/rentholderService/rentholder-service.service';


@Component({
  selector: 'app-rentholder-dashbord-content',
  templateUrl: './rentholder-dashbord-content.component.html',
  styleUrls: ['./rentholder-dashbord-content.component.css']
})
export class RentholderDashbordContentComponent {
  constructor(private landlordServ:LandlordService,private rentholderServe:RentholderServiceService,private spinner:NgxSpinnerService,private toastr:ToastrService ){}
  landlordData:landlordData={
    id: '',
    name: '',
    phone: '',
    email: '',
    upi: '',
    photo: '',
    signature: '',
    password: '',
    userType: ''
  };
  rentholderData:any;
  // datalist:any;
  totalPaid:number=0;
  totalDue:number=0;
  ngOnInit(){
    this.spinner.show();
    let getEncData:any = localStorage.getItem('connect.sid');
    let actualData = atob(getEncData);
    let userData = JSON.parse(actualData);
    
    this.rentholderData= userData;

    this.landlordServ.getLandlordData(userData.landlord_id).subscribe({
      next:(res:landlordData)=>{
        this.landlordData = res;
        this.spinner.hide();
          
      },
      error:(err:any)=>{
        console.log(err);
        this.spinner.hide();
        
      },complete:()=>{
        
        
      }
    });

    this.rentholderServe.getAllRentBillData().subscribe({
      next:(res:rentBillData[])=>{

        let paidAmount=0;
        let billAmount = 0;
        res.forEach((e:rentBillData)=>{
          paidAmount += (+e.paid_amt);
          billAmount += (+e.final_amt);
        })
        this.totalPaid=paidAmount;
        this.totalDue = billAmount - paidAmount;
      },
      error:(err)=>{
        console.log(err.error);
      },
      complete:()=>{
        // this.spinner.hide();
      }
    })

    
  }
 
}
