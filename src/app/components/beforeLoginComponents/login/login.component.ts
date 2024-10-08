import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginData } from 'src/app/model/data';
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';
import { startAuthentication } from '@simplewebauthn/browser'
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
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
      
      let userId = String(this.passkeyUserData.phone).slice(6);
      this.passkeyUserData.userid = userId;
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
      this.toastr.error('Invalid Login Credentials', '',{positionClass:'toast-top-center',progressBar:true});
      return;
    }
    if(auth.phone.length!==10){
      this.toastr.error('Invalid User ID.', 'Error!',{positionClass:'toast-top-center',progressBar:true});
      return;
    }
    const fcmToken = localStorage.getItem('fcm_token');
    if(fcmToken!==null){
      auth.fcm_token = fcmToken;
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
      this.toastr.error('Select Usertype. ', 'Error!',{positionClass:'toast-top-center',progressBar:true});
    }
    
  }

  logout(){
    this.authServ.logout();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  authenticatePasskey(){
    
      this.spinner.show();
      if(this.passkeyUserData.userType ==='Landlord'){
    this.authServ.landlordRequestAuthOptions(this.passkeyUserData.id).subscribe({
      next:async(res:any)=>{
        this.spinner.hide();

        if(res.status && res.status ==="failure"){
          localStorage.removeItem('passkey_id');
          this.toastr.error(res.message,"",{positionClass:'toast-top-center',progressBar:true});
          this.router.navigate(['']);
          return;
        }
       const publicKey = await startAuthentication(res.option);

       this.spinner.show();
        this.authServ.landlordLoginWithPasskey({userId:this.passkeyUserData.id,publicKey:publicKey});

      },
      error:(err)=>{
        this.spinner.hide();
        console.log(err.error);
      }
    });
  }else if(this.passkeyUserData.userType ==='Rentholder'){
    this.authServ.rentholderRequestAuthOptions(this.passkeyUserData.id).subscribe({
      next:async(res:any)=>{
        this.spinner.hide();

        if(res.status && res.status ==="failure"){
          localStorage.removeItem('passkey_id');
          this.toastr.error(res.message,"",{positionClass:'toast-top-center',progressBar:true});
          this.router.navigate(['']);
          return;
        }
       const publicKey = await startAuthentication(res.option);

       this.spinner.show();
        this.authServ.rentholderLoginWithPasskey({userId:this.passkeyUserData.id,publicKey:publicKey});

      },
      error:(err)=>{
        this.spinner.hide();
        console.log(err.error);
      }
    });
  }

  }

  passkeyAuthInfo(){
    Swal.fire({
      html:`<h3 style="margin-bottom:20px;">Steps to Enable Passkey Authentication. (Passwordless)</h3>
<ol style="margin-bottom:20px;">
    <li style="text-align:start; padding:5px 0;">Login to RentⓝMeter.Receipt with user ID and Password.</li>
    <li style="text-align:start;padding:5px 0;">Click on Manage Profile given on the User Menu.</li>
    <li style="text-align:start;padding:5px 0;">Click on Register Passkey button below.</li>
    <li style="text-align:start;padding:5px 0;">Authenticate with any method (Eg:.Fingerprint, Face ID, Windows Hello ,Android or ios (password/ Pin/ Pattern), USB Security keys or NFC keys etc...)</li>
    <li style="text-align:start;padding:5px 0;">After successfully registration you will be authenticate with passkey.</li>
</ol>
<strong style="color:red;">
    Please ensure that you are the only user registered with Fingerprint or Face ID using on your device,
    RentⓝMeter.Receipt is not responsible for any action performed using the other user/ biometic registered on the device.
</strong>
`,
confirmButtonText:'Close'
    })
  }
}
