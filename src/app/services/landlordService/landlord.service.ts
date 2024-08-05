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


  createOrder(data:any){
    return this.http.post(`${environment.apiUrl}/create-order`,data,{withCredentials:true,headers:this.header});
  }

  payWithRazorpay(data:any){
    const options:any={
      key:environment.razorpay_ket,
      amount:data.amount,
      currency:data.currency,
      name:data.name,
      order_id:data.id,
      handler:(resp:any)=>{
        // console.log(resp.razorpay_payment_id);
        let date= new Date();
        let year = date.getFullYear();
        let month =(date.getMonth()+1).toString().padStart(2,'0');
        let day = date.getDate().toString().padStart(2,'0');
        const payment_date=`${day}-${month}-${year}`;
        this.spinner.show();
        this.http.post(`${environment.apiUrl}/rent-bill/capture-payment`,{paymentId :resp.razorpay_payment_id,paymentDate:payment_date},{withCredentials:true,headers:this.header}).subscribe({
          next:(res:any)=>{
            console.log(res);
            this.router.navigate([`print-rent-bill/${data.notes.billId}`]);
          },error:(err)=>{
            console.log(err);
          }
        })
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
