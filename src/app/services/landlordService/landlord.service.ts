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
}
