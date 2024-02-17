import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LandlordService {

  constructor(private http : HttpClient) { }
  header= new HttpHeaders({
    'Content-Type':'application/json',
    'api_key':'bikram123456@$&'
  })
  addRentHolder(data:any){
   return this.http.post('http://localhost:5800/rent-holder',data,{withCredentials:true,headers:this.header});
  }
  getAllRentholder(){
    return this.http.get('http://localhost:5800/rent-holder/landlord',{withCredentials:true,headers:this.header});
  }
  createRentBill(data:any){
    return this.http.post('http://localhost:5800/rent-bill',data,{withCredentials:true,headers:this.header});
  }
  getAllRentBillData(){
    return this.http.get('http://localhost:5800/rent-bill/landlord',{withCredentials:true,headers:this.header});
  }
  deleteRentBillData(id:any){
    return this.http.delete(`http://localhost:5800/rent-bill/bill/${id}`,{withCredentials:true,headers:this.header});
  }
  getSingleRentBillData(id:any){
    return this.http.get(`http://localhost:5800/rent-bill/bill/${id}`,{withCredentials:true,headers:this.header});
  }
  getLandlordData(id:any){
    return this.http.get(`http://localhost:5800/landlord/user/${id}`,{withCredentials:true,headers:this.header});
  }
  deleteRentHolderData(id:any){
    return this.http.delete(`http://localhost:5800/rent-holder/user/${id}`,{withCredentials:true,headers:this.header});
  }
  getSingleLandlordData(id:any){
    return this.http.get(`http://localhost:5800/landlord/user/${id}`,{withCredentials:true,headers:this.header});
  }
  updateLandlordData(data:any,id:any ){
    return this.http.put(`http://localhost:5800/landlord/user/${id}`,data,{withCredentials:true,headers:this.header});
  }
  fineAdditionData(data:any,id:any){
    return this.http.post(`http://localhost:5800/rent-bill/bill/${id}`,data,{withCredentials:true,headers:this.header});
  }
  paymentBillData(data:any,id:any){
    return this.http.put(`http://localhost:5800/rent-bill/bill/${id}`,data,{withCredentials:true,headers:this.header});
  }
}
