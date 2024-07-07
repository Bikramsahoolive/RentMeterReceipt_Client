import { Component } from '@angular/core';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import { rentholderData } from 'src/app/model/data';

@Component({
  selector: 'app-rent-holder',
  templateUrl: './rent-holder.component.html',
  styleUrls: ['./rent-holder.component.css']
})
export class RentHolderComponent {
  constructor(private toaster:ToastrService,private landlordServ:LandlordService,private spinner:NgxSpinnerService,private toster:ToastrService){}
  users:rentholderData[]=[
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
    userType: ''
    }
  ];
  isTableDataAvailable:boolean=false;
ngOnInit(){
  this.getAllRentHolder();
}

getAllRentHolder(){
  this.spinner.show();
  this.landlordServ.getAllRentholder().subscribe({
    next:(res:rentholderData[])=>{
      this.isTableDataAvailable=true;
      this.users=res;
      this.spinner.hide();
    },
    error:(err)=>{
      console.log(err.error);
      if(err.error.status!==false){
        this.toster.error('Something wents wrong.','Error',{progressBar:true,positionClass:"toast-top-center"});
      }else{
        this.toster.info('Rent holder not registered yet.','',{progressBar:true,positionClass:"toast-top-center"});
      }
      this.spinner.hide();
    }
  })
}
downloadDoc(link:any){
  let downloadLink = document.createElement('a');
  downloadLink.href=link;
  downloadLink.download='Rent_Holder_Deed.pdf';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
deleteRentHolder(id:any){
  let confString = prompt("This Action is irreversible and permanently delete all releted data, To confirm please type ['delete rentholder'] bellow.");
  
  if(confString ==='delete rentholder'){
    this.landlordServ.deleteRentHolderData(id).subscribe({
      next:(res:any)=>{
        if(res.status){
          this.users = [];
          this.getAllRentHolder();
          this.toaster.success(`Rent Holder Deleted`,'Success',{progressBar:true,positionClass:"toast-top-center"});
        }
      },error:(error)=>{
        console.error(error);
        this.toaster.error(`Something wents wrong.`,"Error",{progressBar:true,positionClass:"toast-top-center"});
      }
    });
  }else if(confString===null){
  }else{
    this.toaster.error("Sorry! wrong command.","",{progressBar:true,positionClass:"toast-top-center"});
  }

  
}
}
