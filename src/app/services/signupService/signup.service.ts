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

}
