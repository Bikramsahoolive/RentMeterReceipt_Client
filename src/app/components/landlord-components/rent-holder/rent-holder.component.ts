import { Component } from '@angular/core';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import { rentholderData } from 'src/app/model/data';
import Swal from 'sweetalert2';
import { environment } from 'src/environment';

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
    userType: '',
    deposit_amt:0
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
        this.toster.error('Something went wrong.','Error',{progressBar:true,positionClass:"toast-top-center"});
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


  Swal.fire({
    title:"Warning",
    icon:"warning",
    text:"This Action is irreversible and permanently delete all releted data, To confirm please type ['delete rentholder'] bellow.",
    input:"text",
    position:"top",
    inputAutoFocus:false,
    inputAttributes:{
      autocapitalize:"on"
    },
    showCancelButton:true,
    confirmButtonText:"Delete",
    showLoaderOnConfirm:true,
    preConfirm:  async (val) => {
        
        if (val!=="delete rentholder") {
          return Swal.showValidationMessage(`
            "Wrong Input!"
          `)
        }
        try {
          const token = localStorage.getItem('authorization')||'';
          const response = await fetch(`${environment.apiUrl}/rentholder/user/${id}`,{
            method:'DELETE',
            headers:{
              'Content-Type':'application/json',
               'authorization':token
            }
          })
        if(response.ok){
          return "Rentholder Deleted.";
        }
        } catch (error) {
          return Swal.showValidationMessage(`
            "Error! Try Again."
          `)
        }
        
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    
    if (result.isConfirmed) {
      Swal.fire({
        title: "scccess !",
        text:result.value,
        icon:'success'
      })
      .then(()=>{
        this.users = [];
        this.getAllRentHolder();
      });

  }else{
    console.log("Canceled.");
  }
});

}
}
