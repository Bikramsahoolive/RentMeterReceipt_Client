import { Component } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { landlordData, rentBillData, rentholderData } from 'src/app/model/data';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import { RentholderServiceService } from 'src/app/services/rentholderService/rentholder-service.service';


@Component({
  selector: 'app-rentholder-dashbord-content',
  templateUrl: './rentholder-dashbord-content.component.html',
  styleUrls: ['./rentholder-dashbord-content.component.css']
})
export class RentholderDashbordContentComponent {
  constructor( private landlordServ:LandlordService,private rentholderServe:RentholderServiceService,private spinner:NgxSpinnerService,private toastr:ToastrService ){}
  landlordData:landlordData={
    id: '',
    dor:'',
    name: '',
    phone: '',
    email: '',
    upi: '',
    photo: '',
    signature: '',
    password: '',
    userType: '',
    plan:'',
    rcrCount:0
  };
  rentholderData:rentholderData={
    current_unit: 0,
    deedURL: "",
    doj: "",
    email: "",
    id: "",
    landlord_id: "",
    landlord_name: "",
    member_count: 0,
    name: "",
    paid_amt: 0,
    password: "",
    phone: "",
    photo: "",
    rent: 0,
    userType: "",
    deposit_amt:0
  };
  // datalist:any;
  totalPaid:number=0;
  totalDue:number=0;
  ngOnInit(){
    let getEncData:any = localStorage.getItem('connect.sid');
    let actualData = atob(getEncData);
    let userData = JSON.parse(actualData);
    this.spinner.show();
    this.rentholderServe.getRentholderData(userData.id).subscribe({
      next:(res:rentholderData)=>{
        this.rentholderData = res;
          
      },
      error:(err:any)=>{
        this.spinner.hide();
        console.log(err);
        
      }
    });

    this.landlordServ.getLandlordData(userData.landlord_id).subscribe({
      next:(res:landlordData)=>{
        this.landlordData = res;
        this.spinner.hide();
      },
      error:(err:any)=>{
        this.spinner.hide();
        console.log(err);
        
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
        this.spinner.hide();
        console.log(err.error);
      }
    })

    
  }
 
}
