import { Component } from '@angular/core';
import { SignupService } from 'src/app/services/signupService/signup.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-landlord-request',
  templateUrl: './landlord-request.component.html',
  styleUrls: ['./landlord-request.component.css']
})
export class LandlordRequestComponent {
  searchTerm:any;
  userMessage:any;
  datalist:any;;
  page:number=1;
  

  constructor(private signupServ:SignupService,private spinner:NgxSpinnerService){}
  ngOnInit(){
    this.spinner.show();
    this.signupServ.getSignUpData().subscribe({
      next:(result:any)=>{
        result = result.reverse();
        this.datalist=result;
        this.spinner.hide();
      },
      error:(err)=>{
        console.log(err.error);
        this.spinner.hide();
      }
    })
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

action(data:any,state:string){
this.spinner.show()
if (state==='approved'){
  data.status=state;
 this.signupServ.actionLandlordData(data).subscribe({
  next:(res:any)=>{
    // console.log(res);
    this.datalist=[];
    this.ngOnInit();
    this.spinner.hide();
  },
  error:(err)=>{
    console.log(err.error);
    this.spinner.hide();
  }
 })
  
}
if (state==='rejected'){
  data.status=state;
 this.signupServ.actionLandlordData(data).subscribe({
  next:(res:any)=>{
    // console.log(res);
    this.datalist=[];
    this.ngOnInit();
    this.spinner.hide();
  },
  error:(err)=>{
    console.log(err.error);
    this.spinner.hide();
  }
 })
}
  
}
filterCall(){
  this.ngOnInit();
}
  
}
