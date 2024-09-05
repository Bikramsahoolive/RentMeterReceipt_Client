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

  header= new HttpHeaders({
    'Content-Type':'application/json',
    // 'api_key':''
  })

  getRentholderData(id:any){
    return this.http.get<rentholderData>(`${environment.apiUrl}/rentholder/user/${id}`,{withCredentials:true,headers:this.header});
  }

  getAllRentBillData(){
    return this.http.get<[rentBillData]>(`${environment.apiUrl}/rent-bill/rentholder`,{withCredentials:true,headers:this.header});
  }
  updateRentholderData(id:string,data:updateRentholderData){
    return this.http.put(`${environment.apiUrl}/rentholder/user/${id}`,data,{withCredentials:true,headers:this.header});
  }

  generateChallenge(){
    return this.http.get(`${environment.apiUrl}/rentholder/reg-challenge`,{withCredentials:true,headers:this.header});
  }
  verifyChallenge(data:any){
    return this.http.post(`${environment.apiUrl}/rentholder/verify-challenge`,data,{withCredentials:true,headers:this.header});
  }
  unregesterLandlordPasskey(id:string){
    return this.http.delete(`${environment.apiUrl}/rentholder/unregd-passkey/${id}`,{withCredentials:true,headers:this.header});
  }
}
