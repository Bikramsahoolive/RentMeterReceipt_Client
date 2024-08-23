import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { rentholderData } from 'src/app/model/data';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';

@Component({
  selector: 'app-total-bill',
  templateUrl: './total-bill.component.html',
  styleUrls: ['./total-bill.component.css']
})
export class TotalBillComponent {
  constructor(private landloreServe : LandlordService, private spinner:NgxSpinnerService, private toastr:ToastrService){}
  rentholderData:rentholderData[]=[
    {
      current_unit: 0,
      deedURL: '',
      doj: '',
      email: '',
      id: '',
      landlord_id: '',
      landlord_name: '',
      member_count: 0,
      name: '',
      paid_amt: 0,
      password: '',
      phone: '',
      photo: '',
      rent: 0,
      userType: '',
      deposit_amt:0
      }
  ]
  ngOnInit(){
      this.spinner.show();
      this.landloreServe.getAllRentholder().subscribe({
        next:(res:rentholderData[])=>{
          this.rentholderData = res;
          this.spinner.hide();
        },error:(err)=>{
          console.log(err.error);
          this.spinner.hide();
          if(err.error.status !==false){
            this.toastr.error('something wents wrong',"Error",{positionClass:'toast-top-center',progressBar:true});
          }
        }
      });
    
  }
}
