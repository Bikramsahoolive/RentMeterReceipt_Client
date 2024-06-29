import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { landlordData } from 'src/app/model/data';
import { environment } from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class LandlordService {

  constructor(private http : HttpClient) { }
  header= new HttpHeaders({
    'Content-Type':'application/json',
    // 'api_key':''
  })
  addRentHolder(data:any){
   return this.http.post(`${environment.apiUrl}/rentholder`,data,{withCredentials:true,headers:this.header});
  }
  getAllRentholder(){
    return this.http.get(`${environment.apiUrl}/rentholder/landlord`,{withCredentials:true,headers:this.header});
  }
  createRentBill(data:any){
    return this.http.post(`${environment.apiUrl}/rent-bill`,data,{withCredentials:true,headers:this.header});
  }
  getAllRentBillData(){
    return this.http.get(`${environment.apiUrl}/rent-bill/landlord`,{withCredentials:true,headers:this.header});
  }
  deleteRentBillData(id:any){
    return this.http.delete(`${environment.apiUrl}/rent-bill/bill/${id}`,{withCredentials:true,headers:this.header});
  }
  getSingleRentBillData(id:any){
    return this.http.get(`${environment.apiUrl}/rent-bill/bill/${id}`,{withCredentials:true,headers:this.header});
  }
  getLandlordData(id:any){
    return this.http.get<landlordData>(`${environment.apiUrl}/landlord/user/${id}`,{withCredentials:true,headers:this.header});
  }
  deleteRentHolderData(id:any){
    return this.http.delete(`${environment.apiUrl}/rentholder/user/${id}`,{withCredentials:true,headers:this.header});
  }
  updateLandlordData(data:any,id:any ){
    return this.http.put(`${environment.apiUrl}/landlord/user/${id}`,data,{withCredentials:true,headers:this.header});
  }
  fineAdditionData(data:any,id:any){
    return this.http.post(`${environment.apiUrl}/rent-bill/bill/${id}`,data,{withCredentials:true,headers:this.header});
  }
  paymentBillData(data:any,id:any){
    return this.http.put(`${environment.apiUrl}/rent-bill/bill/${id}`,data,{withCredentials:true,headers:this.header});
  }
  deleteLandlordData(id:any){
    return this.http.delete(`${environment.apiUrl}/landlord/user/${id}`,{withCredentials:true,headers:this.header});
  }
}
