import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr'
import { rentBillData } from 'src/app/model/data';
import Swal from 'sweetalert2';
import { environment } from 'src/environment';
import { utils, writeFileXLSX } from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as search from '../../../pipes/search.pipe';

@Component({
  selector: 'app-landlord-payment-history',
  templateUrl: './landlord-payment-history.component.html',
  styleUrls: ['./landlord-payment-history.component.css']
})
export class LandlordPaymentHistoryComponent {
  searchTerm:any='';
  Reesul:any = search;
datalist:any;
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

  ngOnInit(){
    this.spinner.show();
    this.landlordServ.getLandlordRentPaymentData().subscribe({
      next:(res:any)=>{
        

        this.isTableDataAvailable = true;

        res.forEach((e:any)=>{
          delete e.landlordId;
          delete e.landlordName;
          delete e.rentholderId;
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
          this.toster.error('something went wrong.','Error',{progressBar:true,positionClass:"toast-top-center"});
        }
      }
    })
  }
  hidePaginationBtn:boolean=true;
  hidePagination(){
    if(this.searchTerm !==""){
      this.hidePaginationBtn=false;
    }else{
      this.hidePaginationBtn=true;
    }
  }

  reverseData() {
  this.spinner.show();
  this.landlordServ.getLandlordRentPaymentData().subscribe({
    next:(res)=>{
      this.isTableDataAvailable = true;
        this.datalist=res;
        this.spinner.hide();
    },
    error:(err)=>{
      this.spinner.hide();
      console.log(err.error);
      if(!err.error.status){
        this.toster.error(err.error.message,'',{progressBar:true,positionClass:"toast-top-center"});
      }else{
        this.toster.error('something went wrong.','Error',{progressBar:true,positionClass:"toast-top-center"});
      }
    }
  })
}
  
oldToNew:boolean=false;
 async dataFilter(selector:string)
  {
    if(selector==="0"){
      this.filterType = "Payment History";
      this.ngOnInit();
    }else
    if(selector==="1"){
      this.filterType = "Payment History (R)";
      this.reverseData();
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

  // downloadXlsFile(){
  //   Swal.fire({
  //     title:"Export As XLS",
  //     text:"Download Your Excel Data.",
  //     icon:"question",
  //     showCloseButton:true,
  //     confirmButtonText:"Download"
  //   })
  //   .then((res)=>{
  //     if(res.isConfirmed){
        
  //       try {
          
  //   let sheetType:string="All Rent Bills";
  //   let sheetData=this.datalist;
  //   if(this.filterType!==""){
  //     sheetType = this.filterType;
  //   }
  //   if(this.searchTerm!==""){
  //     sheetType = "Custom Rent Bills";
  //     let classget = new search.SearchPipe;
  //     sheetData = classget.transform(this.datalist,this.searchTerm);
  //   }
  //   const worksheet = utils.json_to_sheet(sheetData);
  //   const workbook = utils.book_new();
  //   utils.book_append_sheet(workbook, worksheet,sheetType);
  //   let fileName = `Rent_Bill_DataSheet${Math.floor(Math.random()*1000000)}.xlsx`;
  //   writeFileXLSX(workbook,fileName);

  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: "top",
  //     showConfirmButton: false,
  //     timer: 5000,
  //     timerProgressBar: true,
  //     didOpen: (toast) => {
  //       toast.onmouseenter = Swal.stopTimer;
  //       toast.onmouseleave = Swal.resumeTimer;
  //     }
  //   });
  //   Toast.fire({
  //     icon: "success",
  //     title: "File Exported as XLS."
  //   });
          
  //       } catch (error) {
  //         console.log(error);
  //         const Toast = Swal.mixin({
  //           toast: true,
  //           position: "top",
  //           showConfirmButton: false,
  //           timer: 5000,
  //           timerProgressBar: true,
  //           didOpen: (toast) => {
  //             toast.onmouseenter = Swal.stopTimer;
  //             toast.onmouseleave = Swal.resumeTimer;
  //           }
  //         });
  //         Toast.fire({
  //           icon:"error",
  //           title: "Error! Please Try Again."
  //         }); 
  //       }
  //     }
  //   });
  // }

  downloadPdfFile(){
    Swal.fire({
      title:"Export As PDF",
      text:"Download Your PDF File.",
      icon:"question",
      showCloseButton:true,
      confirmButtonText:"Download"
    })
    .then((res)=>{
      if(res.isConfirmed){
        try {
          let sheetType:string="Payment History";
          let sheetData=this.datalist;
          if(this.filterType!==""){
            sheetType = this.filterType;
          }
          if(this.searchTerm!==""){
            sheetType = "Custom Payment History";
            let classget = new search.SearchPipe;
            sheetData = classget.transform(this.datalist,this.searchTerm);
          }
          
          const doc = new jsPDF({orientation:"landscape",});
          const title = sheetType;
          const pageWidth = doc.internal.pageSize.getWidth();
          const textWidth = doc.getTextWidth(title);
          const textX = (pageWidth - textWidth)/2;

          doc.text(title,textX,10);
          const cols = ['Bill ID','Name','Bill Date','Bill Amount','Paid Amount','Balance','Method','Payment Date','Txn Id','Payment ID']
          const rows = sheetData.map((e: { billId: any; consumerName: any; billDate: any; billAmount: any; paidAmount: any;remainingAmount:any; paymentMethod: any; paymentDate: any; transactionId: any; id: any; })=>[e.billId,e.consumerName,e.billDate,e.billAmount,e.paidAmount,e.remainingAmount,e.paymentMethod,e.paymentDate,e.transactionId,e.id]);
          (doc as any).autoTable({
            head:[cols],
            body:rows,
            startY:15
          });
          let fileName = `payment_history${Math.floor(Math.random()*1000000)}.pdf`;
          doc.save(fileName);
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
            icon:"success",
            title: "File Exported as PDF."
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
    })

  }
}
