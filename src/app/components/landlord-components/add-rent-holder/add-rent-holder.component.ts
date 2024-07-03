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
  photoFile:string='';

  fileInput(event:any,type:string){
    this.spinner.show();
    const file = event.target.files[0];
    if (file){
      
      if(file.size<524576){
      const reader = new FileReader();
      reader.onload = (e)=>{
        const dataUrl =e.target?.result as string;
        if(type ==='document'){
          this.deedFileUrl= dataUrl;
        }
        if(type === 'photo'){
          this.photoFile = dataUrl;
        }
        
        this.spinner.hide();
      }
      reader.readAsDataURL(file);
    }else{
      this.toster.error(`file large than 500kb`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
      this.spinner.hide();
    }
  }
  }

  getCurrentDate (){
    let currentDate;
    let date= new Date();
    let year = date.getFullYear();
    let month =(date.getMonth()+1).toString().padStart(2,'0');
    let day = date.getDate().toString().padStart(2,'0');
    currentDate=`${day}-${month}-${year}`;

    return currentDate;
  }

  getRentHolderData(form:NgForm){
    let data=form.value;
    let {name,member_count,current_unit,email,phone,rent,password} = data;
    if(name==="" || member_count==="" || member_count ===null || current_unit===null ||current_unit===""||current_unit===null || email==="" || phone==="" || rent ==="" ||rent ===null || password ===""){
      this.toster.info('Please fill all inputs',"",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
    if(member_count<1){
      this.toster.info('Invalid member count.',"",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
    if(this.deedFileUrl!=='' || this.photoFile!==''){
    let data=form.value;
    if(data.confPass===data.password){
      delete data.confPass;
      delete data.file;
      data.deedURL=this.deedFileUrl;
      data.photo = this.photoFile;
      data.doj = this.getCurrentDate();

      this.spinner.show();

    this.addRentService.addRentHolder(data).subscribe({
      next:(res:any)=>{
        form.reset();
        if(res.status){
          this.toster.success(res.message,`Success`,{progressBar:true,positionClass:"toast-top-center"});
          this.router.navigate(['/rent-holder']);
        }
        this.spinner.hide();
      },
      error:(err)=>{this.toster.error(`${err.error}`,`Error`,{progressBar:true,positionClass:"toast-top-center"})
      this.spinner.hide();
    }
    });
    }else{
        this.toster.info(`Password not match.`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
    }
    }else{
      this.toster.info(`Invalid file.`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
    }
    
    
    
  }
}
