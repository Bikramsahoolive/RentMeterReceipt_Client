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
  getRentBillData(){
    return this.http.get('http://localhost:5800/rent-bill/landlord',{withCredentials:true,headers:this.header});
  }
  deleteUserData(id:any){
    return this.http.delete(`http://localhost:5800/rent-bill/bill/${id}`,{withCredentials:true,headers:this.header});
  }
}
