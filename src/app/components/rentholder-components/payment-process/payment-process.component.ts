import { Component, ViewChild,ElementRef } from '@angular/core';
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

  @ViewChild('process')process!:ElementRef;
  @ViewChild('success')success!:ElementRef;
  @ViewChild('failure')failure!:ElementRef;

  ngOnInit(){



    let urlid = this.route.snapshot.paramMap.get('id')||"";
    
    this.landlordServ.verifyPayment(urlid).subscribe({
      next:(responce:any)=>{

        if (responce.status==='success'){
          this.process.nativeElement.style.display ="none";
          this.success.nativeElement.style.display = "block";


          setTimeout(()=>{
            this.router.navigate([`print-rent-bill/${responce.billId}`]);
          },5000);
        }  
        
      },error:(err)=>{
        console.log(err.error);

          this.process.nativeElement.style.display ="none";
          this.failure.nativeElement.style.display = "block";

          setTimeout(()=>{
            this.router.navigate(['dashbord-rentholder']);
          },5000);
        
      }
    });
    }

  
  
}
