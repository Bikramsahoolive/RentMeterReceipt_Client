import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient) { }
  // header = new HttpHeaders({
  //   'Content-Type':'application/json',
  //   // 'api_key':''
    
  // })
  
  getAllPayoutData(){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.get(`${environment.apiUrl}/admin/get/payout`,{withCredentials:true,headers:header});
  }
  
}
