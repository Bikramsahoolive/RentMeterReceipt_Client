import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { rentholderData } from 'src/app/model/data';
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';
import { RentholderServiceService } from 'src/app/services/rentholderService/rentholder-service.service';
import { environment } from 'src/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rentholder-menubar-component',
  templateUrl: './rentholder-menubar-component.component.html',
  styleUrls: ['./rentholder-menubar-component.component.css']
})
export class RentholderMenubarComponentComponent {
  rentholderId:string="";
  name:any='';
  email:any='';
  phone:any='';
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
      next:(res:rentholderData)=>{
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
                  const response = await fetch(`${environment.apiUrl}/rentholder/user/${this.rentholderId}`,{
                    method:'PUT',
                    credentials:'include',
                    headers:{"Content-Type":"application/json"},
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
                setTimeout(()=>{this.authServ.logout();},1000);
                window.scrollTo({ top: 0, behavior:'instant' });
              })
        
          }else{
            console.log("Canceled.");
          }
        });
          
      },
    });
  }

}
