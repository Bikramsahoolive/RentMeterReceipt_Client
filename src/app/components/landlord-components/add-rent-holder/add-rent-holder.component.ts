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

  fileInput(event:any,type:string,inputField:any){
    this.spinner.show();
    const file = event.target.files[0];
    if (file){
      let extention = file.name.split(".");
      // console.log(extention[1]);
      if(extention[1] ==="jpg"|| extention[1]=='pdf' || extention[1]=="jpeg"){

      

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
      inputField.value="";
      this.toster.info(`file large than 500kb`,`Invalid file size.`,{progressBar:true,positionClass:"toast-top-center"});
      this.spinner.hide();
    }
  }else{
    this.spinner.hide();
    inputField.value="";
    this.toster.info('',`Invalid file type.`,{progressBar:true,positionClass:"toast-top-center"});
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
    if(name==="" || member_count==="" || member_count ===null || email==="" || phone==="" || rent ==="" ||rent ===null || password ===""){
      this.toster.info('Please fill all inputs',"",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
    const nameRegex = /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(name.length > 25 || nameRegex.test(name)){
      this.toster.info('Enter valid Name max length 25.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }

    if(member_count<1){
      this.toster.info('Enter vlaid member count.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
    const phoneRegex = /^[06789]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(phone.length!==10 || !phoneRegex.test(phone)){
      this.toster.info('Enter valid 10 digit phone.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }

    if(email.length>30 || !emailRegex.test(email)){
      this.toster.info('Enter valid email.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
    if (rent< 1){
  this.toster.info('Enter valid Monthly Rnt.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
}  
if(current_unit==="" || current_unit===null){
  data.current_unit = 0;
}

  if(this.deedFileUrl!==''){
    let data=form.value;
    if(data.password.length<8 || data.password.length>16 ){
      this.toster.info('password must be 8 to 16 digit.',`Invalid Password`,{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
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
      this.toster.info(`Invalid Rent Deed or Document.`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
    }
    
    
    
  }
}
