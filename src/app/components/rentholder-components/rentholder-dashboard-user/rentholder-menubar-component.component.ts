import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { rentholderData } from 'src/app/model/data';
import { RentholderServiceService } from 'src/app/services/rentholderService/rentholder-service.service';

@Component({
  selector: 'app-rentholder-menubar-component',
  templateUrl: './rentholder-menubar-component.component.html',
  styleUrls: ['./rentholder-menubar-component.component.css']
})
export class RentholderMenubarComponentComponent {
  name:any='';
  email:any='';
  phone:any='';
  rentholderPhoto:string="../../../assets/profile.jpg";
  constructor(
    private rentHolderServe:RentholderServiceService,
    private spinner:NgxSpinnerService,
    private toster:ToastrService
  ){}
  ngOnInit(){
    let getEncData:any = localStorage.getItem('connect.sid');
    let actualData = atob(getEncData)
    let userData = JSON.parse(actualData);
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

}
