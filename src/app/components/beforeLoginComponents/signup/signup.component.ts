import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signupService/signup.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private toastr: ToastrService ,private signupService:SignupService, private spinner:NgxSpinnerService){}
  regId:String = "";
  dToday:String='';
  ngOnInit(){
    let date= new Date();
    let year = date.getFullYear();
    let month =(date.getMonth()+1).toString().padStart(2,'0');
    let day = date.getDate();
    this.dToday=`${day}-${month}-${year}`;

    
  }
  signup(form:NgForm){
    const data = form.value;
    console.log(data.termNconditions);
    
    if (data.name!=="" && data.phone!=="" && data.email!=="" && data.upi!=="" && data. password!==""){
      if (data.password === data.confPass){
        if (data.termNconditions){
          this.spinner.show();
          // delete data.confPass;
          this.signupService.signUp(data).subscribe({
            next:(result:any)=>{
              console.log(result);
            this.regId = result.message;
            this.spinner.hide();
            },
            error:(err)=>{
              this.spinner.hide();
              this.toastr.error(`${err.error.message}`, 'Error!');
              
            },
            complete:()=>{
              form.reset();
            }
            
          })
          
        }else{
          this.toastr.error('Check on term & conditions.', 'Error!');
        }
       
      }else{
         this.toastr.error('Password not match.', 'Error!');

      }

    }else{
      this.toastr.error('field/fields are empty.', 'Error!');
    }
    
  }

}
