import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { rentholderData } from 'src/app/model/data';
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';
import { RentholderServiceService } from 'src/app/services/rentholderService/rentholder-service.service';
import { environment } from 'src/environment';
import {startRegistration} from '@simplewebauthn/browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rentholder-menubar-component',
  templateUrl: './rentholder-menubar-component.component.html',
  styleUrls: ['./rentholder-menubar-component.component.css']
})
export class RentholderMenubarComponentComponent {
  rentholderId:string='';
  name:string='';
  email:string='';
  phone:string='';
  joinDate:string='';
  passkey_info:boolean=false;
  rentholderPhoto:string="../../../assets/profile.jpg";
  constructor(
    private rentHolderServe:RentholderServiceService,
    private spinner:NgxSpinnerService,
    private toster:ToastrService,
    private authServ:AuthServiceService
  ){}
  ngOnInit(){
    let getEncData:any = localStorage.getItem('connect.sid');
    let actualData = atob(getEncData)
    let userData = JSON.parse(actualData);
    this.rentholderId = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.phone = userData.phone;

    this.rentHolderServe.getRentholderData(userData.id).subscribe({
      next:(res:any)=>{
        this.joinDate=res.doj;
        if(res.passkey_info){
          this.passkey_info = true;
        }
         
        if(res.photo && res.photo!==""){
            this.rentholderPhoto = res.photo;
           }else{
            this.rentholderPhoto = "../../../assets/profile.jpg";
           }
      },error:(error:any)=>{
        this.spinner.hide();
        console.log(error);
      }
    });
  }

  updatePassword(){

    Swal.fire({
      title:"New Password",
      input:"password",
      position:"center",
      inputPlaceholder:"Enter New Password",
      inputAutoFocus:false,
      inputAttributes:{
        autocapitalize:"off"
      },
      showCancelButton:true,
      confirmButtonText:"Next",
      preConfirm:  (val) => {
          
          if (val==="") {
            return Swal.showValidationMessage(`
              "Invalid Input!"
            `)
          }else if(val.length < 8 || val.length > 16){
              return Swal.showValidationMessage(`
              "Password length should be 8 to 16."
            `)
          }

          Swal.fire({
            title:"Confirm Password",
            input:"text",
            inputPlaceholder:"Enter Confirm Password",
            
            position:"center",
            inputAutoFocus:true,
            inputAttributes:{
              autocapitalize:"off"
            },
            showCancelButton:true,
            confirmButtonText:"Update",
            showLoaderOnConfirm:true,
            preConfirm:  async (confval) => {
                
                if (confval==="") {
                  return Swal.showValidationMessage(`
                    "Invalid Input!"
                  `)
                }else if(confval!== val){
                  return Swal.showValidationMessage('Password not match.')
                }

               
                try {
                  let token = localStorage.getItem('auth-token')||"";
                  const response = await fetch(`${environment.apiUrl}/rentholder/user/${this.rentholderId}`,{
                    method:'PUT',
                    credentials:'include',
                    headers:{"Content-Type":"application/json","auth-token":token},
                    body:JSON.stringify({password:val})
                  });
                if(response.ok){
                  return "Password Updated! please Login again.";
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
                title: "Successful",
                text:result.value,
                icon:"success"
              })
              .then(()=>{
                // setTimeout(()=>{this.authServ.logout();},1000);
                // window.scrollTo({ top: 0, behavior:'instant' });
              })
        
          }else{
            console.log("Canceled.");
          }
        });
          
      },
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
    this.rentHolderServe.generateChallenge().subscribe({
      next:async (res:any)=>{
        this.spinner.hide();
  
        const authResult = await startRegistration(res.challenge);
        // console.log(authResult);
        
        this.spinner.show();
        this.rentHolderServe.verifyChallenge({publicKey:authResult}).subscribe({
          next:(res:any)=>{
            this.spinner.hide();
            if(res.status ==='success'){
              delete res.status;
              delete res.message;
              localStorage.setItem("passkey_id",btoa(JSON.stringify(res)));
              this.passkey_info = true;
              Swal.fire({
                title:"Passkey Registered !",
                text:"Your Passkey Registered Successfully.",
                icon:"success",
                timer:3000,
                showConfirmButton:false
              });
              // setTimeout(()=>{this.route.navigate(['dashbord-rentholder'])},3000);
            }
            
          },
          error:(err)=>{
            this.spinner.hide();
            console.log(err.error);
            this.toster.error(err.error.message,"Error",{progressBar:true,positionClass:"toast-top-center"});
          }
        });
        
      },
      error:(err)=>{
        this.spinner.hide();
        console.log(err.error);
        this.toster.error(err.error.message,"Error",{progressBar:true,positionClass:"toast-top-center"});
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
        this.rentHolderServe.unregesterLandlordPasskey(id).subscribe({
          next:(res:any)=>{
            this.spinner.hide();
            this.toster.success(res.message,"",{progressBar:true,positionClass:"toast-top-center"});
            localStorage.removeItem('passkey_id');
            this.passkey_info = false;
            // this.r.navigate(['dashbord-landlord']);
          },error:(err)=>{
            console.log(err.error);
            this.toster.error('Something wents wrong, try again later.',"Error",{progressBar:true,positionClass:"toast-top-center"})
            
          }
        })
      }
    })
    
  }

}
