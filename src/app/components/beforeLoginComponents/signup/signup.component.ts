import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signupService/signup.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private toastr: ToastrService ,private signupService:SignupService){}
  regId:String = "";
  signup(form:NgForm){
    const data = form.value;

    if (data.name!=="" && data.phone!=="" && data.email!=="" && data.upi!=="" && data. password!==""){
      if (data.password === data.confPass){
        // delete data.confPass;
        this.signupService.signUp(data).subscribe({
          next:(result:any)=>{
            console.log(result);
          this.regId = result.message;
          },
          error:(err)=>{
            this.toastr.error(`${err.error.message}`, 'Error!',);
          },
          complete:()=>{
            form.reset();
          }
          
        })
        
      }else{
         this.toastr.error('Password not match.', 'Error!',);
      }

    }else{
      this.toastr.error('field/fields are empty.', 'Error!',);
    }
    
  }

}
