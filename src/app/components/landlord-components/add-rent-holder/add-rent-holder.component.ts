import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import{NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-add-rent-holder',
  templateUrl: './add-rent-holder.component.html',
  styleUrls: ['./add-rent-holder.component.css']
})
export class AddRentHolderComponent {

  constructor(private addRentService:LandlordService, private spinner:NgxSpinnerService,private toster:ToastrService){}

  deedFileUrl:string='';

  fileInput(event:any){
    this.spinner.show();
    const file = event.target.files[0];
    if (file){
      
      if(file.size<1048576){
      const reader = new FileReader();
      reader.onload = (e)=>{
        const dataUrl =e.target?.result as string;
        this.deedFileUrl= dataUrl;
        this.spinner.hide();
      }
      reader.readAsDataURL(file);
    }else{
      this.toster.error(`file large than 1MB`,`Error`);
      this.spinner.hide();
    }
  }
  }

  getRentHolderData(form:NgForm){
    if(this.deedFileUrl!==''){
      this.spinner.show();
    let data=form.value;
    if(data.confPass===data.password){
      delete data.confPass;
      delete data.file;
      data.deedURL=this.deedFileUrl;
      
    this.addRentService.addRentHolder(data).subscribe({
      next:(res:any)=>{
        if(res.status==true){
          this.toster.success(`Rent-Holder Added`,`Success`)
        }
      },
      error:(err)=>this.toster.error(`${err.error}`,`Error`),
      complete:()=>{
        this.spinner.hide();
        form.reset();
      }
    });
    }else{
        this.toster.error(`Password not match.`,`Error`);
    }
    }else{
      this.toster.error(`Invalid file.`,`Error`);
    }
    
    
    
  }
}
