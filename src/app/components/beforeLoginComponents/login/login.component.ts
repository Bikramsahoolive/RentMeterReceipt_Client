import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginData } from 'src/app/model/data';
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';
import { startAuthentication } from '@simplewebauthn/browser'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {  
  constructor(private spinner:NgxSpinnerService, private toastr: ToastrService ,public authServ: AuthServiceService,private router:Router){}
  
  showDiv:boolean=false;
  showBtn:boolean=false;
  passkeyUserData:any;
  ngOnInit(){
    const passkeyData = localStorage.getItem('passkey_id')||"";
    
    if(passkeyData && passkeyData!==null || passkeyData!==''){
      this.passkeyUserData = JSON.parse(atob((passkeyData)));
      
      this.showBtn = true;
      this.showDiv=true;
    }

  }
  loginWithPassword(){
    this.showDiv=false;
  }
  loginWithPasskey(){
    this.showDiv=true;
  }
  login(auth:loginData){
    auth.phone = String(auth.phone);
    if(auth.phone==='' || auth.password===''){
      this.toastr.info('Invalid Login Credentials', '',{positionClass:'toast-top-center',progressBar:true});
      return;
    }
    if(auth.phone.length!==10){
      this.toastr.info('Invalid User ID.', 'Error!',{positionClass:'toast-top-center',progressBar:true});
      return;
    }
    
    if (auth.userType==="landlord"){
      // delete auth.userType;
      this.authServ.landlordLogin(auth);
      
    }else if (auth.userType==="admin"){
      // delete auth.userType;
      this.authServ.adminLogin(auth);
    }else if(auth.userType==="rentholder"){
      // delete auth.userType;
      this.authServ.rentholderLogin(auth);
    }else{
      this.toastr.info('Select Usertype. ', 'Error!',{positionClass:'toast-top-center',progressBar:true});
    }
    
  }

  logout(){
    this.authServ.logout();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  authenticatePasskey(){

    // const name = localStorage.getItem('Device_Regd_Name');
    
      this.spinner.show();
    this.authServ.landlordRequestAuthOptions(this.passkeyUserData.id).subscribe({
      next:async(res:any)=>{
        this.spinner.hide();
       const publicKey = await startAuthentication(res.option);

        this.authServ.landlordLoginWithPasskey({userId:this.passkeyUserData.id,publicKey:publicKey});

      },
      error:(err)=>{
        this.spinner.hide();
        console.log(err.error);
      }
    });
  }
}
