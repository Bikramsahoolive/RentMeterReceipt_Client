import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import{NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-rent-holder',
  templateUrl: './add-rent-holder.component.html',
  styleUrls: ['./add-rent-holder.component.css']
})
export class AddRentHolderComponent {

  constructor(private router:Router, private addRentService:LandlordService, private spinner:NgxSpinnerService,private toster:ToastrService){}

  deedFileUrl:string='';
  photoFile:string='';

  totalRentholderCount:number=0;
  rentholderCanRegister:number=0;

  ngOnInit(){
    this.getRentholderCountData();
  }

  getRentholderCountData(){
    const token = localStorage.getItem('connect.sid')||'';
    const user = JSON.parse(atob(token));
    this.addRentService.getLandlordData(user.id).subscribe({
      next:(res:any)=>{
        this.totalRentholderCount=res.rcrCount;
        

        this.addRentService.getAllRentholder().subscribe({
          next:(resp:any)=>{
            this.rentholderCanRegister=res.rcrCount - resp.length;
            
          }
        });
      }
    });
  }

  fileInput(event:any,type:string,inputField:any){
    this.spinner.show();
    const file = event.target.files[0];
    if (file){
      let extention = file.name.split(".");
      // console.log(extention[1]);
      if(type==='photo'){
        if(extention[1] =="jpg"|| extention[1]==='png' || extention[1]==="jpeg"){
        }else{
          this.spinner.hide();
    inputField.value="";
    this.toster.error('Only JPG, JPEG, PNG alowed.',`Invalid file type.`,{progressBar:true,positionClass:"toast-top-center"});
          return;
        }
        if(file.size>5242880){
          inputField.value="";
      this.toster.error(`Max 5mb allowed.`,`Invalid file size.`,{progressBar:true,positionClass:"toast-top-center"});
      this.spinner.hide();
          return;
        }
      }

      if(type==='document'){

        if(extention[1] ==="jpg"|| extention[1]==='pdf' || extention[1]==="jpeg"){
         
        }else{
          this.spinner.hide();
          inputField.value="";
          this.toster.error('ONLY PDF, JPG, JPEG alowed.',`Invalid file type.`,{progressBar:true,positionClass:"toast-top-center"});
                return;
        }
        if(file.size>5242880){
          inputField.value="";
      this.toster.error(`Max 5mb allowed.`,`Invalid file size.`,{progressBar:true,positionClass:"toast-top-center"});
      this.spinner.hide();
          return;
        }
      }

      const reader = new FileReader();
      reader.onload = (e)=>{
        const dataUrl =e.target?.result as string;
        if(type ==='document'){
          this.deedFileUrl= dataUrl;
        }
        if(type === 'photo'){
          this.photoFile = dataUrl;
        }
        
        this.spinner.hide();
      }
      reader.readAsDataURL(file);
  }
  }

  getCurrentDate (){
    let currentDate;
    let date= new Date();
    let year = date.getFullYear();
    let month =(date.getMonth()+1).toString().padStart(2,'0');
    let day = date.getDate().toString().padStart(2,'0');
    currentDate=`${day}-${month}-${year}`;

    return currentDate;
  }

  getRentHolderData(form:NgForm){
    let data=form.value;

    let {name,member_count,current_unit,deposit_amt,email,phone,rent,password} = data;
    if(name==="" || member_count==="" || member_count ===null || email==="" || phone==="" || rent ==="" ||rent ===null || password ===""){
      this.toster.error('Please fill all inputs',"",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
    const nameRegex = /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(name.length > 25 || nameRegex.test(name)){
      this.toster.error('Enter valid Name max length 25.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }

    if(member_count<1){
      this.toster.error('Enter vlaid member count.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
    const phoneRegex = /^[06789]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(phone.length!==10 || !phoneRegex.test(phone)){
      this.toster.error('Enter valid 10 digit phone.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }

    if(email.length>30 || !emailRegex.test(email)){
      this.toster.error('Enter valid email.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
    if (rent< 1){
  this.toster.error('Enter valid Monthly Rnt.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
}  
if(current_unit==="" || current_unit===null){
  data.current_unit = 0;
}

if(deposit_amt==="" || deposit_amt===null){
  data.deposit_amt = 0;
}

  // if(this.deedFileUrl!==''){
    if(data.password.length<8 || data.password.length>16 ){
      this.toster.error('password must be 8 to 16 digit.',`Invalid Password`,{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
    if(data.confPass===data.password){

      delete data.file;
      data.deedURL=this.deedFileUrl;
      data.photo = this.photoFile;
      data.doj = this.getCurrentDate();

      this.spinner.show();

    this.addRentService.addRentHolder(data).subscribe({
      next:(res:any)=>{
        form.reset();
        if(res.status){

          Swal.fire({
            title:"Great!",
            text:"New Rentholder Added.",
            icon:"success"
          }).then((result:any)=>{
              this.router.navigate(['rent-holder']);
          });
        }
        this.spinner.hide();
      },
      error:(err)=>{
      console.error(err.error);
        
      this.toster.error(`${err.error.message}`,`Error`,{progressBar:true,positionClass:"toast-top-center"})
      this.spinner.hide();
    }
    });
    }else{
        this.toster.error(`Password not match.`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
    }
    
    
    
  }
}
