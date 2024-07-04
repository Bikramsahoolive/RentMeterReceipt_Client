import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signupService/signup.service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
siteKey:string= environment.siteKey;
  constructor(private router : Router, private toastr: ToastrService ,private signupService:SignupService, private spinner:NgxSpinnerService){
    // this.siteKey =;
  }
  captchaVirification:boolean=false;
  dToday:string="";
  regNumber:string="";
  ngOnInit(){
    let date= new Date();
    let year = date.getFullYear();
    let month =(date.getMonth()+1).toString().padStart(2,'0');
    let day = date.getDate().toString().padStart(2,'0');
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
    if (data.name!=="" && data.phone!=="" && data.email!=="" && data.upi!=="" && data. password!==""){
      if (data.password === data.confPass){
        if (data.termNconditions){
          if(this.regNumber===""){
            this.toastr.info('send OTP first.','',{progressBar:true,positionClass:"toast-top-center"});
            return;
          }
          if(data.otp==="" || data.otp===null){
            this.toastr.info('OTP cant be empty.','',{progressBar:true,positionClass:"toast-top-center"});
            return;
          }
          if(!this.captchaVirification){
            this.toastr.info('Captcha not verified','',{progressBar:true,positionClass:"toast-top-center"});
            return;
          }

          this.spinner.show();
          data.id = this.regNumber;
          
          this.signupService.actionLandlordData(data).subscribe({
            next:(result:any)=>{
              if(result.status==='success'){
            this.toastr.success("registered.",'Successfully',{progressBar:true,positionClass:"toast-top-center"});
                this.regNumber='';
                this.router.navigate(['login']);
              }else{
                this.toastr.error(result.message,'',{progressBar:true,positionClass:"toast-top-center"});
              }
              this.spinner.hide();
            },
            error:(err)=>{
              this.spinner.hide();
              this.toastr.error(`${err.error.message}`, 'Error!',{progressBar:true,positionClass:"toast-top-center"});
            }
          });
          
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

  sendOtp(name:any,phone:any,email:any){
    if(name.value==="" || phone.value===""||email.value===""){
      this.toastr.info('Fill above inputs.',"",{positionClass:"toast-top-center",progressBar:true});
      return;
    }
    let data={
      name:name.value,
      phone:phone.value,
      email:email.value
    };
    this.spinner.show();
    this.signupService.signUpVerify(data).subscribe({
      next:(res:any)=>{
        this.spinner.hide()
        if(res.status==='success'){
          this.regNumber = res.id;
          this.toastr.success("OTP Sent successfully","",{positionClass:"toast-top-center",progressBar:true});
        }
        console.log(res);
        
      },error:(err)=>{
        this.spinner.hide();
        this.toastr.error(err.error.message,"",{positionClass:"toast-top-center",progressBar:true});
      }
    });
  }

}
