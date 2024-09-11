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
  // header= new HttpHeaders({
  //   'Content-Type':'application/json',
  //   // 'api_key':''
  // })
  addRentHolder(data:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
   return this.http.post(`${environment.apiUrl}/rentholder`,data,{withCredentials:true,headers:header});
  }
  getAllRentholder(){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.get<[rentholderData]>(`${environment.apiUrl}/rentholder/landlord`,{withCredentials:true,headers:header});
  }
  createRentBill(data:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.post(`${environment.apiUrl}/rent-bill`,data,{withCredentials:true,headers:header});
  }
  getAllRentBillData(){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.get<[rentBillData]>(`${environment.apiUrl}/rent-bill/landlord`,{withCredentials:true,headers:header});
  }
  deleteRentBillData(id:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.delete(`${environment.apiUrl}/rent-bill/bill/${id}`,{withCredentials:true,headers:header});
  }
  getSingleRentBillData(id:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.get<rentBillData>(`${environment.apiUrl}/rent-bill/bill/${id}`,{withCredentials:true,headers:header});
  }
  getLandlordData(id:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.get<landlordData>(`${environment.apiUrl}/landlord/user/${id}`,{withCredentials:true,headers:header});
  }
  deleteRentHolderData(id:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.delete(`${environment.apiUrl}/rentholder/user/${id}`,{withCredentials:true,headers:header});
  }
  updateLandlordData(data:any,id:any ){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.put(`${environment.apiUrl}/landlord/user/${id}`,data,{withCredentials:true,headers:header});
  }
  fineAdditionData(data:any,id:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.post(`${environment.apiUrl}/rent-bill/bill/${id}`,data,{withCredentials:true,headers:header});
  }
  paymentBillData(data:any,id:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.put(`${environment.apiUrl}/rent-bill/bill/${id}`,data,{withCredentials:true,headers:header});
  }
  deleteLandlordData(id:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.delete(`${environment.apiUrl}/landlord/user/${id}`,{withCredentials:true,headers:header});
  }

  landlordPayout(data:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.post(`${environment.apiUrl}/landlord/payout`,data,{withCredentials:true,headers:header});
  }

  getLandlordPayoutProcessed(){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.get(`${environment.apiUrl}/landlord/payout`,{withCredentials:true,headers:header});
  }

  checklandlordPayout(id:string){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.get(`${environment.apiUrl}/landlord/check-payout/${id}`,{withCredentials:true,headers:header});
  }
  generateChallenge(){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.get(`${environment.apiUrl}/landlord/reg-challenge`,{withCredentials:true,headers:header});
  }
  verifyChallenge(data:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.post(`${environment.apiUrl}/landlord/verify-challenge`,data,{withCredentials:true,headers:header});
  }
  unregesterLandlordPasskey(id:string){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.delete(`${environment.apiUrl}/landlord/unregd-passkey/${id}`,{withCredentials:true,headers:header});
  }
  createOrder(data:any){
    const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
    return this.http.post(`${environment.apiUrl}/rent-bill/create-order`,data,{withCredentials:true,headers:header});
  }
 verifyPayment(paymentId:string){
  const token = localStorage.getItem('auth-token')||'';
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'auth-token':token
    });
  return this.http.post(`${environment.apiUrl}/rent-bill/verify-payment`,{paymentId},{withCredentials:true,headers:header});
 }


}
