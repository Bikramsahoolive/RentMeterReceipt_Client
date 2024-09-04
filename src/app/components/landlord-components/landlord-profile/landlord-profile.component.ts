import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import{NgxSpinnerService} from 'ngx-spinner'
import {ToastrService} from 'ngx-toastr';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import {Router} from '@angular/router'
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';
import { landlordData } from 'src/app/model/data';
import Swal from 'sweetalert2';
import { environment } from 'src/environment';
import {startRegistration} from '@simplewebauthn/browser';

@Component({
  selector: 'app-landlord-profile',
  templateUrl: './landlord-profile.component.html',
  styleUrls: ['./landlord-profile.component.css']
})
export class LandlordProfileComponent {
  upiInput:boolean=true;
  acInput:boolean=true;
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
    rcrCount:0,
    account_no:null,
    ifsc:"",
    passkey_info:null
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

if(box=='ac'){
  this.acInput=!val;
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
    extention = extention[extention.length-1];
    // console.log(extention[1]);
    if(extention=="jpg" || extention==='png' || extention==="jpeg"){
      
      if(file.size<5242880){

       
    reader.onload=(e)=>{
      let fileURL = e.target?.result as string;
      if(fileType=='photo')this.landlordPhoto= fileURL;
      if(fileType=='signature')this.landlordSignature= fileURL;
    }


      }else{
        inputField.value="";
        this.toaster.error('Invalid File size ,only less than 5MB.','Error',{progressBar:true,positionClass:"toast-top-center"});
      }

    }else{
      inputField.value="";
      this.toaster.error('Invalid File type ,only jpg, jpeg or png allowed.','Error',{progressBar:true,positionClass:"toast-top-center"});
    }
    
    reader.readAsDataURL(file);
  }
}


updateLandlord(form:NgForm){
  if(!this.upiInput || !this.passwordInput || !this.photoInput || !this.signInput || !this.acInput){
    let data = form.value;
    const upiRegex = /^[^\s@]+@[^\s@]+$/;
    if(!this.upiInput){
      if(data.upi!=="" ){
        if(!upiRegex.test(data.upi)){
          this.toaster.error("Enter a valid UPI ID.",'Invalid UPI ID',{progressBar:true,positionClass:"toast-top-center"});
          return;
        }
      }
    }

    if(!this.photoInput){
      if(this.landlordPhoto===""){
        this.toaster.error("Select a valid photo File.",'Invalid Photo',{progressBar:true,positionClass:"toast-top-center"});
        return;
      }else{
        data.photo=this.landlordPhoto;
      }
    }

    if(!this.signInput){
      if(this.landlordSignature===""){
        this.toaster.error("Select a valid Signature File.",'Invalid Signature',{progressBar:true,positionClass:"toast-top-center"});
        return;
      }else{
        data.signature=this.landlordSignature;
      }
    }

    if(!this.passwordInput){
      if( data.password==="" || data.password.length < 8 || data.password.length > 16){
        this.toaster.error("Enter a valid 8 to 16 digit password.",'Invalid Password',{progressBar:true,positionClass:"toast-top-center"});
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
    this.toaster.error('Password not matching','Invalid Password.',{progressBar:true,positionClass:"toast-top-center"});
  }
  }else{
    this.toaster.error('Select Any Update Type.','Invalid input.',{progressBar:true,positionClass:"toast-top-center"});
    // form.reset();
    // this.ngOnInit();
  }
}

deleteAccountPrompt(id:any){
  // let confString = prompt("This Action is irreversible and permanently delete all releted data, To confirm please type ['delete landlord'] bellow.");
  Swal.fire({
    title:"Warning",
    icon:"warning",
    text:"This Action is irreversible and permanently delete all releted data, To confirm please type ['delete landlord'] bellow.",
    input:"text",
    position:"top",
    inputAutoFocus:false,
    inputAttributes:{
      autocapitalize:"on"
    },
    showCancelButton:true,
    confirmButtonText:"Delete",
    showLoaderOnConfirm:true,
    preConfirm:  async (val) => {
        
        if (val!=="delete landlord") {
          return Swal.showValidationMessage(`
            "Wrong Input!"
          `)
        }

        try {
          const response = await fetch(`${environment.apiUrl}/landlord/user/${id}`,{
            method:'DELETE',
            credentials:'include'
          })
        if(response.ok){
          return "Landlord Profile Deleted.";
        }
        } catch (error) {
          return Swal.showValidationMessage(`
            "Error! Try Again."
          `)
        }
        
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    
    if (result.isConfirmed) {
      Swal.fire({
        text:result.value,
        icon:"success"
      })
      .then(()=>{
        localStorage.removeItem('');
        setTimeout(()=>{this.authServ.logout();},1000);
        window.scrollTo({ top: 0, behavior:'instant' });
      })

  }else{
    console.log("Canceled.");
  }
});
}

removeBiometric(type:string){
  Swal.fire({
    title:`Remove ${type}`,
    text:`Are you sure want to remove ${type}.`,
    icon:"question",
    showCancelButton:true,
    confirmButtonText:"Sure"
  }).then((res)=>{

    if(res.isConfirmed){

      let data;
    if(type ==='photo'){
      data={photo:'null'}
    }else{
      data={signature:'null'}
    }
      this.spinner.show();
    this.landlordServ.updateLandlordData(data,this.landlordId).subscribe({
      next:(res:any)=>{
        this.spinner.hide();
        if (res.status==='success'){
        this.toaster.success(`${type} removed.`,"",{progressBar:true,positionClass:"toast-top-center"});
        this.route.navigate(['dashbord-landlord']);
      }
      },
      error:(err)=>{
        this.spinner.hide();
        console.error(err.error);
        this.toaster.error('Something wents wrong!','Error',{progressBar:true,positionClass:"toast-top-center"});
      }
    });

    }
  });
}

regPasskey(){

  Swal.fire({
    html:`<h3 style="margin-bottom:50px;">Security Alert!</h3>
<strong style="color:red;">
    Please ensure that you are the only user registered with Fingerprint or Face ID using on your device,
    RentⓝMeter.Receipt is not responsible for any action performed using the other user/ biometic registered on the device.
</strong>
`,
showCloseButton:true,
confirmButtonText:"Proceed"
  }).then((result)=>{
    if(result.isConfirmed){
      this.spinner.show();
  this.landlordServ.generateChallenge().subscribe({
    next:async (res:any)=>{
      this.spinner.hide();

      const authResult = await startRegistration(res.challenge);
      // console.log(authResult);
      
      this.spinner.show();
      this.landlordServ.verifyChallenge({publicKey:authResult}).subscribe({
        next:(res:any)=>{
          this.spinner.hide();
          if(res.status ==='success'){
            delete res.status;
            delete res.message;
            localStorage.setItem("passkey_id",btoa(JSON.stringify(res)));
            Swal.fire({
              title:"Passkey Registered !",
              text:"Your Passkey Registered Successfully.",
              icon:"success",
              timer:3000,
              showConfirmButton:false
            })
            setTimeout(()=>{this.route.navigate(['dashbord-landlord'])},3000);
          }
          
        },
        error:(err)=>{
          this.spinner.hide();
          console.log(err.error);
          this.toaster.error(err.error.message,"Error",{progressBar:true,positionClass:"toast-top-center"});
        }
      });
      
    },
    error:(err)=>{
      this.spinner.hide();
      console.log(err.error);
      this.toaster.error(err.error.message,"Error",{progressBar:true,positionClass:"toast-top-center"});
    }
  });
    }
  });
  
}

unregdPasskey(id:string){

  Swal.fire({
    title:"De-register Passkey",
    text:"Want to De-register passkey for this user.",
    icon:"question",
    showCancelButton:true,
    confirmButtonText:'Yes',
    cancelButtonText:'No'
  })
  .then((result)=>{
    if(result.isConfirmed){
      this.spinner.show();
      this.landlordServ.unregesterLandlordPasskey(id).subscribe({
        next:(res:any)=>{
          this.spinner.hide();
          this.toaster.success(res.message,"",{progressBar:true,positionClass:"toast-top-center"});
          localStorage.removeItem('passkey_id');
          this.route.navigate(['dashbord-landlord']);
        },error:(err)=>{
          console.log(err.error);
          this.toaster.error('Something wents wrong, try again later.',"Error",{progressBar:true,positionClass:"toast-top-center"})
          
        }
      })
    }
  })
  
}
}
