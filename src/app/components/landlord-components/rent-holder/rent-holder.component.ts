import { Component } from '@angular/core';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-rent-holder',
  templateUrl: './rent-holder.component.html',
  styleUrls: ['./rent-holder.component.css']
})
export class RentHolderComponent {
  constructor(private toaster:ToastrService,private landlordServ:LandlordService,private spinner:NgxSpinnerService,private toster:ToastrService){}
  users:any=[];

ngOnInit(){
  this.spinner.show();
    this.landlordServ.getAllRentholder().subscribe({
      next:(res:any)=>{
        this.users=res;
        this.spinner.hide();
      },
      error:(err)=>{
        console.log(err.error);
        this.toster.error('Something went wrong.','Error');
        this.spinner.hide();
      },
      complete:()=>{}
      
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
          this.toaster.success(`Rent Holder Deleted`,'Success');
          this.ngOnInit();
        }
      },error:(error)=>{
        console.error(error);
        this.toaster.error(`Something wents wrong.`);
      }
    });
  }else if(confString===null){
  }else{
    this.toaster.error("Sorry! wrong command.");
  }

  
}
}
