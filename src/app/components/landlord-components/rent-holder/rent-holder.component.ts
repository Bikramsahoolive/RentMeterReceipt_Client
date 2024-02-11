import { Component } from '@angular/core';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';

@Component({
  selector: 'app-rent-holder',
  templateUrl: './rent-holder.component.html',
  styleUrls: ['./rent-holder.component.css']
})
export class RentHolderComponent {
  constructor(private landlordServ:LandlordService){}
  users:any=[];

ngOnInit(){
    this.landlordServ.getAllRentholder().subscribe({
      next:(res:any)=>{
        this.users=res;
        console.log(res);
      },
      error:(err)=>{console.log(err.error)},
      complete:()=>console.log('Complited')
      
    })
}
downloadDoc(link:any){
  let downloadLink = document.createElement('a');
  downloadLink.href=link;
  downloadLink.download='Rent_Holder_Deed.pdf';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  
}
}
