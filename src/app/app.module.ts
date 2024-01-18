import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import{ FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { MainMeterComponent } from './components/main-meter/main-meter.component';
import { SubMeterComponent } from './components/sub-meter/sub-meter.component';
import { ManageComponent } from './components/manage/manage.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { DashbordUserComponent } from './components/dashbord-user/dashbord-user.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    DashbordComponent,
    MainMeterComponent,
    SubMeterComponent,
    ManageComponent,
    MenubarComponent,
    DashbordUserComponent,
    DashbordContentComponent,
    MainMeterMenuComponent,
    SubMeterMenuComponent,
    ManageMenuComponent,
    CreateBillComponent,
    CreateSubMeterComponent,
    BillPaymentComponent,
    AdditionFinesComponent,
    RentHolderComponent,
    TotalBillComponent,
    BillDueComponent,
    LandlordProfileComponent,
    AddRentHolderComponent,
    TotalDueComponent,
    MainTableComponent,
    SubTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
