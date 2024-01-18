import { Component, NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { DashbordUserComponent } from './components/dashbord-user/dashbord-user.component';
import { MainMeterComponent } from './components/main-meter/main-meter.component';
import { SubMeterComponent } from './components/sub-meter/sub-meter.component';
import { ManageComponent } from './components/manage/manage.component';
import { DashbordContentComponent } from './components/dashbord-content/dashbord-content.component';
import { MainMeterMenuComponent } from './components/main-meter-menu/main-meter-menu.component';
import { SubMeterMenuComponent } from './components/sub-meter-menu/sub-meter-menu.component';
import { ManageMenuComponent } from './components/manage-menu/manage-menu.component';
import { CreateBillComponent } from './components/mainmeter-component/create-bill/create-bill.component';
import { CreateSubMeterComponent } from './components/create-sub-meter/create-sub-meter.component';
import { BillPaymentComponent } from './components/bill-payment/bill-payment.component';
import { AdditionFinesComponent } from './components/addition-fines/addition-fines.component';
import { RentHolderComponent } from './components/rent-holder/rent-holder.component';
import { TotalBillComponent } from './components/total-bill/total-bill.component';
import { BillDueComponent } from './components/bill-due/bill-due.component';
import { LandlordProfileComponent } from './components/landlord-profile/landlord-profile.component';
import { AddRentHolderComponent } from './components/add-rent-holder/add-rent-holder.component';
import { TotalDueComponent } from './components/total-due/total-due.component';
import { MainTableComponent } from './components/main-table/main-table.component';
import { SubTableComponent } from './components/sub-table/sub-table.component';
const dashbord: Routes=[
  
]
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'dashbord',component:DashbordComponent,
children:[
  {path:'',component:DashbordContentComponent,outlet:'outlet1'},
  {path:'',component:DashbordUserComponent,outlet:'outlet2'}
]
},
{path:'main-meter',component:DashbordComponent,
children:[
  {path:'',component:MainMeterComponent,outlet:'outlet1'},
  {path:'',component:MainMeterMenuComponent,outlet:'outlet2'},
  
]
},
{path:'create-MainBill',component:CreateBillComponent},
{path:'create-SubBill',component:CreateSubMeterComponent},

{path:'bill-payment',component:BillPaymentComponent},
{path:'fine-addition',component:AdditionFinesComponent},
{path:'rent-holder',component:RentHolderComponent},
{path:'total-bill',component:TotalBillComponent},
{path:'bill-due',component:BillDueComponent},
{path:'landlord-profile-update',component:LandlordProfileComponent},
{path:'add-rentHolder',component:AddRentHolderComponent},
{path:'total-due',component:TotalDueComponent},
{path:'mainMeter-table',component:MainTableComponent},
{path:'subMeter-table',component:SubTableComponent},
{path:'sub-meter',component:DashbordComponent,
children:[
  {path:'',component:SubMeterComponent,outlet:'outlet1'},
  {path:'',component:SubMeterMenuComponent,outlet:'outlet2'}
]
},
{path:'manage',component:DashbordComponent,
children:[
  {path:'',component:ManageComponent,outlet:'outlet1'},
  {path:'',component:ManageMenuComponent,outlet:'outlet2'}
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
