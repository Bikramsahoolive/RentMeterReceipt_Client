import { Component, Renderer2 } from '@angular/core';
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
    payment_method:'',
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
    payment_method:'',
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
isPaidFilter:boolean=false;
constructor( private render:Renderer2,private landlordServ:LandlordService ,private spinner:NgxSpinnerService, private toster:ToastrService){
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

  reverseData() {
  this.spinner.show();
  this.landlordServ.getAllRentBillData().subscribe({
    next:(res:rentBillData[])=>{
      this.isTableDataAvailable = true;
        this.datalist=res;
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

unpaidData() {
  this.spinner.show();
  this.landlordServ.getAllRentBillData().subscribe({
    next:(res:rentBillData[])=>{
      this.isTableDataAvailable = true;
      res=res.reverse();
      let usersVal:any = [];
      res.forEach((element:any)=>{
        if(element.final_amt !== element.paid_amt){
          usersVal.push(element);
        }
      });
      this.datalist = usersVal;
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


paidData() {
  this.spinner.show();
  this.landlordServ.getAllRentBillData().subscribe({
    next:(res:rentBillData[])=>{
      this.isTableDataAvailable = true;
      res=res.reverse();
      let usersVal:any = [];
      res.forEach((element:any)=>{
        if(element.final_amt === element.paid_amt){
          usersVal.push(element);
        }
      });
      this.datalist = usersVal;
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
oldToNew:boolean=false;
 async dataFilter(selector:string)
  {

    if(selector==="0"){
      //new to old
      // if(this.isUnpaidFilter || this.isPaidFilter){
      //   this.isUnpaidFilter = false;
      //   this.isPaidFilter=false;
      //   this.oldToNew=false;
      //   this.datalist= this.reserveData;
      //   return;
      // }
      this.ngOnInit();
    }else
    if(selector==="1"){
      //old to new
      // this.oldToNew=true;
      // if(this.isUnpaidFilter || this.isPaidFilter){
      //   this.isUnpaidFilter = false;
      //   this.isPaidFilter=false;
      // }
      this.reverseData();
    }else
    if(selector==="2"){
      //unpaid bills
      this.unpaidData();
      // if(this.isPaidFilter){
      //   this.isPaidFilter=false;
      //   // this.datalist=this.reserveData;
      // }
      // // if(this.oldToNew){
      // //   this.oldToNew=false;
      // //   this.reserveData.reverse();
      // // }
      // this.isUnpaidFilter= true;
      // let usersVal:any = [];
      // this.datalist.forEach((element:any)=>{
      //   if(element.final_amt !== element.paid_amt){
      //     usersVal.push(element);
      //   }
      // });
      // this.datalist = usersVal;
    }else
    if(selector==="3"){
      //paid bills

      this.paidData();
      // await this.ngOnInit();
      // if(this.isUnpaidFilter){
      //   this.isUnpaidFilter=false;
      //   // this.datalist=this.reserveData;
      // }
      // // if(this.oldToNew){
      // //   this.oldToNew=false;
      // //   this.reserveData.reverse();
      // // }

      // this.isPaidFilter= true;
      // let usersVal:any = [];
      // this.datalist.forEach((element:any)=>{
      //   if(element.final_amt === element.paid_amt){
      //     usersVal.push(element);
      //   }
      // });
      // this.datalist = usersVal;
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
  showErrorMsg(event:Event){
    const clickedElement = event.target as HTMLElement;
    const nextSibling = clickedElement.nextElementSibling;
    if(nextSibling){
      this.render.setStyle(nextSibling,"display",'block');
    }
  }
  hiderrorMsg(event:Event){
    const clickedElement = event.target as HTMLElement;
    const nextSibling = clickedElement.nextElementSibling;
    if(nextSibling){
      this.render.setStyle(nextSibling,"display",'none');
    }
  }
}
