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
  constructor(private toastr :ToastrService, private signupservice : SignupService, private spinner:NgxSpinnerService){}
  reqName:string="";
  reqPhone:string="";
  reqEmail:string="";
  getStatus(id:any,statusField:any,pending:any,aproved:any,rejected:any){
    
    statusField.style.display="none";
    if(id){
      this.spinner.show();
      this.signupservice.signUpStatus(id).subscribe({
        next:(res:any)=>{
          
          this.reqName=res.name;
          this.reqPhone=res.phone;
          this.reqEmail=res.email;
          if(res.status=="pending"){
            pending.style.display="block";
            aproved.style.display="none";
            rejected.style.display="none";
          };
          if(res.status=="approved"){
            aproved.style.display="block";
            rejected.style.display="none";
            pending.style.display="none";
          };
          if(res.status=="rejected"){
            rejected.style.display="block"
            pending.style.display="none";
            aproved.style.display="none";
          };

          statusField.style.display="block";
          this.spinner.hide();
        },
        error:(err)=>{
          console.log(err.error);
          this.toastr.error(err.error.message,"Error");
          this.spinner.hide();
          
        }
      })
      
      
    }else{
      this.toastr.error("Invalid Input.","Error")

    }
    

  }
}
