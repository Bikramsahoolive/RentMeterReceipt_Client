import { Component } from '@angular/core';
import { SignupService } from 'src/app/services/signupService/signup.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environment';

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
  

  constructor(private adminServ:AdminServiceService,private spinner:NgxSpinnerService){}
  ngOnInit(){
    this.spinner.show();
    this.adminServ.getAllPayoutData().subscribe({
      next:(result:any)=>{
        // result = result.reverse();
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

// action(data:any,state:string){
// this.spinner.show()
// if (state==='approved'){
//   data.status=state;
//  this.signupServ.actionLandlordData(data).subscribe({
//   next:(res:any)=>{
//     // console.log(res);
//     this.datalist=[];
//     this.ngOnInit();
//     this.spinner.hide();
//   },
//   error:(err)=>{
//     console.log(err.error);
//     this.spinner.hide();
//   }
//  })
  
// }
// if (state==='rejected'){
//   data.status=state;
//  this.signupServ.actionLandlordData(data).subscribe({
//   next:(res:any)=>{
//     // console.log(res);
//     this.datalist=[];
//     this.ngOnInit();
//     this.spinner.hide();
//   },
//   error:(err)=>{
//     console.log(err.error);
//     this.spinner.hide();
//   }
//  })
// }
  
// }
// filterCall(){
//   this.ngOnInit();
// }

confirmPayout(data:any){
  Swal.fire({
    title:"Confirm Payout",
    html:`<label style="display: block; width: 100%; text-align: start; padding: 15px 0 0px 0;">Payout Date</label>
<input type="date" id="date" style="padding: 10px 10px; width: 100%; border: 2px solid gray; border-radius: 5px;">
<label style="display: block; width: 100%; text-align: start; padding: 15px 0 0px 0;">Transaction ID</label>
<input type="text" placeholder="Enter Transaction ID" id="transction-id" style="padding: 10px 10px; width: 100%; border: 2px solid gray; border-radius: 5px;">
<label style="display: block; width: 100%; text-align: start; padding: 15px 0 0px 0;">Remark</label>
<textarea id="details" style="margin:0; resize: vertical; padding: 5px; border-radius: 3px; height: 70px; width: 100%;"></textarea>`,
focusConfirm:false,
showCloseButton:true,
allowOutsideClick:false,
showLoaderOnConfirm:true,
preConfirm: async()=> {
  const date = (document.getElementById('date') as HTMLInputElement).value;
  const transctionId = (document.getElementById('transction-id')as HTMLInputElement).value;
  const details = (document.getElementById('details')as HTMLInputElement).value;

  if(!date || !transctionId || !details){
    Swal.showValidationMessage('Invalid Inputs');
  }else{

    data.process_date=date;
    data.payout_transactionId=transctionId;
    data.payout_details=details;
    
  try {
    const response = await fetch(`${environment.apiUrl}/admin/process/payout`,{
      method:'POST',
      credentials:'include',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
  if(response.ok){
    return 'ok';
  }else{
    
    return Swal.showValidationMessage(`
      "Error! Try Again."
    `)
  }
  } catch (error) {
    console.log(error);
    return Swal.showValidationMessage(`
      "Error! Try Again."
    `)
  }
}
}
  })
  .then((result)=>{
    
    if(result.value==='ok'){
      Swal.fire({
        title: 'Payout Processed',
        text: 'Payout Data processed successfully.',
        icon:'success',
        timer: 3000,
        showConfirmButton:false
    });
    setTimeout(()=>{
    this.datalist = [];
    this.ngOnInit();
  },3000);
    }

  });
}
  
}
