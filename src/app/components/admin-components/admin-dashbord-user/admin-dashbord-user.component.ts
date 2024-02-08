import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashbord-user',
  templateUrl: './admin-dashbord-user.component.html',
  styleUrls: ['./admin-dashbord-user.component.css']
})
export class AdminDashbordUserComponent {
  id:any='';
  name:any='';
  email:any='';
  phone:any='';
  ngOnInit(){
    let getEncData:any = localStorage.getItem('connect.sid');
    let actualData = atob(getEncData)
    let userData = JSON.parse(actualData);
    this.id = userData.id;
     this.name = userData.name;
     this.email = userData.email;
     this.phone = userData.phone;
  }
}
