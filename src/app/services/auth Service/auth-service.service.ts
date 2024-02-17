import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http:HttpClient, private router:Router,private spinner :NgxSpinnerService,private toastr:ToastrService ) { }
  private isLogedIn:boolean=false;
  private isAdmin:boolean=false;
  private isLandlord:boolean=false;

   header = new HttpHeaders({
    'Content-Type':'application/json',
    'api_key':'bikram123456@$&',
  });
  

  adminLogin(data:any)
  {
    this.spinner.show();
    this.http.post('http://localhost:5800/admin/login',data,{withCredentials:true,headers:this.header}).subscribe({
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
      // this.toastr.error(err.error.message,'Error');
      this.spinner.hide;

    },
    complete:()=>{
      this.spinner.hide();
    }
  })

  }

landlordLogin(data:any){

  this.spinner.show();

  this.http.post('http://localhost:5800/landlord/login',data,{withCredentials:true,headers:this.header}).subscribe({
    next:(res:any)=>{
        
      // if(res.status){
        let localData = JSON.stringify(res);
        let encData =btoa(localData);
        localStorage.setItem("connect.sid",encData);
        localStorage.setItem("connect.rid",btoa(res.isActive));
        this.isLogedIn = true;
        this.isLandlord=true;
        this.router.navigate(['dashbord-landlord']);  
        this.spinner.hide(); 
      // }
           

    },
     error:(err:any)=>{
      console.log(err.error);
      this.spinner.hide();

    },
    // complete:()=>{
    //   console.log("compllited");
    // }
  })
}








checkSession(){
  this.http.post(`http://localhost:5800/check-session`,{},{withCredentials:true,headers:this.header}).subscribe((result:any)=>{

    localStorage.setItem("connect.rid",btoa(result.isActive));
    this.isLogedIn = result.isActive;
if(result.userType==='admin'){
  this.isAdmin=result.isActive;
}else if(result.userType==='landlord'){
  this.isLandlord=result.isActive;
}else if(result.userType==='rentholder'){
  console.log('rentholder');
}
    
if (result.isActive==false){
  localStorage.setItem("connect.sid","null");
  this.isLogedIn = false;
  this.isLandlord=false;
  this.isAdmin=false;
  this.router.navigate(['home']);
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



 logout(){
this.spinner.show();
  this.http.post(`http://localhost:5800/logout`,{},{withCredentials:true,headers:this.header}).subscribe((result:any)=>{
    localStorage.setItem("connect.rid",btoa(result.isActive));
    localStorage.setItem("connect.sid","null");
    this.isLogedIn = false;
    this.isAdmin = false;
    this.isLandlord=false;
    this.router.navigate(['home']);
    this.spinner.hide();
  })

  // clearTimeout(this.timmer)
  // this.isLogedIn=false;
  // localStorage.clear();
  // this.router.navigate(['']);
  // this.userName=undefined;
}

}
