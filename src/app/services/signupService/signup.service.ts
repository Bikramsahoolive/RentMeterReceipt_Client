import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }
  header = new HttpHeaders({
    'Content-Type':'application/json',
    'api_key':'bikram123456@$&'
    
  })
signUp(data:any){
  return this.http.post('http://localhost:5800/signup',data,{headers:this.header});
}
signUpStatus(id:String){
  return this.http.get(`http://localhost:5800/signup/status/${id}`,{headers:this.header});
}
getSignUpData(){
  return this.http.get(`http://localhost:5800/signup`,{withCredentials:true,headers:this.header});
}
actionLandlordData(data:any){
  console.log(data.id);
  return this.http.post(`http://localhost:5800/landlord/action/${data.id}`,data,{withCredentials:true,headers:this.header});
}

}
