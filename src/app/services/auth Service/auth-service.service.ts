import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http:HttpClient, private router:Router) { }
  private isLogedIn:boolean=false;
  private isAdmin:boolean=false;
  private isLandlord:boolean=false;

   header = new HttpHeaders({
    'Content-Type':'application/json',
    'api_key':'bikram123456@$&',
    
    
  })
  

  adminLogin(data:any)
  {
    this.http.post('http://localhost:5800/admin/login',data,{withCredentials:true,headers:this.header}).subscribe({
    next:(res:any)=>{
      let localData = JSON.stringify(res);
      let encData =btoa(localData);
    localStorage.setItem("connect.sid",encData);
    localStorage.setItem("connect.rid",btoa(res.isActive));
    this.isLogedIn = true;
    this.isAdmin=true;
    this.router.navigate(['dashbord-admin']); 
        
        

    }
    ,error:(err:any)=>{
      console.log(err.error);

    },
    // complete:()=>{
    //   console.log("compllited");
    // }
  })

  }

landlordLogin(data:any){

  

  this.http.post('http://localhost:5800/landlord/login',data,{withCredentials:true,headers:this.header}).subscribe({
    next:(res:any)=>{
        
          let localData = JSON.stringify(res);
          let encData =btoa(localData);
        localStorage.setItem("connect.sid",encData);
        localStorage.setItem("connect.rid",btoa(res.isActive));
        this.isLogedIn = true;
        this.isLandlord=true;
        this.router.navigate(['dashbord-landlord']);        

    }
    ,error:(err:any)=>{
      console.log(err.error);

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
      this.router.navigate(['home']);
    }
    
 })
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

  this.http.post(`http://localhost:5800/logout`,{},{withCredentials:true,headers:this.header}).subscribe((result:any)=>{
    localStorage.setItem("connect.rid",btoa(result.isActive));
    localStorage.setItem("connect.sid","null");
    this.isLogedIn = false;
    this.isLandlord=false;
    this.router.navigate(['home']);
  })

  // clearTimeout(this.timmer)
  // this.isLogedIn=false;
  // localStorage.clear();
  // this.router.navigate(['']);
  // this.userName=undefined;
}

}
