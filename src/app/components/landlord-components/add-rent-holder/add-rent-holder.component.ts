import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import{NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-rent-holder',
  templateUrl: './add-rent-holder.component.html',
  styleUrls: ['./add-rent-holder.component.css']
})
export class AddRentHolderComponent {

  constructor(private router:Router, private addRentService:LandlordService, private spinner:NgxSpinnerService,private toster:ToastrService){}

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
      this.toster.error(`file large than 1MB`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
      this.spinner.hide();
    }
  }
  }

  getCurrentDate (){
    let currentDate;
    let date= new Date();
    let year = date.getFullYear();
    let month =(date.getMonth()+1).toString().padStart(2,'0');
    let day = date.getDate();
    currentDate=`${day}-${month}-${year}`;

    return currentDate;
  }

  getRentHolderData(form:NgForm){
    let data=form.value;
    let {name,member_count,email,phone,rent,password} = data;
    if(name==="" || member_count==="" || email==="" || phone==="" || rent ==="" || password ===""){
      this.toster.error('Please fill all inputs',"",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
    if(this.deedFileUrl!==''){
    let data=form.value;
    if(data.confPass===data.password){
      delete data.confPass;
      delete data.file;
      data.deedURL=this.deedFileUrl;
      data.doj = this.getCurrentDate();

      this.spinner.show();

    this.addRentService.addRentHolder(data).subscribe({
      next:(res:any)=>{
        if(res.status){
          this.toster.success(res.message,`Success`,{progressBar:true,positionClass:"toast-top-center"});
          this.router.navigate(['/rent-holder']);
        }
      },
      error:(err)=>this.toster.error(`${err.error}`,`Error`,{progressBar:true,positionClass:"toast-top-center"}),
      complete:()=>{
        this.spinner.hide();
        form.reset();
      }
    });
    }else{
        this.toster.error(`Password not match.`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
    }
    }else{
      this.toster.error(`Invalid file.`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
    }
    
    
    
  }
}
