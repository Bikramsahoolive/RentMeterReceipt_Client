import { Component, NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

// import { HeaderComponent } from './components/beforeLoginComponents/header/header.component';
import { HomeComponent } from './components/beforeLoginComponents/home/home.component';
import { SignupComponent } from './components/beforeLoginComponents/signup/signup.component';
import {SignupStatusComponent  } from './components/beforeLoginComponents//signup-status/signup-status.component';
import { LoginComponent } from './components/beforeLoginComponents/login/login.component';

import { DashbordComponent } from './components/afterLoginComponents/dashboard/dashbord.component';
// import { MenubarComponent } from './components/afterLoginComponents/menubar/menubar.component';

import { DashbordUserComponent } from './components/landlord-components/landlord-dashboard-user/dashbord-user.component';
import { DashbordContentComponent } from './components/landlord-components/landlord-dashboard-content/dashbord-content.component';
import { MainMeterComponent } from './components/landlord-components/main-meter/main-meter.component';
import { SubMeterComponent } from './components/landlord-components/sub-meter/sub-meter.component';
import { ManageComponent } from './components/landlord-components/manage/manage.component';
import { SubMeterMenuComponent } from './components/landlord-components/sub-meter-menu/sub-meter-menu.component';
import { ManageMenuComponent } from './components/landlord-components/manage-menu/manage-menu.component';
import { CreateBillComponent } from './components/landlord-components/create-bill/create-bill.component';
import { CreateSubMeterComponent } from './components/landlord-components/create-rent-bill/create-sub-meter.component';
import { BillPaymentComponent } from './components/landlord-components/bill-payment/bill-payment.component';
import { AdditionFinesComponent } from './components//landlord-components/addition-fines/addition-fines.component';
import { RentHolderComponent } from './components/landlord-components/rent-holder/rent-holder.component';
import { TotalBillComponent } from './components/landlord-components/total-bill/total-bill.component';
import { BillDueComponent } from './components/landlord-components/bill-due/bill-due.component';
import { LandlordProfileComponent } from './components/landlord-components/landlord-profile/landlord-profile.component';
import { AddRentHolderComponent } from './components/landlord-components/add-rent-holder/add-rent-holder.component';
import { TotalDueComponent } from './components/landlord-components/total-due/total-due.component';
// import { MainTableComponent } from './components/landlord-components/main-table/main-table.component';
import { SubTableComponent } from './components/landlord-components/sub-table/sub-table.component';

import { RentholderDashbordContentComponent } from './components/rentholder-components/rentholder-dashboard-content/rentholder-dashbord-content.component';
import { RentholderMenubarComponentComponent } from './components/rentholder-components/rentholder-dashboard-user/rentholder-menubar-component.component';

import { AdminDashbordContentComponent } from './components/admin-components/admin-dashbord-content/admin-dashbord-content.component';
import { AdminDashbordUserComponent } from './components/admin-components/admin-dashbord-user/admin-dashbord-user.component';
import { LandlordRequestComponent } from './components/admin-components/landlord-request/landlord-request.component';
import { PrintRentBillComponent } from './components/landlord-components/print-rent-bill/print-rent-bill.component';
import { ContactComponent } from './components/beforeLoginComponents/contact/contact.component';
import { AboutComponent } from './components/beforeLoginComponents/about/about.component';
import { ForgotPasswordComponent } from './components/beforeLoginComponents/forgot-password/forgot-password.component';
import { BillDetailsComponent } from './components/rentholder-components/bill-details/bill-details.component';
import { rentholderAuthGuard } from './guard/rentholder-auth.guard';
import { UpdateRentholderComponent } from './components/landlord-components/update-rentholder/update-rentholder.component';
import { PrivacyPolicyTermConditionsComponent } from './components/beforeLoginComponents/privacy-policy-term-conditions/privacy-policy-term-conditions.component';
import { UnderConstructionComponent } from './components/beforeLoginComponents/under-construction/under-construction.component';
import { UnsubscribeMailComponent } from './components/beforeLoginComponents/unsubscribe-mail/unsubscribe-mail.component';
import { DeveloperDetailsComponent } from './components/beforeLoginComponents/developer-details/developer-details.component';
import { PayoutComponent } from './components/landlord-components/payout/payout.component';
import { PaymentProcessComponent } from './components/rentholder-components/payment-process/payment-process.component';
import { adminAuthGuard } from './guard/admin-auth.guard';
import { ProcessedPayoutComponent } from './components/landlord-components/processed-payout/processed-payout.component';
import { RefundPolicyComponent } from './components/beforeLoginComponents/refund-policy/refund-policy.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  // {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'signup-status',component:SignupStatusComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'privacy-policy',component:PrivacyPolicyTermConditionsComponent},
  {path:'refund-policy',component:RefundPolicyComponent},
  {path:'under-construction',component:UnderConstructionComponent},
  {path:'unsubscribe/:id',component:UnsubscribeMailComponent},
  {path:'unsubscribe',component:UnsubscribeMailComponent},
  {path:'developer',component:DeveloperDetailsComponent},

  {path:'dashbord-admin',component:DashbordComponent,canActivate:[adminAuthGuard],
children:[
  {path:'',component:AdminDashbordContentComponent,outlet:'outlet1'},
  {path:'',component:AdminDashbordUserComponent,outlet:'outlet2'},
]
},
{path:'request-landlord',component:LandlordRequestComponent,canActivate:[adminAuthGuard]},

  {path:'dashbord-landlord',component:DashbordComponent,canActivate:[authGuard],
children:[
  {path:'',component:DashbordContentComponent,outlet:'outlet1'},
  {path:'',component:DashbordUserComponent,outlet:'outlet2'},
]
},
{path:'dashbord-rentholder',component:DashbordComponent,canActivate:[rentholderAuthGuard],
children:[
  {path:'',component:RentholderDashbordContentComponent,outlet:'outlet1'},
  {path:'',component:RentholderMenubarComponentComponent,outlet:'outlet2'}
]
},
{path:'create-MainBill',component:CreateBillComponent,canActivate:[authGuard]},
{path:'create-rent-bill',component:CreateSubMeterComponent,canActivate:[authGuard]},

{path:'print-rent-bill/:id',component:PrintRentBillComponent},
{path:'process-payment/:id',component:PaymentProcessComponent,canActivate:[rentholderAuthGuard]},

{path:'update-rentholder/:id',component:UpdateRentholderComponent,canActivate:[authGuard]},

{path:'bill-payment',component:BillPaymentComponent,canActivate:[authGuard]},
{path:'payout',component:PayoutComponent,canActivate:[authGuard]},
{path:'processed-payout',component:ProcessedPayoutComponent,canActivate:[authGuard]},
{path:'rent-holder',component:RentHolderComponent,canActivate:[authGuard]},
{path:'total-bill',component:TotalBillComponent,canActivate:[authGuard]},
{path:'bill-due',component:BillDueComponent,canActivate:[authGuard]},
{path:'landlord-profile-update',component:LandlordProfileComponent,canActivate:[authGuard]},
{path:'add-rentHolder',component:AddRentHolderComponent,canActivate:[authGuard]},
{path:'total-due',component:TotalDueComponent,canActivate:[authGuard]},
// {path:'mainMeter-table',component:MainTableComponent,canActivate:[authGuard]},
{path:'rent-bill-table',component:SubTableComponent,canActivate:[authGuard]},
{path:'rent-bill',component:DashbordComponent,canActivate:[authGuard],
children:[
  {path:'',component:SubMeterComponent,outlet:'outlet1'},
  {path:'',component:SubMeterMenuComponent,outlet:'outlet2'}
]
},
{path:'manage',component:DashbordComponent,canActivate:[authGuard],
children:[
  {path:'',component:ManageComponent,outlet:'outlet1'},
  {path:'',component:ManageMenuComponent,outlet:'outlet2'}
]
},
{path:"rentholder/bill-data",component:BillDetailsComponent,canActivate:[rentholderAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
