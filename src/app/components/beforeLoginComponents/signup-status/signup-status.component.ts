import { Component } from '@angular/core';
import {ToastrService} from 'ngx-toastr'
import { SignupService } from 'src/app/services/signupService/signup.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-signup-status',
  templateUrl: './signup-status.component.html',
  styleUrls: ['./signup-status.component.css']
})
export class SignupStatusComponent {
  constructor(private toster :ToastrService, private signupservice : SignupService, private spinner:NgxSpinnerService){}
  reqName:string="";
  reqPhone:string="";
  reqEmail:string="";
  getStatus(id:any,statusField:any,pending:any,aproved:any,rejected:any,error:any){
    this.spinner.show();
    error.style.display="none";
    statusField.style.display="none";
    if(id){
      
      this.signupservice.signUpStatus(id).subscribe({
        next:(res:any)=>{
          
          this.reqName=res.name;
          this.reqPhone=res.phone;
          this.reqEmail=res.email;
          if(res.status=="pending")pending.style.display="block";
          if(res.status=="aproved")aproved.style.display="block";
          if(res.status=="rejected")rejected.style.display="block";

          statusField.style.display="block";
          this.spinner.hide();
        },
        error:(err)=>{
          console.log(err.error);
          error.style.display="block";
          this.spinner.hide();
          
        }
      })
      
      
    }else{
      this.toster.error("Invalid Input.","Error")

    }
    

  }
}
