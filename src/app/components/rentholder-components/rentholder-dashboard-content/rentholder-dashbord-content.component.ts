import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import { RentholderServiceService } from 'src/app/services/rentholderService/rentholder-service.service';

@Component({
  selector: 'app-rentholder-dashbord-content',
  templateUrl: './rentholder-dashbord-content.component.html',
  styleUrls: ['./rentholder-dashbord-content.component.css']
})
export class RentholderDashbordContentComponent {

  searchTerm:any='';
  datalist:any;
  reserveData:any;
  userMessage:undefined | string;
  confirm:boolean|undefined;
  totalLength:any;
  page:number=1
  userService:any;
  isUnpaidFilter:boolean=false;
  constructor(private rentholderServe:RentholderServiceService ,private spinner:NgxSpinnerService, private toster:ToastrService){
  }
    userDetails(data:any)
    {
      
    }
    ngOnInit(){
      this.spinner.show();
      this.rentholderServe.getAllRentBillData().subscribe({
        next:(res:any)=>{
          if(res.status !== false){
            res = res.reverse();
            this.datalist=res;
            this.reserveData=res;
          }else{
            this.toster.error('No Bill Data Found.');
          }
  
        },
        error:(err)=>{
          console.log(err.error);
        },
        complete:()=>{
          this.spinner.hide();
        }
      })
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
