import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signupService/signup.service';
import Swal from 'sweetalert2';
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
      this.toster.error('Invalid Email Input',"",{positionClass:'toast-top-center',progressBar:true});
      return;
    }
    this.spinner.show();
    this.homeServ.sendSubMail({email:emailId.value}).subscribe({
      next:(res:any)=>{
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
            title: "Subscribed successfully."
          });
        }else{
          this.toster.success(res.message,"",{positionClass:"toast-top-center",progressBar:true});
        }
      },error:(err)=>{
        console.error(err);
        this.toster.error('Something Went wrong.',"",{positionClass:"toast-top-center",progressBar:true});
        this.spinner.hide();
      },complete:()=>{
        emailId.value = '';
      }
    });
  }

  scrollToDiv(id:string){
    var targetDiv = document.getElementById(id);
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: 'smooth' });
    }
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
