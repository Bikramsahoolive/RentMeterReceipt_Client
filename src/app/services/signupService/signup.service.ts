import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }
  header = new HttpHeaders({
    'Content-Type':'application/json',
    // 'api_key':''
    
  })
signUp(data:any){
  return this.http.post('https://c8bltjmv-3000.inc1.devtunnels.ms/signup',data,{headers:this.header});
}
signUpStatus(id:String){
  return this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/signup/status/${id}`,{headers:this.header});
}
getSignUpData(){
  return this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/signup`,{withCredentials:true,headers:this.header});
}
actionLandlordData(data:any){
  console.log(data.id);
  return this.http.post(`https://c8bltjmv-3000.inc1.devtunnels.ms/landlord/action/${data.id}`,data,{withCredentials:true,headers:this.header});
}

}
