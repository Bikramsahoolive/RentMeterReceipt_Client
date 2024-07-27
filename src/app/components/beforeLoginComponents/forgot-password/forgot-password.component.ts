import { Component,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';
import Swal from 'sweetalert2';

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
  @ViewChild('input2') input2!: ElementRef;
  @ViewChild('input3') input3!: ElementRef;
  @ViewChild('input4') input4!: ElementRef;
  @ViewChild('input5') input5!: ElementRef;
  @ViewChild('input6') input6!: ElementRef;


  @ViewChild('resendtime')resendtime!:ElementRef;
  @ViewChild('resendstring')resendstring!:ElementRef;
  @ViewChild('resendBtn')resendBtn!:ElementRef;
  @ViewChild('otpExpString')otpExpString!:ElementRef;

  successMsg:string='';
  userData:any;
  resendOtpCount:number =2;
  resendTime :number=0;

  currentInput: number = 1;
  code: string = '';
  finalOtp:string ='';


  onInput(event: any, index: number) {
    let value = event.target.value;
   
    this.code = this.code.substring(0, index - 1) + value + this.code.substring(index);

    
    if (value && index < 6) {
      this.setFocus(index + 1);
    } else if (!value && index > 1) {
      this.setFocus(index - 1);
    }

    if (this.code.length === 6) {
      this.finalOtp = this.code;
    }
  }

  setFocus(index: number) {
    switch (index) {
      case 1:
        this.input1.nativeElement.focus();
        break;
      case 2:
        this.input2.nativeElement.focus();
        break;
      case 3:
        this.input3.nativeElement.focus();
        break;
      case 4:
        this.input4.nativeElement.focus();
        break;
      case 5:
        this.input5.nativeElement.focus();
        break;
      case 6:
        this.input6.nativeElement.focus();
        break;
      default:
        break;
    }
  }


  verifyForgotPassword(newPass:any,confPass:any){

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
          if(res.status==="success"){
            this.spinner.hide();
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
          this.toster.error("something wents wrong try again later.","",{progressBar:true,positionClass:"toast-top-center"});
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

      let userData={
        phone:phone.value,
        userType:userType.value
      };
      phone.value = "";
      userType.value = "";

      this.spinner.show();

        this.authServ.forgotPassword(userData).subscribe({
          next:(res:any)=>{
            if(res.status ==='success'){
              this.spinner.hide();
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
            this.spinner.hide();
            console.log(error);
            this.toster.error("something wents wrong please try again later.","",{progressBar:true,positionClass:"toast-top-center"});
          }
        })

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
      this.toster.error("something wents wrong.","",{progressBar:true,positionClass:"toast-top-center"});
      console.log(err);
      this.spinner.hide();
    }
    })
  }

}
