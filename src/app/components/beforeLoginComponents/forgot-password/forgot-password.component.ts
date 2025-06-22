import { Component,ViewChild,ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';
import { environment } from 'src/environment';
import Swal from 'sweetalert2';
import { ReCaptcha2Component } from 'ngx-captcha';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  
  constructor(private toster:ToastrService, private spinner :NgxSpinnerService,private authServ: AuthServiceService,
    private router:Router
  ){}
ngOnInit(){}


  @ViewChild('input1') input1!: ElementRef;


  @ViewChild('resendtime')resendtime!:ElementRef;
  @ViewChild('resendstring')resendstring!:ElementRef;
  @ViewChild('resendBtn')resendBtn!:ElementRef;
  @ViewChild('otpExpString')otpExpString!:ElementRef;

  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;

  successMsg:string='';
  userData:any;
  resendOtpCount:number =2;
  resendTime :number=0;

  currentInput: number = 1;
  code: string = '';
  finalOtp:string ='';
  recaptchaToken="";
  siteKey:string= environment.siteKey;
  successCaptcha(token:string){
   this.recaptchaToken = token;
    
  }
  expireCaptcha(){
    this.recaptchaToken = "";
    
  }
  resetCaptcha(){
    this.recaptchaToken = "false";
  }
  renewCaptcha() {
    this.recaptchaToken = "";
    this.captchaElem.resetCaptcha();
  }
  showPassword1:boolean=false;
  togglePasswordType1(){
    this.showPassword1 = !this.showPassword1;
  }

  showPassword2:boolean=false;
  togglePasswordType2(){
    this.showPassword2 = !this.showPassword2;
  }

  verifyForgotPassword(newPass:any,confPass:any){
    if(!this.finalOtp){
      this.toster.error('Enter 6 digit OTP.','Invalid OTP',{progressBar:true,positionClass:"toast-top-center"});
      return;
    }

    if(newPass.value.length<8 || newPass.value.length>16 ){
      this.toster.error('Enter an 8 to 16 digit password.',"Invalid Password",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }

      if(newPass.value !== confPass.value ){
        this.toster.error('Password not mach.',"",{progressBar:true,positionClass:"toast-top-center"});
        return;
      }
        this.spinner.show();
      let data = this.userData;
      data.newPassword = newPass.value;
      data.otp = this.finalOtp;

      this.authServ.verifyforgotPassword(data).subscribe({
        next:(res:any)=>{
          this.spinner.hide();
          if(res.status==="success"){
            Swal.fire({
              title:"Password Updated!",
              text:"Your Password Updated, Please Login To Continue.",
              icon:"success"
            }).then((result:any)=>{
            this.router.navigate(['login']);
            });
          }else if(res.status==="expired"){
            this.toster.error(res.message,"",{progressBar:true,positionClass:"toast-top-center"});
            this.router.navigate(['/login']);
          }else{
            this.toster.error(res.message,"",{progressBar:true,positionClass:"toast-top-center"});
          }
        },error:(err)=>{
          this.spinner.hide();  
          console.log(err);
          this.toster.error("something went wrong try again later.","",{progressBar:true,positionClass:"toast-top-center"});
        }
      })

  }

  sendOtp(phone:any,userType:any,emailField:any,verifyForm:any){

    
      if(phone.value ==="" || userType.value===""){
        this.toster.error("Please Fill Inputs.",'',{progressBar:true,positionClass:'toast-top-center'});
        return;
      }

      const phoneRegex = /^[06789]/;
      let validPhone = phoneRegex.test(phone.value);

      if(!validPhone){
          this.toster.error('Enter a valid User ID.',"",{progressBar:true,positionClass:"toast-top-center"});
          return;
      }

      if(!this.recaptchaToken){
        this.toster.error('Verify reCAPTCHA',"",{progressBar:true,positionClass:"toast-top-center"});
          return;
      }


      let userData={
        phone:phone.value,
        userType:userType.value,
        recaptcha:this.recaptchaToken
      };
      phone.value = "";
      userType.value = "";

      this.spinner.show();

        this.authServ.forgotPassword(userData).subscribe({
          next:(res:any)=>{
            this.renewCaptcha();
            this.spinner.hide();
            if(res.status ==='success'){
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
              this.successMsg =`An otp has been sent to ********${res.email}`;
              this.userData = {
                id:res.id,
                usertype:res.usertype
              };
              setTimeout(()=>{
                this.resendBtn.nativeElement.classList.remove('hide');
              },31000);
              emailField.classList.add('hide');
              verifyForm.classList.remove('hide');
              this.input1.nativeElement.focus();
              this.setResendTimmer();
             setTimeout(()=>{
              this.otpExpString.nativeElement.classList.remove('hide');
              this.resendBtn.nativeElement.classList.add('hide');
             },600000);
            }else{
              this.toster.error(res.message,"",{progressBar:true,positionClass:"toast-top-center"});
            }
          },error:(error)=>{
            this.renewCaptcha();
            this.spinner.hide();
            console.log(error);
            this.toster.error("something went wrong please try again later.","",{progressBar:true,positionClass:"toast-top-center"});
          }
        });

  }
  setResendTimmer(){
    this.resendTime=31;
    this.resendstring.nativeElement.classList.remove('hide');
    let timmer = setInterval(()=>{
      this.resendTime = this.resendTime - 1;
      this.resendtime.nativeElement.innerHTML=this.resendTime.toString().padStart(2,'0');
      if(this.resendTime===0){
        this.resendstring.nativeElement.classList.add('hide');
        clearInterval(timmer);
            }
    },1000);

  }
  resendOtp(){
      this.spinner.show();
    this.authServ.resendForgotPassword(this.userData).subscribe({
      next:(res:any)=>{
        this.spinner.hide();
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
            title: "OTP Sent Again"
          });
          this.resendOtpCount -= 1;
        this.resendBtn.nativeElement.classList.add('hide');
        this.input1.nativeElement.focus();
        if(this.resendOtpCount > 0){
          setTimeout(()=>{
            this.resendBtn.nativeElement.classList.remove('hide');
          },31000);
          this.setResendTimmer();
        } 
      }else{
        this.toster.error(res.messages,"",{progressBar:true,positionClass:"toast-top-center"});
      }
    },error:(err)=>{
      this.toster.error("something went wrong.","",{progressBar:true,positionClass:"toast-top-center"});
      console.log(err);
      this.spinner.hide();
    }
    })
  }
  verifyOtp({otp1,otp2,otp3,otp4,otp5,otp6}:any){
      let otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;
      if(otp.length===6){
        this.finalOtp=otp;
      }else{
        this.finalOtp='';
      }
      
  }
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  ngAfterViewInit(): void {
    this.otpInputs.forEach((input, index) => {
      const el = input.nativeElement;

      // Input event to limit the input to one character
      el.addEventListener('input', (e: any) => {
        if (e.target.value.length > 1) {
          e.target.value = e.target.value.slice(0, 1);
        }
        if (e.target.value.length === 1) {
          if (index < this.otpInputs.length - 1) {
            this.otpInputs.toArray()[index + 1].nativeElement.focus();
          }
        }
      });

      // Keydown event to handle Backspace and 'e' key
      el.addEventListener('keydown', (e: any) => {
        if (e.key === 'Backspace' && !e.target.value) {
          if (index > 0) {
            this.otpInputs.toArray()[index - 1].nativeElement.focus();
          }
        }
        if (e.key === 'e') {
          e.preventDefault();
        }
      });
    });
  }

}
