import { Component } from '@angular/core';
import { landlordData } from 'src/app/model/data';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';

@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord-user.component.html',
  styleUrls: ['./dashbord-user.component.css']
})
export class DashbordUserComponent {
  name:any='';
  email:any='';
  phone:any='';
  landlordPhoto:string="../../../assets/profile.jpg";
  constructor(
    private landlordServ:LandlordService,
  ){}
  ngOnInit(){
    let getEncData:any = localStorage.getItem('connect.sid');
    let actualData = atob(getEncData)
    let userData = JSON.parse(actualData);
    this.name = userData.name;
    this.email = userData.email;
    this.phone = userData.phone;

    this.landlordServ.getLandlordData(userData.id).subscribe({
      next:(res:landlordData)=>{
        if(res.photo && res.photo!==""){
            this.landlordPhoto = res.photo;
           }else{
            this.landlordPhoto = "../../../assets/profile.jpg";
           }
      },error:(error)=>{
        console.log(error);
      }
    })
  }
}
