import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr'
import { rentBillData } from 'src/app/model/data';

@Component({
  selector: 'app-sub-table',
  templateUrl: './sub-table.component.html',
  styleUrls: ['./sub-table.component.css']
})
export class SubTableComponent {
  searchTerm:any='';
datalist:rentBillData[]=[
  {
    adjustUnit: 0,
    billingDate: '',
    consumer_Name: '',
    currentUnit: 0,
    dueAmount: 0,
    dueDate: '',
    eBill: 0,
    electric_status: '',
    final_amt: 0,
    id: '',
    landlord_id: '',
    landlord_name: '',
    paid_amt: 0,
    payment_date: '',
    perunit: 0,
    previousUnit: 0,
    rent: 0,
    rentholder_id: '',
    totalAmount: 0,
    totalUnit: 0,
    unitAdv: 0,
    water_bill: 0
  }
];

reserveData:rentBillData[]=[
  {
    adjustUnit: 0,
    billingDate: '',
    consumer_Name: '',
    currentUnit: 0,
    dueAmount: 0,
    dueDate: '',
    eBill: 0,
    electric_status: '',
    final_amt: 0,
    id: '',
    landlord_id: '',
    landlord_name: '',
    paid_amt: 0,
    payment_date: '',
    perunit: 0,
    previousUnit: 0,
    rent: 0,
    rentholder_id: '',
    totalAmount: 0,
    totalUnit: 0,
    unitAdv: 0,
    water_bill: 0
  }
];
isTableDataAvailable:boolean=false;
userMessage:undefined | string;
confirm:boolean|undefined;
totalLength:any;
page:number=1
userService:any;
isUnpaidFilter:boolean=false;
constructor(private landlordServ:LandlordService ,private spinner:NgxSpinnerService, private toster:ToastrService){
}
  userDetails(data:any)
  {
    
  }
  ngOnInit(){
    this.spinner.show();
    this.landlordServ.getAllRentBillData().subscribe({
      next:(res:rentBillData[])=>{
        this.isTableDataAvailable = true;
          res = res.reverse();
          this.datalist=res;
          this.reserveData=res;
          this.spinner.hide();
      },
      error:(err)=>{
        this.spinner.hide();
        console.log(err.error);
        if(!err.error.status){
          this.toster.info(err.error.message,'',{progressBar:true,positionClass:"toast-top-center"});
        }else{
          this.toster.error('something wents wrong.','Error',{progressBar:true,positionClass:"toast-top-center"});
        }
      }
    })
  }
  deleteData(id:number,filter:any)
  {
    let confirmDelete = confirm("This Action Is irreversible, Are you sure !");
    if(confirmDelete){
      this.spinner.show();
      this.landlordServ.deleteRentBillData(id).subscribe({
        next:(res:any)=>{
          filter.value='0';
          this.datalist=[];
          this.toster.success(`${res.message}`,'success');
          this.ngOnInit();
        },
        error:(err)=>{
          console.error(err.error);
          this.toster.error(`${err.error.text}`,'Error');
        },
        complete:()=>{this.spinner.hide();}
      });
    

    }
  }

  dataFilter(selector:string)
  {

    if(selector==="0"){
      if(this.isUnpaidFilter){
        this.isUnpaidFilter = false;
        this.datalist= this.reserveData;
        return;
      }
      this.datalist.reverse();
    }else
    if(selector==="1"){
      if(this.isUnpaidFilter){
        this.isUnpaidFilter = false;
        this.datalist= this.reserveData;
      }
      this.datalist.reverse();
    }else
    if(selector==="2"){
      this.isUnpaidFilter= true;
      let usersVal:any = [];
      this.datalist.forEach((element:any)=>{
        if(element.final_amt !== element.paid_amt){
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
