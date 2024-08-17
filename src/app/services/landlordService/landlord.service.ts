import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { landlordData, rentBillData, rentholderData } from 'src/app/model/data';
import { environment } from 'src/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class LandlordService {

  constructor(private http : HttpClient, private router : Router,private spinner:NgxSpinnerService) { }
  header= new HttpHeaders({
    'Content-Type':'application/json',
    // 'api_key':''
  })
  addRentHolder(data:any){
   return this.http.post(`${environment.apiUrl}/rentholder`,data,{withCredentials:true,headers:this.header});
  }
  getAllRentholder(){
    return this.http.get<[rentholderData]>(`${environment.apiUrl}/rentholder/landlord`,{withCredentials:true,headers:this.header});
  }
  createRentBill(data:any){
    return this.http.post(`${environment.apiUrl}/rent-bill`,data,{withCredentials:true,headers:this.header});
  }
  getAllRentBillData(){
    return this.http.get<[rentBillData]>(`${environment.apiUrl}/rent-bill/landlord`,{withCredentials:true,headers:this.header});
  }
  deleteRentBillData(id:any){
    return this.http.delete(`${environment.apiUrl}/rent-bill/bill/${id}`,{withCredentials:true,headers:this.header});
  }
  getSingleRentBillData(id:any){
    return this.http.get<rentBillData>(`${environment.apiUrl}/rent-bill/bill/${id}`,{withCredentials:true,headers:this.header});
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

  landlordPayout(data:any){
    return this.http.post(`${environment.apiUrl}/landlord/payout`,data,{withCredentials:true,headers:this.header});
  }

  getLandlordPayoutProcessed(){
    return this.http.get(`${environment.apiUrl}/landlord/payout`,{withCredentials:true,headers:this.header});
  }

  checklandlordPayout(id:string){
    return this.http.get(`${environment.apiUrl}/landlord/check-payout/${id}`,{withCredentials:true,headers:this.header});
  }
  generateChallenge(){
    return this.http.get(`${environment.apiUrl}/landlord/reg-challenge`,{withCredentials:true,headers:this.header});
  }
  verifyChallenge(data:any){
    return this.http.post(`${environment.apiUrl}/landlord/verify-challenge`,data,{withCredentials:true,headers:this.header});
  }
  // unregesterLandlordPasskey(id:string){
  //   return this.http.post(`${environment.apiUrl}/landlord/unregister-passkey/${id}`,{withCredentials:true,headers:this.header});
  // }
  createOrder(data:any){
    return this.http.post(`${environment.apiUrl}/create-order`,data,{withCredentials:true,headers:this.header});
  }
 verifyPayment(paymentId:string,paymentDate:string){
  return this.http.post(`${environment.apiUrl}/rent-bill/verify-payment`,{paymentId,paymentDate},{withCredentials:true,headers:this.header});
 }


}
