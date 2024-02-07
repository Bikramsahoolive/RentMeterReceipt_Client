import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-status',
  templateUrl: './signup-status.component.html',
  styleUrls: ['./signup-status.component.css']
})
export class SignupStatusComponent {
  getStatus(num:any,statusField:any){
    console.log(num);
    statusField.style.display="block";

  }
}
