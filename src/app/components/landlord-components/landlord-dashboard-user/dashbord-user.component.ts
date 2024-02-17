import { Component } from '@angular/core';

@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord-user.component.html',
  styleUrls: ['./dashbord-user.component.css']
})
export class DashbordUserComponent {
  name:any='';
  email:any='';
  phone:any='';
  landlordPhoto:any;
  ngOnInit(){
    let getEncData:any = localStorage.getItem('connect.sid');
    let actualData = atob(getEncData)
    let userData = JSON.parse(actualData);
     this.name = userData.name;
     this.email = userData.email;
     this.phone = userData.phone;
     this.landlordPhoto = userData.photo ? userData.photo: "../../../assets/profile.jpg";
  }
}
