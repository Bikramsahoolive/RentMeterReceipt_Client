import { Component } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr'
import { landlordData, rentBillData, rentholderData } from 'src/app/model/data';
import { LandlordService } from 'src/app/services/landlordService/landlord.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-dashbord-content',
  templateUrl: './dashbord-content.component.html',
  styleUrls: ['./dashbord-content.component.css']
})
export class DashbordContentComponent {
  constructor(
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private landlordServ:LandlordService
    ){
      const currentYear = new Date().getFullYear();
      for(let i = currentYear; i>= 2024; i--){
        this.years.push(i);
      }
    }
    rentHolderCount:number=0;
    // rentHolderData:any;
    totalPaidAmt:number=0;
    totalDueAmt:number=0;
    billCount:number=0;
    pendingPayout:number=0;
    processedPayoutAmount:number=0;
    years:number[]=[];
    public chart1: any;
    public chart2: any;
    public chart3: any;

    data1 = {
      labels: [
        'Billed Amt',
        'Collected Amt',
        'Pending Amt'
      ],
      datasets: [{
        label: 'Bill and Collection',
        data: [50, 40, 10],
        backgroundColor: [
           '#4040c4',
           '#7373f3', 
           'rgb(235, 142, 54)', 
        ],
        hoverOffset: 4
      }]
    };
    config1: any = {
      type: 'doughnut',
      data: this.data1,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Total Bill Report'
          },
        },
        responsive: true
      }
    }

 data2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Billed Amt',
      data: [50, 40, 70, 80, 70, 60, 0, 0, 0, 0, 0, 0],  // All positive values
      borderColor: 'red', 
      backgroundColor: '#4040c4',  // Using rgba for transparency
    },
    {
      label: 'Collected Amt',
      data: [20, 30, 60, 80, 50, 30, 0, 0, 0, 0, 0, 0],  // All positive values
      borderColor: 'blue',  // Using a direct color value
      backgroundColor: '#7373f3',  // Using rgba for transparency
    }
  ]
};

 config2:any = {
  type: 'bar',
  data: this.data2,
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Yearly Bill Report'
      },
    },
    responsive: true,
    scales: {
      x: {
        // stacked: true,
      },
      y: {
        // stacked: true
      }
    }
  }
};



// data3={
//   labels: ['Online', 'Offline'],
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [20,80],
//       backgroundColor: ['#4040c4','#7373f3'],
//     }
//   ]
// }
// config3:any = {
//   type: 'pie',
//   data: this.data3,
// };
  ngOnInit(){
        this.chart1 = new Chart('barChart', this.config1)
        this.chart2 = new Chart('circleChart', this.config2)
        // this.chart3 = new Chart('pieChart', this.config3)

    this.spinner.show();
    this.landlordServ.getAllRentholder().subscribe({
      next:(res:rentholderData[])=>{ 
        // this.rentHolderData=res;
        this.rentHolderCount=res.length;
        
      //   let count =0;
      //   res.forEach((d:any)=>{
         
      //     count = count + Number(d.paid_amt);
      //   });
      //  console.log(count);
        
        
      },error:(err)=>{
        console.error(err.error);
        if(err.error.status !== false){
          // this.toastr.error('Something went wrong.','Error');
        }
        this.spinner.hide();
      },complete:()=>{
        this.spinner.hide();
      }
    });

    this.landlordServ.getAllRentBillData().subscribe({
      next:(res:rentBillData[])=>{
        this.billCount = res.length;
          let due = 0;
          res.forEach((element:rentBillData) => {
            due = due + Number(element.final_amt);
          });
  
          let totalPaid =0;
          res.forEach((element:rentBillData)=>{
            totalPaid = totalPaid + Number(element.paid_amt);
          })
  
          this.totalPaidAmt = totalPaid;
          this.totalDueAmt=due - totalPaid;
        
      },
      error:(err)=>{
        if(err.error.status !== false){
          // this.toastr.error('something went wrong','Error!');
        }
        console.log(err.error);
       
        
      }
    });

    let getEncData:any = localStorage.getItem('connect.sid');
    let actualData = atob(getEncData)
    let userData = JSON.parse(actualData);

    this.landlordServ.getLandlordData(userData.id).subscribe({
      next:(res:any)=>{
        this.pendingPayout = res.payout;
      },error:(error)=>{
        console.log(error);
      }
    });

    this.landlordServ.getLandlordPayoutProcessed().subscribe({
      next:(res:any)=>{
        this.spinner.hide();
        let amount = 0;
        res.forEach((element:any) => {
          amount += (+element.payout_amt);
        });
        this.processedPayoutAmount = amount;
        
      },error:(err)=>{
        // this.toastr.error('something went wrong',"Error",{positionClass:'toast-top-center',progressBar:true});
        console.log(err.error);
        this.spinner.hide();
      }
    });
  }

  getChartYear(year:any){
    // console.log(this.years[year.value]);
    
  }

}
