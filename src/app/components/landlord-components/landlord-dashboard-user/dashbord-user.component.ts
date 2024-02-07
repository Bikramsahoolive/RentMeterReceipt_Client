import { Component } from '@angular/core';

@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord-user.component.html',
  styleUrls: ['./dashbord-user.component.css']
})
export class DashbordUserComponent {
  name:any='';
  email:any='';
  phone:any=''
  ngOnInit(){
     this.name = localStorage.getItem('name');
     this.email = localStorage.getItem('email');
     this.phone = localStorage.getItem('phone');
  }
}
