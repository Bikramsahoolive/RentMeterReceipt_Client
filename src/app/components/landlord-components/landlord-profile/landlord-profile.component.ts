import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import{NgxSpinnerService} from 'ngx-spinner'
import {ToastrService} from 'ngx-toastr';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {Router} from '@angular/router'
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';
import { landlordData } from 'src/app/model/data';

@Component({
  selector: 'app-landlord-profile',
  templateUrl: './landlord-profile.component.html',
  styleUrls: ['./landlord-profile.component.css']
})
export class LandlordProfileComponent {
  upiInput:boolean=true;
  photoInput:boolean=true;
  signInput:boolean=true;
  passwordInput:boolean=true;
  updateCheckbox:boolean=false;

  constructor(
    private spinner:NgxSpinnerService,
    private toaster:ToastrService,
    private landlordServ:LandlordService,
    private authServ:AuthServiceService,
    private route:Router
     ){}
  landlordId:any;
  landlordData:landlordData={
    id:"",
    dor:"",
    name:"",
    phone:"",
    email:"",
    upi:"",
    photo:"",
    signature:"",
    password:"",
    userType:"",
    plan:"",
    rcrCount:0
  };
  landlordPhoto:string="";
  landlordSignature:string="";

  ngOnInit(){
    this.spinner.show();
    let landlordEncData:any= localStorage.getItem('connect.sid');
    let landlordData:any = atob(landlordEncData);
        landlordData = JSON.parse(landlordData);
        this.landlordId=landlordData.id;
        this.landlordServ.getLandlordData(landlordData.id).subscribe({
          next:(res:any)=>{
            this.landlordData=res;
          },
          error:(err)=>{
            console.log(err.error);
            this.toaster.error('Something wents wrong.','Error');
          },
          complete:()=>{
            this.spinner.hide();
          }
        })


  }

toggleInput(val:boolean,box:string){
  // console.log(box,!val);
if(box=='upi'){
  this.upiInput=!val;
  // this.updateCheckbox=true;
  if (!val){
  // this.updateCheckbox=false;
  }
}

if(box=='photo'){
  this.photoInput=!val;
  // this.updateCheckbox=true;
  if(!val){
    this.landlordPhoto= "";
    // this.updateCheckbox=false;
  }
}
if(box=='sign'){
  this.signInput=!val;
  // this.updateCheckbox=true;
  if(!val){
    this.landlordSignature= "";
    // this.updateCheckbox=false;
  }
}
if(box=='password'){
  this.passwordInput=!val;
  // this.updateCheckbox=true;
  if(!val){
    // this.updateCheckbox=false;
  }
}
}

fileUpload(event:any,fileType:string, inputField:any){
  let file = event.target.files[0];
  // console.log(file);
  if (file){
    let reader = new FileReader();

    let extention = file.name.split(".");
    // console.log(extention[1]);
    if(extention[1]=="jpg" || extention[1]==='png' || extention[1]==="jpeg"){
      
      if(file.size<548487){

       
    reader.onload=(e)=>{
      let fileURL = e.target?.result as string;
      if(fileType=='photo')this.landlordPhoto= fileURL;
      if(fileType=='signature')this.landlordSignature= fileURL;
    }


      }else{
        inputField.value="";
        this.toaster.info('Invalid File size ,only less than 500kb.','Error',{progressBar:true,positionClass:"toast-top-center"});
      }

    }else{
      inputField.value="";
      this.toaster.info('Invalid File type ,only jpg, jpeg, png allowed.','Error',{progressBar:true,positionClass:"toast-top-center"});
    }
    
    reader.readAsDataURL(file);
  }
}


updateLandlord(form:NgForm){
  if(!this.upiInput || !this.passwordInput || !this.photoInput || !this.signInput){
    let data = form.value;
    const upiRegex = /^[^\s@]+@[^\s@]+$/;
    if(!this.upiInput){
      if(data.upi==="" || !upiRegex.test(data.upi)){
        this.toaster.info("Enter a valid UPI ID.",'Invalid UPI ID',{progressBar:true,positionClass:"toast-top-center"});
        return;
      }
    }

    if(!this.photoInput){
      if(this.landlordPhoto===""){
        this.toaster.info("Select a valid photo File.",'Invalid Photo',{progressBar:true,positionClass:"toast-top-center"});
        return;
      }else{
        data.photo=this.landlordPhoto;
      }
    }

    if(!this.signInput){
      if(this.landlordSignature===""){
        this.toaster.info("Select a valid Signature File.",'Invalid Signature',{progressBar:true,positionClass:"toast-top-center"});
        return;
      }else{
        data.signature=this.landlordSignature;
      }
    }

    if(!this.passwordInput){
      if( data.password==="" || data.password.length < 8 || data.password.length > 16){
        this.toaster.info("Enter a valid 8 to 16 digit password.",'Invalid Password',{progressBar:true,positionClass:"toast-top-center"});
        return;
      }
    }
  if(data.cPass == data.password){

    this.spinner.show();
    delete data.cPass;

    this.landlordServ.updateLandlordData(data,this.landlordId).subscribe({
      next:(res:any)=>{
        if (res.status==='success'){
        this.toaster.success(res.message,'',{progressBar:true,positionClass:"toast-top-center"});
        this.route.navigate(['dashbord-landlord']);
      }
      },
      error:(err)=>{
        console.error(err.error);
        this.toaster.error('Something wents wrong!','Error',{progressBar:true,positionClass:"toast-top-center"});
      },
      complete:()=>{
        this.spinner.hide();
      }
    });
    
  }else{
    this.toaster.info('Password not matching','Invalid Password.',{progressBar:true,positionClass:"toast-top-center"});
  }
  }else{
    this.toaster.info('Mark Update Type','Invalid input.',{progressBar:true,positionClass:"toast-top-center"});
    // form.reset();
    // this.ngOnInit();
  }
}

deleteAccountPrompt(id:any){
  let confString = prompt("This Action is irreversible and permanently delete all releted data, To confirm please type ['delete landlord'] bellow.");
  if(confString === 'delete landlord'){
    this.landlordServ.deleteLandlordData(id).subscribe({
      next:()=>{
        this.toaster.success(`Your Profile Deleted Successfully.`,"",{progressBar:true,positionClass:"toast-top-center"});
        this.authServ.logout();
      },error:(error)=>{
        console.error(error);
        this.toaster.error(`Something wents wrong.`,"",{progressBar:true,positionClass:"toast-top-center"});
      }
    });
  }else if(confString===null){
    // this.toaster.warning("Delete profile canceled.");
  }else{
    this.toaster.info("Sorry! wrong input.","",{progressBar:true,positionClass:"toast-top-center"});
  }
}

removeBiometric(type:string){
  let confirmation = confirm(`Are you sure want to remove ${type}.`);
  if(confirmation){
    let data;
    if(type ==='photo'){
      data={photo:""}
    }else{
      data={signature:""}
    }
    
    this.landlordServ.updateLandlordData(data,this.landlordId).subscribe({
      next:(res:any)=>{
        if (res.status==='success'){
        this.toaster.success(`${type} removed.`,"",{progressBar:true,positionClass:"toast-top-center"});
        this.route.navigate(['dashbord-landlord']);
      }
      },
      error:(err)=>{
        console.error(err.error);
        this.toaster.error('Something wents wrong!','Error',{progressBar:true,positionClass:"toast-top-center"});
      },
      complete:()=>{
        this.spinner.hide();
      }
    });
  }
}

}
