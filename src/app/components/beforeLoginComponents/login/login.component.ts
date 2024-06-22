import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { loginData } from 'src/app/model/data';
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private toastr: ToastrService ,private authServ: AuthServiceService){}

  login(auth:loginData){
    auth.phone = String(auth.phone);
    
    if (auth.userType==="landlord"){
      // delete auth.userType;
      this.authServ.landlordLogin(auth);
      
    }else if (auth.userType==="admin"){
      // delete auth.userType;
      this.authServ.adminLogin(auth);
    }else if(auth.userType==="rentholder"){
      // delete auth.userType;
      console.log(auth);
    }else{
      this.toastr.error('select user type. ', 'Error!',);
    }
    
  }
}
