import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';

@Component({
  selector: 'app-addition-fines',
  templateUrl: './addition-fines.component.html',
  styleUrls: ['./addition-fines.component.css']
})
export class AdditionFinesComponent {
  constructor(private landlordServe:LandlordService, private toastr:ToastrService, private spinner:NgxSpinnerService){}
  fineAdition(form:NgForm){
    this.spinner.show();
    let data = form.value;
    let id = data.id;
    delete data.id;
    this.landlordServe.fineAdditionData(data,id).subscribe({
      next:(res)=>{
        this.toastr.success('Fine Added.','Success');
        this.spinner.hide();
      },
      error:(err)=>{
        console.log(err.error);
        this.toastr.error('Something went wrong.','Error');
        this.spinner.hide();

      }
    })
  }

}
