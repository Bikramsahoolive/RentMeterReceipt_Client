import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private toastr: ToastrService ,private authServ: AuthServiceService){}

  login(auth:any){
    
    if (auth.userType==="landlord"){
      this.authServ.landlordLogin(auth);
      
    }else if (auth.userType==="admin"){
      console.log(auth);
    }else if(auth.userType==="rentholder"){
      console.log(auth);
    }else{
      this.toastr.error('select user type. ', 'Error!',);
    }
    
  }
}
