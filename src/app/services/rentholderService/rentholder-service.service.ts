import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentBillData, rentholderData, updateRentholderData } from 'src/app/model/data';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class RentholderServiceService {

  constructor(
  private http :HttpClient,


  ) { }

  // header= new HttpHeaders({
  //   'Content-Type':'application/json',
  //   // 'api_key':''
  // })

  getRentholderData(id:any){
    const token = localStorage.getItem('authorization')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'authorization':token
    });
    return this.http.get<rentholderData>(`${environment.apiUrl}/rentholder/user/${id}`,{withCredentials:true,headers:header});
  }

  getAllRentBillData(){
    const token = localStorage.getItem('authorization')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'authorization':token
    });
    return this.http.get<[rentBillData]>(`${environment.apiUrl}/rent-bill/rentholder`,{withCredentials:true,headers:header});
  }
  updateRentholderData(id:string,data:updateRentholderData){
    const token = localStorage.getItem('authorization')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'authorization':token
    });
    return this.http.put(`${environment.apiUrl}/rentholder/user/${id}`,data,{withCredentials:true,headers:header});
  }

  generateChallenge(){
    const token = localStorage.getItem('authorization')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'authorization':token
    });
    return this.http.get(`${environment.apiUrl}/rentholder/reg-challenge`,{withCredentials:true,headers:header});
  }
  verifyChallenge(data:any){
    const token = localStorage.getItem('authorization')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'authorization':token
    });
    return this.http.post(`${environment.apiUrl}/rentholder/verify-challenge`,data,{withCredentials:true,headers:header});
  }
  unregesterLandlordPasskey(id:string){
    const token = localStorage.getItem('authorization')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'authorization':token
    });
    return this.http.delete(`${environment.apiUrl}/rentholder/unregd-passkey/${id}`,{withCredentials:true,headers:header});
  }
}
