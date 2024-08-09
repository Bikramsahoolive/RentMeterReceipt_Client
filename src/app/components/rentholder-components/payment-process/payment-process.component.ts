import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-process',
  templateUrl: './payment-process.component.html',
  styleUrls: ['./payment-process.component.css']
})
export class PaymentProcessComponent {


  constructor(private spinner:NgxSpinnerService,private landlordServ:LandlordService,private router:Router, private route:ActivatedRoute){}


  ngOnInit(){

    let date= new Date();
    let year = date.getFullYear();
    let month =(date.getMonth()+1).toString().padStart(2,'0');
    let day = date.getDate().toString().padStart(2,'0');
    const payment_date=`${day}-${month}-${year}`;

    let urlid = this.route.snapshot.paramMap.get('id')||"";


    this.landlordServ.verifyPayment(urlid,payment_date).subscribe({
      next:(responce:any)=>{
        Swal.fire({
          title:"Payment Done",
          text:"Bill Payment Completed.",
          icon:"success",
          showConfirmButton:true
        })
        .then(()=>{
          
            this.router.navigate([`print-rent-bill/${responce.billId}`]);
          
        })
        
      },error:(err)=>{
        console.log(err.error);
      }
    })

  }
  


}
