import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { rentBillData } from 'src/app/model/data';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import { RentholderServiceService } from 'src/app/services/rentholderService/rentholder-service.service';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent {

  searchTerm:any='';
  isTableDataAvailable:boolean=false;
  datalist:rentBillData[]=[
    {
      adjustUnit: 0,
      billingDate: '',
      bill_period:'',
      consumer_Name: '',
      currentUnit: 0,
      dueAmount: 0,
      dueDate: '',
      eBill: 0,
      split_ebill:'',
      electric_status: '',
      final_amt: 0,
      id: '',
      landlord_id: '',
      landlord_name: '',
      paid_amt: 0,
      payment_date: '',
      payment_method:'',
      perunit: 0,
      previousUnit: 0,
      rent: 0,
      rentholder_id: '',
      totalAmount: 0,
      totalUnit: 0,
      unitAdv: 0,
      water_bill: 0,
      maintenance:0,
      service:0
    }
  ];
  reserveData:rentBillData[]=[
    {
      adjustUnit: 0,
      billingDate: '',
      bill_period:'',
      consumer_Name: '',
      currentUnit: 0,
      dueAmount: 0,
      dueDate: '',
      eBill: 0,
      split_ebill:'',
      electric_status: '',
      final_amt: 0,
      id: '',
      landlord_id: '',
      landlord_name: '',
      paid_amt: 0,
      payment_date: '',
      payment_method:'',
      perunit: 0,
      previousUnit: 0,
      rent: 0,
      rentholder_id: '',
      totalAmount: 0,
      totalUnit: 0,
      unitAdv: 0,
      water_bill: 0,
      maintenance:0,
      service:0
    }
  ];
  userMessage:undefined | string;
  confirm:boolean|undefined;
  totalLength:any;
  page:number=1
  userService:any;
  isUnpaidFilter:boolean=false;
  isPaidFilter:boolean=false;
  constructor(private rentholderServe:RentholderServiceService ,private spinner:NgxSpinnerService, private toster:ToastrService){
  }
    userDetails(data:any)
    {
      
    }
    ngOnInit(){
      this.spinner.show();
      this.rentholderServe.getAllRentBillData().subscribe({
        next:(res:rentBillData[])=>{
            this.isTableDataAvailable=true;
            res=res.reverse();
            this.datalist=res;
            this.reserveData=res;
           this.spinner.hide();
        },
        error:(err)=>{
          console.log(err.error);
          this.toster.error(err.error.text,"",{progressBar:true,positionClass:"toast-top-center"});
          this.spinner.hide();
        }
      })
    }
  
    dataFilter(selector:string)
    {
  
      if(selector==="0"){
        this.datalist=this.reserveData;
      }
      else if(selector==="1"){
        //unpaid
        this.isUnpaidFilter= true;
        let usersVal:any = [];
        this.reserveData.forEach((element:any)=>{
          if(element.final_amt !== element.paid_amt){
            usersVal.push(element);
          }
        });
        
        this.datalist = usersVal;
      }else
      if(selector==="2"){
        //paid
        if(this.isUnpaidFilter){
          this.isUnpaidFilter=false;
        }
        this.isPaidFilter= true;
        let usersVal:any = [];
        this.reserveData.forEach((element:any)=>{
          if(element.final_amt === element.paid_amt){
            usersVal.push(element);
          }
        });
        this.datalist = usersVal;
      }
    }
  
    openSearch(box:any,input:any){
      // console.log(input);
     
      box.classList.forEach((item:string)=>{
        
          if (item==='open' && input.value==""){
  
            input.classList.add('hide')
  
            setTimeout(()=>input.classList.add('hide'),800)
            
            box.classList.remove('open');
          }else{
            box.classList.add('open');
            setTimeout(() => {
              input.classList.remove('hide');
              input.focus();
            }, 800);
          }
        
      
      });
    }
  
    copyBillId(btn:any,id:any){
      navigator.clipboard.writeText(id)
      .then(() => {
        btn.classList = 'fa-solid fa-check';
        setTimeout(()=>{
          btn.classList = 'fa-regular fa-copy';
        },3000)
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
}
