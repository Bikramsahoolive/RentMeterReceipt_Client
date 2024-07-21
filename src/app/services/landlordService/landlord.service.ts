import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { landlordData, rentBillData, rentholderData } from 'src/app/model/data';
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


  createOrder(data:any){
    return this.http.post(`${environment.apiUrl}/create-order`,data,{withCredentials:true,headers:this.header});
  }

  payWithRazorpay(data:any){
    const options:any={
      key:environment.razorpay_ket,
      amount:data.amount * 100,
      currency:data.currency,
      name:data.name,
      description:data.description,
      order_id:data.orderId,
      handler:(resp:any)=>{
        console.log(resp);
      },
      prefill:{
        email:data.email,
        contact:data.phone
      },
      theme:{
        color:"#7373f3"
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  }


}
