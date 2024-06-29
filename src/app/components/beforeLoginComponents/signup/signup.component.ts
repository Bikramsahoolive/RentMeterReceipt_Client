import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signupService/signup.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
siteKey:string="";
  constructor(private toastr: ToastrService ,private signupService:SignupService, private spinner:NgxSpinnerService){
    this.siteKey = "6LdR0QMqAAAAAO9bw2BnT9RxX6tn1C7NfXqdzgxP";
  }
  captchaVirification:boolean=false;
  regId:string= "";
  dToday:string="";
  ngOnInit(){
    let date= new Date();
    let year = date.getFullYear();
    let month =(date.getMonth()+1).toString().padStart(2,'0');
    let day = date.getDate();
    this.dToday=`${day}-${month}-${year}`;
  }

  successCaptcha(e:any){
    this.captchaVirification = true;
    
  }
  expireCaptcha(){
    this.captchaVirification = false;
    
  }
  resetCaptcha(){
    this.captchaVirification = false;
  }
  // fileInput(event:any,type:any){
  //   this.spinner.show();
  //   const file = event.target.files[0];
  //   if (file){
      
  //     if(file.size<1048576){
  //     const reader = new FileReader();
  //     reader.onload = (e)=>{
  //       const dataUrl =e.target?.result as string;
  //       if(type=='photo')this.landlordPhoto= dataUrl;
  //       if(type=='signature')this.landlordSign= dataUrl;
  //       this.spinner.hide();
  //     }
  //     reader.readAsDataURL(file);
  //   }else{
  //     this.toastr.error(`file large than 1MB`,`Error`);
  //     this.spinner.hide();
  //   }
  // }
    
  // }
  signup(form:NgForm){
    const data = form.value;
    // data.photo=this.landlordPhoto;
    // data.signature=this.landlordSign;
    if (data.name!=="" && data.phone!=="" && data.email!=="" && data.upi!=="" && data. password!==""){
      if (data.password === data.confPass){
        if (data.termNconditions){
          if(!this.captchaVirification){
            this.toastr.info('Captcha not verified','',{progressBar:true,positionClass:"toast-top-center"});
            return;
          }
          form.reset();
          this.spinner.show();
          delete data.confPass;
          this.signupService.signUp(data).subscribe({
            next:(result:any)=>{
              console.log(result);
            this.regId = result.message;
            this.toastr.success("registered.",'Successfully',{progressBar:true,positionClass:"toast-top-center"})
            this.spinner.hide();
            },
            error:(err)=>{
              this.spinner.hide();
              this.toastr.error(`${err.error.message}`, 'Error!',{progressBar:true,positionClass:"toast-top-center"});
              
            }
            
          })
          
        }else{
          this.toastr.info('Accept term & conditions.','',{progressBar:true,positionClass:"toast-top-center"});
        }
       
      }else{
         this.toastr.info('Password not match.','',{progressBar:true,positionClass:"toast-top-center"});

      }

    }else{
      this.toastr.info('field/fields are empty.','',{progressBar:true,positionClass:"toast-top-center"});
    }
    
  }

}
