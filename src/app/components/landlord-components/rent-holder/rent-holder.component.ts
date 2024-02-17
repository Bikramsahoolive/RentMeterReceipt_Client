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
  constructor(private landlordServ:LandlordService,private spinner:NgxSpinnerService,private toster:ToastrService){}
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
  this.landlordServ.deleteRentHolderData(id).subscribe({
    next:(res:any)=>{
      if(res.status){
        this.toster.success('Rent-Holder Deleted.','Success');
        this.ngOnInit();
      }
    },
    error:(err)=>{
      console.log(err.error);
      this.toster.error('Something went wrong.','Error');
      

    }
  })
}
}
