import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router'

@Component({
  selector: 'app-create-sub-meter',
  templateUrl: './create-sub-meter.component.html',
  styleUrls: ['./create-sub-meter.component.css']
})
export class CreateSubMeterComponent {

  constructor(private landlordServ:LandlordService,
              private spinner:NgxSpinnerService,
              private toster:ToastrService,
              private route:Router
              ){}
  dToday:any='';
  users:any;
  rentval:string='';
  name:any='';
  usetId:any='';
  previousUnit:any;
  rentStatus:string='';
  ngOnInit(){
    this.spinner.show();
    let date= new Date();
    let year = date.getFullYear();
    let month =(date.getMonth()+1).toString().padStart(2,'0');
    let day = date.getDate().toString().padStart(2,'0');
    this.dToday=`${year}-${month}-${day}`;
    // console.log(this.dToday);

    this.landlordServ.getAllRentholder().subscribe({
      next:(res:any)=>{
        if(res.status!==false){
          this.users=res;
        }
        
      },
      error:(err)=>{
        this.toster.error(`${err.error.text}`,"",{positionClass:"toast-top-center",progressBar:true});
        this.spinner.hide();
      },
      complete:()=>{
        this.spinner.hide();
      }
    })
  }
  getRent(id:any){
    if(id ===''){
      this.rentval = '';
      this.previousUnit = '';
      this.rentStatus = '';
      return;
    }
    this.spinner.show();
   let arrayUser= this.users.filter((element:any)=>{
      if(element.id == id)
      return element;
    });
    let user = arrayUser[0];
    this.rentval=user.rent;
    this.name= user.name;
    this.usetId=user.id;
    this.landlordServ.getAllRentBillData().subscribe({
      next:(res:any)=>{
        if(res.status!==false){
          let current = res.filter((e:any)=>{
            if (e.rentholder_id == id)
              return e;
          })
          if (current.length >0){
            let cLength = current.length-1;
          this.previousUnit = current[cLength].currentUnit;
          }else{
            this.previousUnit=user.current_unit;
          }
          
        }
        this.spinner.hide();
       
        
        
      },
      error:(err)=>{
        this.toster.error(`${err.error.text}`,"",{positionClass:"toast-top-center",progressBar:true});
        this.spinner.hide();
      },
      complete:()=>{
        this.spinner.hide();
      }
    })

    
  }

  createRentBill(form:NgForm){
    let data = form.value;
    data.consumer_Name = this.name;
    data.rentholder_id=this.usetId;
    if(data.rent_status=='paid')data.rent=0;
    if(data.adjustUnit===null || data.adjustUnit==='')data.adjustUnit=0;
    delete data.rent_status;
    this.spinner.show();
    form.reset();
    this.landlordServ.createRentBill(data).subscribe({
      next:(res:any)=>{
        // console.log(res);
        if(res.status){
          this.toster.success(`${res.message}`,'Success',{positionClass:"toast-top-center",progressBar:true});
          
          this.route.navigate([`/print-rent-bill/${res.id}`]);
        }

      },
      error:(err)=>{
        console.error(err.error);
        this.toster.error(`${err.error.text}`,'Error',{positionClass:"toast-top-center",progressBar:true});
        this.spinner.hide();
      },
      complete:()=>{
        this.spinner.hide();
      }
    });
  }

}
