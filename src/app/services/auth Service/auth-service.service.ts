import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http:HttpClient, private router:Router,private spinner :NgxSpinnerService,private toastr:ToastrService ) { }
  private isLogedIn:boolean=false;
  private isAdmin:boolean=false;
  private isLandlord:boolean=false;
  private isRentholder:boolean=false;

   header = new HttpHeaders({
    'Content-Type':'application/json',
    // 'api_key':''
  });
  

  adminLogin(data:any)
  {
    this.spinner.show();
    this.http.post(`${environment.apiUrl}/admin/login`,data,{withCredentials:true,headers:this.header}).subscribe({
    next:(res:any)=>{
      let localData = JSON.stringify(res);
      let encData =btoa(localData);
    localStorage.setItem("connect.sid",encData);
    localStorage.setItem("connect.rid",btoa(res.isActive));
    this.isLogedIn = true;
    this.isAdmin=true;
    this.router.navigate(['dashbord-admin']);
    this.spinner.hide();
    },
    error:(err:any)=>{
      console.log(err.error);
      this.toastr.error(err.error.text, 'Error!',{progressBar:true,positionClass:"toast-top-center"});
      this.spinner.hide();
    }
  })

  }

landlordLogin(data:any){

  this.spinner.show();

  this.http.post(`${environment.apiUrl}/landlord/login`,data,{withCredentials:true,headers:this.header}).subscribe({
    next:(res:any)=>{
        // console.log(res);
        
      // if(res.status){
        let localData = JSON.stringify(res);
        let encData =btoa(localData);
        localStorage.setItem("connect.sid",encData);
        localStorage.setItem("connect.rid",btoa(res.isActive));
        this.isLogedIn = true;
        this.isLandlord=true;
        this.router.navigate(['dashbord-landlord']);  
        
      // }
           

    },
     error:(err:any)=>{
      console.log(err.error);
      this.toastr.error(err.error.message, 'Error!',{progressBar:true,positionClass:"toast-top-center"});
      this.spinner.hide();

    }
  })
}

rentholderLogin(data:any){

  this.spinner.show();

  this.http.post(`${environment.apiUrl}/rentholder/login`,data,{withCredentials:true,headers:this.header}).subscribe({
    next:(res:any)=>{
        // console.log(res);
        
      // if(res.status){
        let localData = JSON.stringify(res);
        let encData =btoa(localData);
        localStorage.setItem("connect.sid",encData);
        localStorage.setItem("connect.rid",btoa(res.isActive));
        this.isLogedIn = true;
        this.isRentholder=true;
        this.router.navigate(['dashbord-rentholder']);  
        
      // }
           

    },
     error:(err:any)=>{
      console.log(err);
      this.toastr.error(err.error,'Error!',{progressBar:true,positionClass:"toast-top-center"});
      this.spinner.hide();

    }
  })
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
  this.http.post(`${environment.apiUrl}/check-session`,{},{withCredentials:true,headers:this.header}).subscribe({
    next:(result:any)=>{
      if(result.isActive){
        if(result.userType!=='landlord'){
          this.router.navigate(['']);
        }
      }
    }
  });
}

checkAdminSession(){
  this.http.post(`${environment.apiUrl}/check-session`,{},{withCredentials:true,headers:this.header}).subscribe({
    next:(result:any)=>{
      if(result.isActive){
        if(result.userType!=='admin'){
          this.router.navigate(['']);
        }
      }
    }
  });
}


checkrentHolderSession(){
  this.http.post(`${environment.apiUrl}/check-session`,{},{withCredentials:true,headers:this.header}).subscribe({
    next:(result:any)=>{
      if(result.isActive){
        if(result.userType!=='rentholder'){
          this.router.navigate(['']);
        }
      }
    }
  });
}



checkSession(){
  this.http.post(`${environment.apiUrl}/check-session`,{},{withCredentials:true,headers:this.header}).subscribe((result:any)=>{
    if (result.isActive){
    localStorage.setItem("connect.rid",btoa('true'));
}else{
  localStorage.setItem("connect.rid",btoa('false'));
  localStorage.setItem("connect.sid","null");
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
  this.toastr.error('Somthing wents wrong','Error!',{progressBar:true,positionClass:"toast-top-center"});
 }
);
 
 }

 setHeader(){
  this.http.post(`${environment.apiUrl}/check-session`,{},{withCredentials:true,headers:this.header}).subscribe({
    next:(result:any)=>{
    if (result.isActive){
      this.isLogedIn = true;

      if(result.userType==='admin'){
        this.isAdmin=result.isActive;
      }else if(result.userType==='landlord'){
        this.isLandlord=result.isActive;
      }else if(result.userType==='rentholder'){
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
  this.http.post(`${environment.apiUrl}/logout`,{},{withCredentials:true,headers:this.header}).subscribe((result:any)=>{
    localStorage.setItem("connect.rid",btoa('false'));
    localStorage.setItem("connect.sid","null");
    this.isLogedIn = false;
    this.isAdmin = false;
    this.isLandlord=false;
    this.isRentholder=false;
    this.router.navigate(['']);
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
      console.log(res);
      
      let localData = JSON.stringify(res);
        let encData = btoa(localData);
        localStorage.setItem("connect.sid",encData);
        localStorage.setItem("connect.rid",btoa(res.isActive));
        this.isLogedIn = true;
        this.isLandlord=true;
        this.router.navigate(['dashbord-landlord']);
    },
    error:(err)=>{
      console.log(err.error);
      this.spinner.hide();
      
    }
  })
}


}
