import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { landlordData } from 'src/app/model/data';
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
   return this.http.post('https://rnmrs.onrender.com/rent-holder',data,{withCredentials:true,headers:this.header});
  }
  getAllRentholder(){
    return this.http.get('https://rnmrs.onrender.com/rent-holder/landlord',{withCredentials:true,headers:this.header});
  }
  createRentBill(data:any){
    return this.http.post('https://rnmrs.onrender.com/rent-bill',data,{withCredentials:true,headers:this.header});
  }
  getAllRentBillData(){
    return this.http.get('https://rnmrs.onrender.com/rent-bill/landlord',{withCredentials:true,headers:this.header});
  }
  deleteRentBillData(id:any){
    return this.http.delete(`https://rnmrs.onrender.com/rent-bill/bill/${id}`,{withCredentials:true,headers:this.header});
  }
  getSingleRentBillData(id:any){
    return this.http.get(`https://rnmrs.onrender.com/rent-bill/bill/${id}`,{withCredentials:true,headers:this.header});
  }
  getLandlordData(id:any){
    return this.http.get<landlordData>(`https://rnmrs.onrender.com/landlord/user/${id}`,{withCredentials:true,headers:this.header});
  }
  deleteRentHolderData(id:any){
    return this.http.delete(`https://rnmrs.onrender.com/rent-holder/user/${id}`,{withCredentials:true,headers:this.header});
  }
  updateLandlordData(data:any,id:any ){
    return this.http.put(`https://rnmrs.onrender.com/landlord/user/${id}`,data,{withCredentials:true,headers:this.header});
  }
  fineAdditionData(data:any,id:any){
    return this.http.post(`https://rnmrs.onrender.com/rent-bill/bill/${id}`,data,{withCredentials:true,headers:this.header});
  }
  paymentBillData(data:any,id:any){
    return this.http.put(`https://rnmrs.onrender.com/rent-bill/bill/${id}`,data,{withCredentials:true,headers:this.header});
  }
  deleteLandlordData(id:any){
    return this.http.delete(`https://rnmrs.onrender.com/landlord/user/${id}`,{withCredentials:true,headers:this.header});
  }
}
