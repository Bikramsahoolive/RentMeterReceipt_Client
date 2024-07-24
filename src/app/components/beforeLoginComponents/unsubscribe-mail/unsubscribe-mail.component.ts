import { Component,ViewChild,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signupService/signup.service';

@Component({
  selector: 'app-unsubscribe-mail',
  templateUrl: './unsubscribe-mail.component.html',
  styleUrls: ['./unsubscribe-mail.component.css']
})
export class UnsubscribeMailComponent {
  constructor(private route:ActivatedRoute,private router:Router,private spinner:NgxSpinnerService,private toaster :ToastrService,private signupServe:SignupService){}
  @ViewChild('emailInput',{ static: false })email!:ElementRef;
  emailid:string='';
  ngOnInit(){
    let urlId = this.route.snapshot.paramMap.get('id');
    let emailId;
    if(urlId && urlId!==null){
     emailId = atob(urlId);
     this.spinner.show();
     this.signupServe.checkUnsubMail({email:emailId}).subscribe({
      next:(res:any)=>{
        this.spinner.hide();
        if(!res.status){
          this.router.navigate(['']);
          this.toaster.error('This email is already unsubscribed.',"",{positionClass:"toast-top-center",progressBar:true});
        }
      },error:(err)=>{
        this.spinner.hide();
        console.log(err.error);
        this.toaster.error('something wents wrong.',"Error",{positionClass:"toast-top-center",progressBar:true});
      }
    });
    }
    
  }
  ngAfterViewInit() {
    let urlId = this.route.snapshot.paramMap.get('id');
    let emailId;
    
    if(urlId && urlId!==null){
      emailId = atob(urlId);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(emailId)){
        this.toaster.error('Invalid Request',"",{positionClass:'toast-top-center',progressBar:true});
        this.router.navigate(['']);
      }
      this.email.nativeElement.value=emailId; 
      this.emailid = emailId;
    }else{
      this.email.nativeElement.removeAttribute('readonly');
    }
  }


  unsubscribe(){
    
    let data={
      email:""
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(this.emailid!==""){
      data.email = this.emailid;
    }else{
      if(this.email.nativeElement.value===""|| !emailRegex.test(this.email.nativeElement.value)){
        this.toaster.error('Invalid Email Input.',"",{positionClass:'toast-top-center',progressBar:true});
        return;
      }

      data.email = this.email.nativeElement.value;
    }
    this.spinner.show();
    this.signupServe.sendUnsubMail(data).subscribe({
      next:(res:any)=>{
        if(res.status==='success'){
        this.toaster.success(res.message,"",{positionClass:'toast-top-center',progressBar:true});
        this.router.navigate(['']);
        }else{
          this.toaster.error(res.message,"",{positionClass:'toast-top-center',progressBar:true});
        }
        this.spinner.hide();
      },error:(err)=>{
        this.spinner.hide();
        console.log(err.error);
        this.toaster.error('Something wents wrong.',"",{positionClass:'toast-top-center',progressBar:true});
      }
    });
    
    
  }


}
