import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { rentholderData } from 'src/app/model/data';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import { RentholderServiceService } from 'src/app/services/rentholderService/rentholder-service.service';

@Component({
  selector: 'app-update-rentholder',
  templateUrl: './update-rentholder.component.html',
  styleUrls: ['./update-rentholder.component.css']
})
export class UpdateRentholderComponent {

  deedFileUrl:string='';
  photoFile:string='';
  rentholderId:string='';
  renthplderData:rentholderData={
    current_unit: 0,
    deedURL: '',
    doj: '',
    email: '',
    id: '',
    landlord_id: '',
    landlord_name: '',
    member_count: 0,
    name: '',
    paid_amt: 0,
    password: '',
    phone: '',
    photo: '',
    rent: 0,
    userType: ''
  }
  constructor( private rentholderServe:RentholderServiceService,private router:Router, private route:ActivatedRoute, private addRentService:LandlordService, private spinner:NgxSpinnerService,private toster:ToastrService){}


  ngOnInit(){
    this.spinner.show();
    let urlid = this.route.snapshot.paramMap.get('id');
    this.rentholderId=urlid||"";
        this.rentholderServe.getRentholderData(urlid).subscribe({
          next:(res:rentholderData)=>{
            console.log(res);
            this.renthplderData=res;
          },
          error:(err)=>{
            console.log(err.error);
            this.toster.error('Something wents wrong.','Error');
          },
          complete:()=>{
            this.spinner.hide();
          }
        })
  }


  fileInput(event:any,type:string,inputField:any){
    this.spinner.show();
    const file = event.target.files[0];
    if (file){
      let extention = file.name.split(".");
      // console.log(extention[1]);
      if(extention[1] ==="jpg"|| extention[1]=='pdf' || extention[1]=="jpeg"){

      

      if(file.size<524576){

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
    }else{
      inputField.value="";
      this.toster.info(`file large than 500kb`,`Invalid file size.`,{progressBar:true,positionClass:"toast-top-center"});
      this.spinner.hide();
    }
  }else{
    this.spinner.hide();
    inputField.value="";
    this.toster.info('',`Invalid file type.`,{progressBar:true,positionClass:"toast-top-center"});
  }
  }
  }

  nameInput:boolean=true;
  mcountInput:boolean=true;
  phoneInput:boolean=true;
  emailInput:boolean=true;
  rentInput:boolean=true;
  cunitInput:boolean=true;
  photoInput:boolean=true;
  docInput:boolean=true;
  passwordInput:boolean=true;

  toggleInput(val:boolean,box:string){

    if(box=='name'){
      this.nameInput=!val;
    }

    if(box=='mcount'){
      this.mcountInput=!val;
    }

    if(box=='phone'){
      this.phoneInput=!val;
    }

    if(box=='email'){
      this.emailInput=!val;
    }

    if(box=='rent'){
      this.rentInput=!val;
    }

    if(box=='cunit'){
      this.cunitInput=!val;
    }
    
    if(box=='photo'){
      this.photoInput=!val;
      if(!val){
        this.photoFile= "";
      }
    }
    if(box=='doc'){
      this.docInput=!val;
      if(!val){
        this.deedFileUrl= "";
      }
    }
    if(box=='pass'){
      this.passwordInput=!val;
    }
  }

  updateData(form:NgForm){
    let data = form.value;
    console.log(data);

    const nameRegex = /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(!this.nameInput){
    if( data.name.length > 25 || nameRegex.test(data.name)){
      this.toster.info('Enter valid Name max length 25.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
  }
    if(!this.mcountInput){
    if( data.member_count<1){
      this.toster.info('Enter vlaid member count.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
  }
    const phoneRegex = /^[06789]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!this.phoneInput){
    if(data.phone.length!==10 || !phoneRegex.test(data.phone)){
      this.toster.info('Enter valid 10 digit phone.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
  }
  if(!this.emailInput){
    if(data.email.length>30 || !emailRegex.test(data.email)){
      this.toster.info('Enter valid email.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
  }
  if(!this.rentInput){
    if (data.rent< 1){
  this.toster.info('Enter valid Monthly Rnt.',"Invalid Input.",{progressBar:true,positionClass:"toast-top-center"});
      return;
}  
 }

 if(!this.cunitInput){
if(data.current_unit==="" || data.current_unit===null){
  this.toster.info(`Invalid Initial Unit.`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
  return;
}
 }

 if(!this.photoInput){

if(this.photoFile===''){
  this.toster.info(`Invalid photo file.`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
  return;
}else{
  data.photo = this.photoFile;
}
 }

 if(!this.docInput){
  if(this.deedFileUrl===''){
    this.toster.info(`Invalid Rent Deed or Document.`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
    return;
  }else{
    data.deedURL=this.deedFileUrl;
  }
}
  if(!this.passwordInput){
    if(data.password.length<8 || data.password.length>16 ){
      this.toster.info('password must be 8 to 16 digit.',`Invalid Password`,{progressBar:true,positionClass:"toast-top-center"});
      return;
    }else if(data.confPass!==data.password){
      this.toster.info(`Password not match.`,`Error`,{progressBar:true,positionClass:"toast-top-center"});
      return;
    }
  }

    delete data.confPass;

    this.spinner.show()
    this.rentholderServe.updateRentholderData(this.rentholderId,data).subscribe({
      next:(res:any)=>{
        console.log(res);
        
        if(res.status==='success'){
          this.toster.success(res.message,"",{positionClass:'toast-top-center',progressBar:true})
          this.router.navigate(['rent-holder']);
        }else{
          this.toster.error('error while update data, try again',"Error",{positionClass:'toast-top-center',progressBar:true});
        }
      },error:(err)=>{
        this.toster.error('Something wents wrong',"Error!",{positionClass:'toast-top-center',progressBar:true})
        this.spinner.hide();
      }
    })
  }


}
