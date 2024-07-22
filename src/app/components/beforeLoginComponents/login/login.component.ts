import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginData } from 'src/app/model/data';
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private toastr: ToastrService ,public authServ: AuthServiceService,private router:Router){}
  ngOnInit(){
  }
  login(auth:loginData){
    auth.phone = String(auth.phone);
    if(auth.phone==='' || auth.password===''){
      this.toastr.info('Invalid Input.', 'Error!',{positionClass:'toast-top-center',progressBar:true});
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
}
