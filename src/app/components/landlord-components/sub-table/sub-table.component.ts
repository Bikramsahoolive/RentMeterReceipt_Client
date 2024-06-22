import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-sub-table',
  templateUrl: './sub-table.component.html',
  styleUrls: ['./sub-table.component.css']
})
export class SubTableComponent {
  searchTerm:any='';
datalist:any;
userMessage:undefined | string;
confirm:boolean|undefined;
totalLength:any;
page:number=1
userService:any;
constructor(private landlordServ:LandlordService ,private spinner:NgxSpinnerService, private toster:ToastrService){
}
  userDetails(data:any)
  {
    
  }
  ngOnInit(){
    this.spinner.show();
    this.landlordServ.getAllRentBillData().subscribe({
      next:(res:any)=>{
        res = res.reverse();
          this.datalist=res;
      },
      error:(err)=>{
        console.log(err.error);
      },
      complete:()=>{
        this.spinner.hide();
      }
    })
  }
  deleteData(id:number)
  {
    let confirmDelete = confirm("Are You Sure! This Action Is irreversible.");
    if(confirmDelete){
      this.spinner.show();
      this.landlordServ.deleteRentBillData(id).subscribe({
        next:(res:any)=>{
          this.ngOnInit();
          this.toster.success(`${res.message}`,'success');
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
      this.datalist.reverse();
    }
    if(selector==="1"){
      this.datalist.reverse();
    }
  }

  openSearch(box:any,input:any){
    console.log(input);
   
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
