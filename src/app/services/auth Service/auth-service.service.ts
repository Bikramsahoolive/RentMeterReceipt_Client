import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment';
import * as bcrypt from 'bcryptjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http:HttpClient, private router:Router,private spinner :NgxSpinnerService,private toastr:ToastrService ) { }
  public isLogedIn:boolean=false;
  public isAdmin:boolean=false;
  public isLandlord:boolean=false;
  public isRentholder:boolean=false;

   header = new HttpHeaders({
    'Content-Type':'application/json',
    // 'authorization':''
  });
  

  adminLogin(data:any)
  {
    return this.http.post(`${environment.apiUrl}/admin/login`,data,{withCredentials:true,headers:this.header});
  }

landlordLogin(data:any){
  return this.http.post(`${environment.apiUrl}/landlord/login`,data,{withCredentials:true,headers:this.header});
}

rentholderLogin(data:any){
  return this.http.post(`${environment.apiUrl}/rentholder/login`,data,{withCredentials:true,headers:this.header});
}


forgotPassword(data:any){
  return this.http.post(`${environment.apiUrl}/forgot-password`,data,{headers:this.header});
}


resendForgotPassword(data:any){
  return this.http.post(`${environment.apiUrl}/forgot-password/resend`,data,{headers:this.header});
}

verifyforgotPassword(data:any){
  return this.http.post(`${environment.apiUrl}/forgot-password/verify`,data,{headers:this.header});
}


checkLandlordSession(){
  const token = localStorage.getItem('authorization')||'';
  const header = new HttpHeaders({
    'Content-Type':'application/json',
    'authorization':token
  });
  this.http.post(`${environment.apiUrl}/check-session`,{},{withCredentials:true,headers:header}).subscribe({
    next:(result:any)=>{
      if(result.isActive){
        if(result.userType!=='Landlord'){
          this.router.navigate(['']);
        }
      }
    }
  });
}

checkAdminSession(){
  const token = localStorage.getItem('authorization')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'authorization':token
    });
  this.http.post(`${environment.apiUrl}/check-session`,{},{withCredentials:true,headers:header}).subscribe({
    next:(result:any)=>{
      if(result.isActive){
        if(result.userType!=='Admin'){
          this.router.navigate(['']);
        }
      }
    }
  });
}


checkrentHolderSession(){
  const token = localStorage.getItem('authorization')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'authorization':token
    });
  this.http.post(`${environment.apiUrl}/check-session`,{},{withCredentials:true,headers:header}).subscribe({
    next:(result:any)=>{
      if(result.isActive){
        if(result.userType!=='Rentholder'){
          this.router.navigate(['']);
        }
      }
    }
  });
}



checkSession(){
  const token = localStorage.getItem('authorization')||'';
  const header = new HttpHeaders({
    'Content-Type':'application/json',
    'authorization':token
  });
  this.http.post(`${environment.apiUrl}/check-session`,{},{withCredentials:true,headers:header}).subscribe((result:any)=>{
    if (result.isActive){
    localStorage.setItem("connect.rid",btoa('true'));
}else{
  localStorage.setItem("connect.rid",btoa('false'));
  localStorage.setItem("connect.sid","null");
  localStorage.removeItem('authorization');
  //////
  this.isLogedIn = false;
  this.isAdmin = false;
  this.isLandlord=false;
  this.isRentholder=false;
  //////
this.toastr.error(result.message,'Error!',{progressBar:true,positionClass:"toast-top-center"});
  this.router.navigate(['login']);


  
  if(result.message==="session expired."){
    this.spinner.hide();
  }
  // if(this.isLogedIn){
  //   this.logout();
  // }
}
 },(err)=>{
  console.log(err.error);
  this.toastr.error('Somthing went wrong','Error!',{progressBar:true,positionClass:"toast-top-center"});
 }
);
 
 }

 setHeader(){
  const token = localStorage.getItem('authorization')||'';
  const header = new HttpHeaders({
    'Content-Type':'application/json',
    'authorization':token
  });
  this.http.post(`${environment.apiUrl}/check-session`,{},{withCredentials:true,headers:header}).subscribe({
    next:(result:any)=>{
    if (result.isActive){
      this.isLogedIn = true;

      if(result.userType==='Admin'){
        this.isAdmin=result.isActive;
      }else if(result.userType==='Landlord'){
        this.isLandlord=result.isActive;
      }else if(result.userType==='Rentholder'){
          this.isRentholder=result.isActive;
      }
    }else{
      this.isLandlord=false;
      this.isRentholder=false;
      this.isAdmin=false;
      this.isLogedIn = false;
    }
    },error:(err)=>{
      console.log(err.error);
      
    }
    });
 }

 isLogin(){
  return this.isLogedIn;
 }
 Admin(){
  return this.isAdmin;
 }
 Landlord(){
    return this.isLandlord;
 }

 Rentholder(){
  return this.isRentholder;
 }


 logout(){
this.spinner.show();
const token = localStorage.getItem('authorization')||'';
const header = new HttpHeaders({
  'Content-Type':'application/json',
  'authorization':token
});
  this.http.post(`${environment.apiUrl}/logout`,{},{withCredentials:true,headers:header}).subscribe((result:any)=>{
    localStorage.setItem("connect.rid",btoa('false'));
    localStorage.setItem("connect.sid","null");
    localStorage.removeItem('authorization');
    this.isLogedIn = false;
    this.isAdmin = false;
    this.isLandlord=false;
    this.isRentholder=false;
    this.router.navigate(['login']);
    this.spinner.hide();
  })

  // clearTimeout(this.timmer)
  // this.isLogedIn=false;
  // localStorage.clear();
  // this.router.navigate(['']);
  // this.userName=undefined;
}

landlordRequestAuthOptions(id:string){
  return this.http.get(`${environment.apiUrl}/landlord/auth-options/${id}`,{headers:this.header});
}
landlordLoginWithPasskey(data:any){
  this.http.post(`${environment.apiUrl}/landlord/login-passkey`,data,{withCredentials:true,headers:this.header})
  .subscribe({
    next:(res:any)=>{
      let localData = JSON.stringify(res);
        let encData = btoa(localData);
        localStorage.setItem('authorization',res.authToken);
        localStorage.setItem("connect.sid",encData);
        localStorage.setItem("connect.rid",btoa(res.isActive));
        this.isLogedIn = true;
        this.isLandlord=true;
        this.router.navigate(['dashbord-landlord']);
    },
    error:(err)=>{
      console.log(err.error);
      this.spinner.hide();
      this.toastr.error('Something went wrong.',"Error",{progressBar:true,positionClass:"toast-top-center"})
    }
  })
}


rentholderRequestAuthOptions(id:string){
  return this.http.get(`${environment.apiUrl}/rentholder/auth-options/${id}`,{headers:this.header});
}
rentholderLoginWithPasskey(data:any){
  this.http.post(`${environment.apiUrl}/rentholder/login-passkey`,data,{withCredentials:true,headers:this.header})
  .subscribe({
    next:(res:any)=>{
      let localData = JSON.stringify(res);
        let encData = btoa(localData);
        localStorage.setItem('authorization',res.authToken);
        localStorage.setItem("connect.sid",encData);
        localStorage.setItem("connect.rid",btoa(res.isActive));
        this.isLogedIn = true;
        this.isRentholder=true;
        this.router.navigate(['dashbord-rentholder']);
    },
    error:(err)=>{
      console.log(err.error);
      this.spinner.hide();
      this.toastr.error('Something went wrong.',"Error",{progressBar:true,positionClass:"toast-top-center"})
    }
  });
}

serverStatus(){
  return this.http.get(`${environment.apiUrl}`,{headers:this.header});
}
encPassword(password:string){
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

return hash;
}
}
