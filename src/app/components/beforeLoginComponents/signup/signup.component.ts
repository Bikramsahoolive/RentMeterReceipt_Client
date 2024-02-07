import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signupService/signup.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private toastr: ToastrService ,private signupService:SignupService){}
  signup(data:any){
    if (data.password === data.confPass){
      delete data.confPass;
      this.signupService.signUp(data).subscribe({
        next:(result:any)=>{
          console.log(result);
        this.toastr.success(` ${result.message}`, 'Success!',);
        },
        error:(err)=>{
          console.log(err);
        }
        
      })
      
    }else{
       this.toastr.error('Password not match.', 'Error!',);
    }
  }

}
