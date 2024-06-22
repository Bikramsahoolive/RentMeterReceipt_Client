import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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
   return this.http.post('https://c8bltjmv-3000.inc1.devtunnels.ms/rent-holder',data,{withCredentials:true,headers:this.header});
  }
  getAllRentholder(){
    return this.http.get('https://c8bltjmv-3000.inc1.devtunnels.ms/rent-holder/landlord',{withCredentials:true,headers:this.header});
  }
  createRentBill(data:any){
    return this.http.post('https://c8bltjmv-3000.inc1.devtunnels.ms/rent-bill',data,{withCredentials:true,headers:this.header});
  }
  getAllRentBillData(){
    return this.http.get('https://c8bltjmv-3000.inc1.devtunnels.ms/rent-bill/landlord',{withCredentials:true,headers:this.header});
  }
  deleteRentBillData(id:any){
    return this.http.delete(`https://c8bltjmv-3000.inc1.devtunnels.ms/rent-bill/bill/${id}`,{withCredentials:true,headers:this.header});
  }
  getSingleRentBillData(id:any){
    return this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/rent-bill/bill/${id}`,{withCredentials:true,headers:this.header});
  }
  getLandlordData(id:any){
    return this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/landlord/user/${id}`,{withCredentials:true,headers:this.header});
  }
  deleteRentHolderData(id:any){
    return this.http.delete(`https://c8bltjmv-3000.inc1.devtunnels.ms/rent-holder/user/${id}`,{withCredentials:true,headers:this.header});
  }
  getSingleLandlordData(id:any){
    return this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/landlord/user/${id}`,{withCredentials:true,headers:this.header});
  }
  updateLandlordData(data:any,id:any ){
    return this.http.put(`https://c8bltjmv-3000.inc1.devtunnels.ms/landlord/user/${id}`,data,{withCredentials:true,headers:this.header});
  }
  fineAdditionData(data:any,id:any){
    return this.http.post(`https://c8bltjmv-3000.inc1.devtunnels.ms/rent-bill/bill/${id}`,data,{withCredentials:true,headers:this.header});
  }
  paymentBillData(data:any,id:any){
    return this.http.put(`https://c8bltjmv-3000.inc1.devtunnels.ms/rent-bill/bill/${id}`,data,{withCredentials:true,headers:this.header});
  }
}
