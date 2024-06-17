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
  ngOnInit(){
    this.spinner.show();
    let date= new Date();
    let year = date.getFullYear();
    let month =(date.getMonth()+1).toString().padStart(2,'0');
    let day = date.getDate();
    this.dToday=`${year}-${month}-${day}`;
    // console.log(this.dToday);

    this.landlordServ.getAllRentholder().subscribe({
      next:(res)=>{
        this.users=res;
      },
      error:(err)=>{
        this.toster.error(`${err.error.text}`);
        this.spinner.hide();
      },
      complete:()=>{
        this.spinner.hide();
      }
    })

  }
  getRent(id:any){
    this.spinner.show();
   let arrayUser= this.users.filter((element:any)=>{
      if(element.id == id)
      return element;
    });
    let user = arrayUser[0];
    this.rentval=user.rent;
    this.name= user.name;
    this.usetId=user.id;
    this.spinner.hide();
  }

  createRentBill(form:NgForm){
    this.spinner.show();
    let data = form.value;
    data.consumer_Name = this.name;
    data.rentholder_id=this.usetId;
    if(data.rent_status=='paid')data.rent=0;
    delete data.rent_status;
    this.landlordServ.createRentBill(data).subscribe({
      next:(res:any)=>{
        this.toster.success(`${res.message}`,'Success');
        form.reset();
        this.route.navigate([`/print-rent-bill/${res.id}`]);
      },
      error:(err)=>{
        console.error(err.error);
        this.toster.error(`${err.error.text}`,'Error');
        this.spinner.hide();
      },
      complete:()=>{
        this.spinner.hide();
      }
    });
  }

}
