import { Component } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signupService/signup.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private toastr:ToastrService , private spinner :NgxSpinnerService, private signupServe:SignupService){}

  GetMessage(name:any,email:any,message:any){
    console.log(name.value,email.value,message.value);
    if(name.value=="" || email.value=="" || message.value==""){
      this.toastr.error("Fill all inputs.","Invalid Input",{positionClass:'toast-top-center',progressBar:true});
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email.value)){
      this.toastr.error("Enter a valid email.","Invalid Email",{positionClass:'toast-top-center',progressBar:true});
      return;
    }
    let data={
      name:name.value,
      email:email.value,
      message:message.value
    }
    this.spinner.show();
    this.signupServe.sendFeedback(data).subscribe({
      next:(res:any)=>{
        if(res.status=="success"){
          name.value="";
          email.value="";
          message.value="";
          this.toastr.success("Your Feedback Submmitd.","Thank You",{positionClass:'toast-top-center',progressBar:true});
        }else{
          this.toastr.error("Error while submmiting feedback, try again.","",{positionClass:'toast-top-center',progressBar:true});
        }
        this.spinner.hide();
      },error:(err)=>{
        console.log(err.error);
        this.toastr.error("Something wents wrong.","Error!",{positionClass:'toast-top-center',progressBar:true});
        this.spinner.hide();
        
      }
    })

  }
}
