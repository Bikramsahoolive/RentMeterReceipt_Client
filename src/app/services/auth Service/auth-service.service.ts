import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http:HttpClient, private router:Router) { }
  private isLogedIn:boolean=false;
  private isLandlord:boolean=false;

   header = new HttpHeaders({
    'Content-Type':'application/json',
    'api_key':'bikram123456@$&',
    
    
  })
  

landlordLogin(data:any){

  

  this.http.post('http://localhost:5800/landlord/login',data,{withCredentials:true,headers:this.header}).subscribe({
    next:(res:any)=>{
        console.log(res);
        if (res.isActive==true){
        localStorage.setItem("name",res.name);
        localStorage.setItem("phone",res.phone);
        localStorage.setItem("email",res.email);
        localStorage.setItem("id",res.id);
        localStorage.setItem("connect.sid",btoa('true'));
        this.isLogedIn = true;
        this.isLandlord=true;
        this.router.navigate(['dashbord-landlord']);

        }
        

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
    console.log(result);
    localStorage.setItem("connect.sid",btoa(result.isActive));
    this.isLogedIn = result.isActive;
    this.isLandlord=result.isActive;
    
    if (result.isActive==false){
      this.router.navigate(['home']);
    }
 })
 }

 isLogin(){
  return this.isLogedIn;
 }
 Landlord(){
    return this.isLandlord;
 }
 logout():any{

  this.http.post(`http://localhost:5800/logout`,{},{withCredentials:true,headers:this.header}).subscribe((result:any)=>{
    console.log(result);
    localStorage.setItem("connect.sid",btoa('false'));
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
