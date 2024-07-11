import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }
  header = new HttpHeaders({
    'Content-Type':'application/json',
    // 'api_key':''
    
  })
  startServer(){
    return this.http.get(`${environment.apiUrl}/`,{headers:this.header});
 }
signUp(data:any){
  return this.http.post(`${environment.apiUrl}/signup`,data,{headers:this.header});
}
signUpStatus(id:String){
  return this.http.get(`${environment.apiUrl}/signup/status/${id}`,{headers:this.header});
}
getSignUpData(){
  return this.http.get(`${environment.apiUrl}/signup`,{withCredentials:true,headers:this.header});
}
actionLandlordData(data:any){
  return this.http.post(`${environment.apiUrl}/landlord/action`,data,{withCredentials:true,headers:this.header});
}

sendSubMail(data:any){
  return this.http.post(`${environment.apiUrl}/client/subscribe`,data,{headers:this.header});
}

sendUnsubMail(data:any){
  return this.http.post(`${environment.apiUrl}/client/unsubscribe`,data,{headers:this.header});
}
sendFeedback(data:any){
  return this.http.post(`${environment.apiUrl}/client/feedback`,data,{headers:this.header});
}
signUpVerify(data:any){
  return this.http.post(`${environment.apiUrl}/signup/verify`,data,{headers:this.header})
}

}
