import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr'
import { rentBillData } from 'src/app/model/data';
import Swal from 'sweetalert2';
import { environment } from 'src/environment';
import { utils, writeFileXLSX } from 'xlsx';
import * as search from '../../../pipes/search.pipe';

@Component({
  selector: 'app-sub-table',
  templateUrl: './sub-table.component.html',
  styleUrls: ['./sub-table.component.css']
})
export class SubTableComponent {
  searchTerm:any='';
  Reesul:any = search;
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
    maintenance:0
  }
];
filterType:string="";
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

        res.forEach((e:any)=>{
          delete e.landlord_id;
          delete e.landlord_name;
          delete e.totalAmount;
          delete e.totalUnit;
        });

        res = res.reverse();
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7373f3",
      cancelButtonColor: "#6e7881",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm:true,
      preConfirm: async (val)=>{
        
        if(val){

          try {
            const response = await fetch(`${environment.apiUrl}/rent-bill/bill/${id}`,{
              method:'DELETE',
              credentials:'include'
            })
          if(response.ok){
            Swal.fire({
              title: "Deleted!",
              text: "Bill data has been deleted.",
              icon: "success"
            }).then(()=>{
              filter.value='0';
            this.datalist=[];
            this.ngOnInit();
            })
          }
          } catch (error) {
            return Swal.showValidationMessage(`
              "Error! Try Again."
            `)
          }
        }
      },
      allowOutsideClick:() => !Swal.isLoading()
    });
  }
oldToNew:boolean=false;
 async dataFilter(selector:string)
  {
    if(selector==="0"){
      this.filterType = "New to Old Bills";
      this.ngOnInit();
    }else
    if(selector==="1"){
      this.filterType = "Old to New Bills";
      this.reverseData();
    }else
    if(selector==="2"){
      this.filterType = "Unpaid Bills";
      this.unpaidData();
    }else
    if(selector==="3"){
      this.filterType = "Paid Bills";
      this.paidData();
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

  downloadXlsFile(){
    Swal.fire({
      title:"Export As XLS",
      text:"Download Your Excel Data.",
      icon:"question",
      showCloseButton:true,
      confirmButtonText:"Download"
    })
    .then((res)=>{
      if(res.isConfirmed){
        
        try {
          
    let sheetType:string="All Data";
    let sheetData=this.datalist;
    if(this.filterType!==""){
      sheetType = this.filterType;
    }
    if(this.searchTerm!==""){
      let classget = new search.SearchPipe;
      sheetData = classget.transform(this.datalist,this.searchTerm);
    }
    const worksheet = utils.json_to_sheet(sheetData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet,sheetType);
    let fileName = `Rent_Bill_DataSheet${Math.floor(Math.random()*1000000)}.xlsx`
    writeFileXLSX(workbook,fileName);

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Excel File Exported."
    });
          
        } catch (error) {
          console.log(error);
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon:"error",
            title: "Error! Please Try Again."
          }); 
        }
      }
    });
  }
}
