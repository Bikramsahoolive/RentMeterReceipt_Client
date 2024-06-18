import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';

@Component({
  selector: 'app-print-rent-bill',
  templateUrl: './print-rent-bill.component.html',
  styleUrls: ['./print-rent-bill.component.css']
})
export class PrintRentBillComponent {
  constructor(private route:ActivatedRoute, private landlordServ:LandlordService, private spinner:NgxSpinnerService){}
paramId:any='';
bill:any;
upiLink:any;
landlordSign:any="";
  ngOnInit(){
    this.spinner.show();
      let urlid = this.route.snapshot.paramMap.get('id');
    this.landlordServ.getSingleRentBillData(urlid).subscribe({
      next:(res:any)=>{
        this.bill=res;
        this.landlordServ.getLandlordData(res.landlord_id).subscribe({
          next:(res:any)=>{
            if(res.id){
            this.upiLink=`upi://pay?pa=${res.upi}&pn=${res.name}&am=${this.bill.final_amt}.00&cu=INR&tn=RNMR:${this.bill.id}`;
            this.landlordSign=res.signature ? res.signature:"../../../../assets/images.png";
            }
          },
          error:(err)=>{
            console.log(err.error);
            
          },
          complete:()=>{
            this.spinner.hide();
          }
        });
      },
      error:(err)=>{
        console.log(err.error);
      }
    });
    
  }
  
  print(){
    window.print();
  }
}
