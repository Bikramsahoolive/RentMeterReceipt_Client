import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signupService/signup.service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReCaptcha2Component } from 'ngx-captcha';
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
  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;
  recaptchaToken="";
  dToday:string="";
  regNumber:string="";
  isReadonly:boolean=false;
  sendOtpCount:number=2;
  ngOnInit(){
    let date= new Date();
    let year = date.getFullYear();
    let month =(date.getMonth()+1).toString().padStart(2,'0');
    let day = date.getDate().toString().padStart(2,'0');
    this.dToday=`${day}-${month}-${year}`;
  }

  showPassword1:boolean=false;
  togglePasswordType1(){
    this.showPassword1 = !this.showPassword1;
  }

  showPassword2:boolean=false;
  togglePasswordType2(){
    this.showPassword2 = !this.showPassword2;
  }

  successCaptcha(token:string){
    this.recaptchaToken = token;
    
  }
  expireCaptcha(){
    this.recaptchaToken = "";
    
  }
  resetCaptcha(){
    this.recaptchaToken = "";
  }
  renewCaptcha() {
    this.recaptchaToken = "";
    this.captchaElem.resetCaptcha();
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
    if (data.name!=="" && data.phone!=="" && data.email!==""  && data. password!==""){
        if (data.termNconditions){
          if(this.regNumber===""){
            this.toastr.error('OTP not verified.','',{progressBar:true,positionClass:"toast-top-center"});
            return;
          }
          if(data.otp==="" || data.otp===null ||data.otp.length !== 6){
            this.toastr.error('','Invalid OTP',{progressBar:true,positionClass:"toast-top-center"});
            return;
          }
          // const upiRegex = /^[^\s@]+@[^\s@]+$/;
          // if(!upiRegex.test(data.upi)){
          //   this.toastr.error('','Invalid UPI ID',{progressBar:true,positionClass:"toast-top-center"});
          //   return;
          // }
          if((data.password).length <8 || (data.password).length >16 ){
            this.toastr.error('Enter an 8 to 16 digit password.','Invalid Password',{progressBar:true,positionClass:"toast-top-center"});
            return;
          }


          if (data.password !== data.confPass){
          this.toastr.error('Password not match.','',{progressBar:true,positionClass:"toast-top-center"});
          return;
          }
          if(!this.recaptchaToken){
            this.toastr.error('Verify reCAPTCHA','',{progressBar:true,positionClass:"toast-top-center"});
            return;
          }

          this.spinner.show();
          data.id = this.regNumber;
          data.upi = '';
          let date= new Date();
          let year = date.getFullYear();
          let month =(date.getMonth()+1).toString().padStart(2,'0');
          let day = date.getDate().toString().padStart(2,'0');
          data.dor=`${year}-${month}-${day}`;
          data.recaptcha = this.recaptchaToken;
          this.signupService.actionLandlordData(data).subscribe({
            next:(result:any)=>{
              this.renewCaptcha();
              if(result.status==='success'){
                this.spinner.hide();
                Swal.fire({
                  title:"Congrats!",
                  text:"Your Landlord Profile Created, Please Login To Continue.",
                  icon:"success"
                }).then((result:any)=>{
                this.regNumber='';
                window.scrollTo({ top: 0, behavior:'instant' });
                this.router.navigate(['login']);
                });
              }else{
                // this.toastr.error(result.message,'',{progressBar:true,positionClass:"toast-top-center"});
                const Toast = Swal.mixin({
                  toast: true,
                  position:"top",
                  showConfirmButton: false,
                  timer: 5000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "error",
                  title: result.message
                });
              }
            },
            error:(err)=>{
              this.renewCaptcha();
              this.spinner.hide();
              // this.toastr.error(`${err.error.message}`, 'Error!',{progressBar:true,positionClass:"toast-top-center"});
              const Toast = Swal.mixin({
                toast: true,
                position:"top",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: err.error.message
              });
            }
          });
          
        }else{
          this.toastr.error('Accept term & conditions.','',{progressBar:true,positionClass:"toast-top-center"});
        }
       
      

    }else{
      this.toastr.error('field/fields are empty.','',{progressBar:true,positionClass:"toast-top-center"});
    }
    
  }

  sendOtp(name:any,phone:any,email:any){
    if(this.sendOtpCount < 1){
      this.toastr.error('Maximum OTP Limit Reached.',"",{positionClass:"toast-top-center",progressBar:true});
      this.router.navigate(['']);
      return;
    }
    if(name.value==="" || phone.value===""||email.value===""){
      this.toastr.error('Fill above inputs.',"",{positionClass:"toast-top-center",progressBar:true});
      return;
    }

    const phoneRegex = /^[06789]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if((name.value).length > 25 || name.value.length <5){
      this.toastr.error('Length should be 5 to 25',"Invalid Name",{positionClass:"toast-top-center",progressBar:true});
      return;
    }
     if(nameRegex.test(name.value)){
      this.toastr.error('Number or Special Char not allowed.',"Invalid Name",{positionClass:"toast-top-center",progressBar:true});
      return;
    }

    if((phone.value).length !==10 || !phoneRegex.test(phone.value)){
      this.toastr.error('',"Invalid Phone.",{positionClass:"toast-top-center",progressBar:true});
      return;
    }
    if((email.value).length >30 ||!emailRegex.test(email.value)){
      this.toastr.error('',"Invalid Email",{positionClass:"toast-top-center",progressBar:true});
      return;
    }

    let data={
      name:name.value,
      phone:phone.value,
      email:email.value
    };
    Swal.fire({
      icon: 'info',
      title: 'Confirm Registration Data',
      text:'Name, Email And Phone Can not changed after registration , Please Confirm Data.',
      showCancelButton:true,
      confirmButtonText:'Proceed'
    }).then((res)=>{
      if(res.isConfirmed){
        this.spinner.show();
    this.signupService.signUpVerify(data).subscribe({
      next:(res:any)=>{
        this.spinner.hide()
        if(res.status==='success'){
          const Toast = Swal.mixin({
            toast: true,
            position:"top",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "OTP Sent successfully"
          });
          this.isReadonly = true;
          this.sendOtpCount -= 1;
          this.regNumber = res.id;
          }
      },error:(err)=>{
        this.spinner.hide();
        // this.toastr.error(err.error.message,"",{positionClass:"toast-top-center",progressBar:true});
        const Toast = Swal.mixin({
            toast: true,
            position:"top",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: err.error.message
          });
      }
    });
      }
    })
  }

}
