import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import{NgxSpinnerService} from 'ngx-spinner'
import {ToastrService} from 'ngx-toastr';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {Router} from '@angular/router'

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
    private route:Router
     ){}
  landlordId:any;
  landlordData:any;
  landlordPhoto:any;
  landlordSignature:any;

  ngOnInit(){
    this.spinner.show();
    let landlordEncData:any= localStorage.getItem('connect.sid');
    let landlordData:any = atob(landlordEncData);
        landlordData = JSON.parse(landlordData);
        this.landlordId=landlordData.id;
        this.landlordServ.getSingleLandlordData(landlordData.id).subscribe({
          next:(res)=>{
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
  console.log(box,!val);
if(box=='upi'){
  this.upiInput=!val;
  this.updateCheckbox=true;
  if (!val){
  this.updateCheckbox=false;
  }
}

if(box=='photo'){
  this.photoInput=!val;
  this.updateCheckbox=true;
  if(!val){
    this.landlordPhoto= undefined;
    this.updateCheckbox=false;
  }
}
if(box=='sign'){
  this.signInput=!val;
  this.updateCheckbox=true;
  if(!val){
    this.landlordSignature= undefined;
    this.updateCheckbox=false;
  }
}
if(box=='password'){
  this.passwordInput=!val;
  this.updateCheckbox=true;
  if(!val){
    this.updateCheckbox=false;
  }
}
}

fileUpload(event:any,fileType:string){
  let file = event.target.files[0];
  console.log(file);
  if (file){
    let reader = new FileReader();

    let extention = file.name.split(".");
    console.log(extention[1]);
    if(extention[1]=="jpg"){
      if(file.size<102400){

       
    reader.onload=(e)=>{
      let fileURL = e.target?.result as string;
      if(fileType=='photo')this.landlordPhoto= fileURL;
      if(fileType=='signature')this.landlordSignature= fileURL;
    }


      }else{
        this.toaster.warning('Invalid File size ,only less than 100kb.','Error');
      }

    }else{
      this.toaster.warning('Invalid File type ,only jpg ,jpeg.','Error');
    }
    
    reader.readAsDataURL(file);
  }
}


updateLandlord(form:NgForm){
  if(this.updateCheckbox){
    let data = form.value;
  if(this.landlordPhoto)data.photo=this.landlordPhoto;
  if(this.landlordSignature)data.signature=this.landlordSignature;
  if(data.cPass == data.password){
    this.spinner.show();
    delete data.cPass;
    console.log(data);
    this.landlordServ.updateLandlordData(data,this.landlordId).subscribe({
      next:(res:any)=>{
        if (res.status){
        this.toaster.success('Data Updated Successfully','Success');
        this.route.navigate(['dashbord-landlord']);
      }
      },
      error:(err)=>{
        console.error(err.error);
        this.toaster.show('Something wents wrong!','Error');
      },
      complete:()=>{
        this.spinner.hide();
      }
    });
    
  }else{
    this.toaster.warning('Password not maatch','Invalid Password.');
  }
  }else{
    this.toaster.warning('Mark update type','Invalid input.');
    form.reset();
    this.ngOnInit();
  }
  
  
}

}
