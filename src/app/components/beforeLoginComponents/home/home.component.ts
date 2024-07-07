import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signupService/signup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private toster:ToastrService,
    private homeServ :SignupService,
    private spinner:NgxSpinnerService
  ){}

  ngOnInit(){}

  sendSubMail(emailId:any){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(emailId.value)){
      this.toster.error('Invalid Email Input','Frontend');
      return;
    }
    this.spinner.show();
    this.homeServ.sendSubMail({email:emailId.value}).subscribe({
      next:(res:any)=>{
        if(res.status ==='success'){
          this.toster.success("Your Email Subscribed","",{positionClass:"toast-top-center",progressBar:true});
        }else{
          this.toster.error('Error occored, try again.',"",{positionClass:"toast-top-center",progressBar:true});
        }
      },error:(err)=>{
        console.error(err);
        this.toster.error('Something Went wrong.',"",{positionClass:"toast-top-center",progressBar:true});
        
      },complete:()=>{
        emailId.value = '';
        this.spinner.hide();
      }
    });
  }
}
