import { Component ,ViewChild, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router'
import { rentBillData } from 'src/app/model/data';

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
  ebillStatus:string='';
  isRentholderChoosen:boolean = true;
  @ViewChild('mainMeter') mainMeter!: ElementRef;
  @ViewChild('subMeter') subMeter!: ElementRef;
  @ViewChild('perUnit') perUnit!: ElementRef;
  @ViewChild('elcAmt') elcAmt!: ElementRef;
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
      this.ebillStatus='';
      this.isRentholderChoosen=true;
      this.name ='';
      this.mainMeter.nativeElement.classList.add('hide');
      this.subMeter.nativeElement.classList.add('hide');
      this.perUnit.nativeElement.classList.add('hide');
      this.elcAmt.nativeElement.classList.add('hide');
      this.isElcBillPaid=false;
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
    this.previousUnit=user.current_unit;
    this.landlordServ.getAllRentBillData().subscribe({
      next:(res:rentBillData[])=>{
          let current = res.filter((e:any)=>{
            if (e.rentholder_id === id) {return e;}
          });
          if (current.length >0){
            let cLength = current.length-1;
          this.previousUnit = current[cLength].currentUnit;
          }else{
            this.previousUnit=user.current_unit;
          }
          this.isRentholderChoosen=false;
          this.spinner.hide();
      },
      error:(err)=>{
        this.spinner.hide();
        console.log(err.error);
        this.isRentholderChoosen=false;
        if(err.error.status !==false){
          this.toster.error(`Something wents wrong`,"Error",{positionClass:"toast-top-center",progressBar:true});
        }
      },
      complete:()=>{
        this.isRentholderChoosen=false;
      }
    })

    
  }

  createRentBill(form:NgForm){
    if(this.name ===""){
      this.toster.info(`Choose Rentholder. `,'Invalid Bill Data.',{positionClass:"toast-top-center",progressBar:true});
      return;
    }
    let data = form.value;
    if (data.rent_status ===''){
      this.toster.info(`Choose Rent Status. `,'Invalid Bill Data.',{positionClass:"toast-top-center",progressBar:true});
      return;
    }
    if(data.electric_status===''){
      this.toster.info(`Choose Electric Bill Status. `,'Invalid Bill Data.',{positionClass:"toast-top-center",progressBar:true});
      return;
    }
    data.consumer_Name = this.name;
    data.rentholder_id=this.usetId;
    if(data.rent_status=='paid')data.rent=0;
    if(data.adjustUnit===null || data.adjustUnit==='')data.adjustUnit=0;
    if(data.dueAmount===null || data.dueAmount==='')data.dueAmount=0;
    if(data.water_bill==="" || data.water_bill===null)data.water_bill=0;
    if(data.electric_status==="pa"){
      data.eBill=0;
      data.totalAmount=0;
      data.totalUnit=0;
      data.perunit=0;
      data.adjustUnit=0;
      data.currentUnit=null;
    }
    if(data.electric_status==="mmbd"){
      if(data.totalAmount ==="" || data.totalAmount ===null|| data.totalUnit===''||data.totalUnit===null||data.currentUnit===""||data.currentUnit===null){
        this.toster.info('Fill bill details.','Invalid Bill Data.',{positionClass:"toast-top-center",progressBar:true});
        return;
      }
      if(data.totalAmount<1 || data.totalUnit<1){
        this.toster.info('Enter Valid Main Bill Amount and Unit.','Invalid Bill Data.',{positionClass:"toast-top-center",progressBar:true});
        return;
      }
      data.eBill=0;
      data.perunit=0;

    }
    if(data.electric_status==="pu"){
      if(data.perunit===""||data.perunit===null||data.currentUnit===""||data.currentUnit===null){
        this.toster.info('Fill bill details.','Invalid Bill Data.',{positionClass:"toast-top-center",progressBar:true});
        return;
      }
      if(data.perunit<1){
        this.toster.info('Enter Valid Per Unit Amount','Invalid Bill Data.',{positionClass:"toast-top-center",progressBar:true});
        return;
      }
      data.eBill=0;
      data.totalAmount=0;
      data.totalUnit=0;
    }
    if(data.electric_status==='am'){
      if(data.eBill===""||data.eBill===null){
        this.toster.info('Fill bill details.','Invalid Bill Data.',{positionClass:"toast-top-center",progressBar:true});
        return;
      }
      if(data.eBill<1){
        this.toster.info('Enter Valid Electric Bill Amount','Invalid Bill Data.',{positionClass:"toast-top-center",progressBar:true});
        return;
      }
      data.totalAmount=0;
      data.totalUnit=0;
      data.perunit=0;
      data.adjustUnit=0;
      data.currentUnit=null;
    }
    delete data.rent_status;
    
    if(data.water_bill<0){
  this.toster.info('Enter Valid Water Bill Amount.','Invalid Bill Data.',{positionClass:"toast-top-center",progressBar:true});
  return;
}

    this.spinner.show();
    this.landlordServ.createRentBill(data).subscribe({
      next:(res:any)=>{
        // console.log(res);
        if(res.status){
          form.reset();
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
isElcBillPaid:boolean=false;
  showElc(selectElc:any){
    
    switch(selectElc.value){
      case '':
        this.mainMeter.nativeElement.classList.add('hide');
        this.subMeter.nativeElement.classList.add('hide');
        this.perUnit.nativeElement.classList.add('hide');
        this.elcAmt.nativeElement.classList.add('hide');
        this.isElcBillPaid=false;
      break;
      case 'pa':
        this.mainMeter.nativeElement.classList.add('hide');
        this.subMeter.nativeElement.classList.add('hide');
        this.perUnit.nativeElement.classList.add('hide');
        this.elcAmt.nativeElement.classList.add('hide');
        this.isElcBillPaid=true;
      break;
      case 'mmbd':
        this.mainMeter.nativeElement.classList.remove('hide');
        this.subMeter.nativeElement.classList.remove('hide');
        this.perUnit.nativeElement.classList.add('hide');
        this.elcAmt.nativeElement.classList.add('hide');
        this.isElcBillPaid=false;
      break;
      case 'pu':
        this.mainMeter.nativeElement.classList.add('hide');
        this.subMeter.nativeElement.classList.remove('hide');
        this.perUnit.nativeElement.classList.remove('hide');
        this.elcAmt.nativeElement.classList.add('hide');
        this.isElcBillPaid=false;
      break;
      case 'am':
        this.mainMeter.nativeElement.classList.add('hide');
        this.subMeter.nativeElement.classList.add('hide');
        this.perUnit.nativeElement.classList.add('hide');
        this.elcAmt.nativeElement.classList.remove('hide');
        this.isElcBillPaid=false;
      break;
    }

  }

}
