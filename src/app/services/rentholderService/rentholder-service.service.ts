import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentBillData, rentholderData } from 'src/app/model/data';
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
}
