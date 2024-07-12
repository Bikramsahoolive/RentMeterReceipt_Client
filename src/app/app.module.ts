import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import{ FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import {QRCodeModule} from 'angularx-qrcode';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/beforeLoginComponents/header/header.component';
import { HomeComponent } from './components/beforeLoginComponents/home/home.component';
import { SignupComponent } from './components/beforeLoginComponents/signup/signup.component';
import { LoginComponent } from './components/beforeLoginComponents/login/login.component';

import { DashbordComponent } from './components/afterLoginComponents/dashboard/dashbord.component';
import { MenubarComponent } from './components/afterLoginComponents/menubar/menubar.component';

import { DashbordUserComponent } from './components/landlord-components/landlord-dashboard-user/dashbord-user.component';
import { DashbordContentComponent } from './components/landlord-components/landlord-dashboard-content/dashbord-content.component';
import { MainMeterComponent } from './components/landlord-components/main-meter/main-meter.component';
import { SubMeterComponent } from './components/landlord-components/sub-meter/sub-meter.component';
import { ManageComponent } from './components/landlord-components/manage/manage.component';
import { MainMeterMenuComponent } from './components/landlord-components/main-meter-menu/main-meter-menu.component';
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
import { MainTableComponent } from './components/landlord-components/main-table/main-table.component';
import { SubTableComponent } from './components/landlord-components/sub-table/sub-table.component';




import { RentholderDashbordContentComponent } from './components/rentholder-components/rentholder-dashboard-content/rentholder-dashbord-content.component';
import { RentholderMenubarComponentComponent } from './components/rentholder-components/rentholder-dashboard-user/rentholder-menubar-component.component';
import { AdminDashbordContentComponent } from './components/admin-components/admin-dashbord-content/admin-dashbord-content.component';
import { AdminDashbordUserComponent } from './components/admin-components/admin-dashbord-user/admin-dashbord-user.component';
import { FooterComponent } from './components/beforeLoginComponents/footer/footer.component';
import { SignupStatusComponent } from './components/beforeLoginComponents/signup-status/signup-status.component';
import { LandlordRequestComponent } from './components/admin-components/landlord-request/landlord-request.component';
import { LandlordRequestPipe } from './pipes/landlord-request.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { PrintRentBillComponent } from './components/landlord-components/print-rent-bill/print-rent-bill.component';
import { ContactComponent } from './components/beforeLoginComponents/contact/contact.component';
import { AboutComponent } from './components/beforeLoginComponents/about/about.component';
import { ForgotPasswordComponent } from './components/beforeLoginComponents/forgot-password/forgot-password.component';
import { BillDetailsComponent } from './components/rentholder-components/bill-details/bill-details.component';
import { UpdateRentholderComponent } from './components/landlord-components/update-rentholder/update-rentholder.component';
import { PrivacyPolicyTermConditionsComponent } from './components/beforeLoginComponents/privacy-policy-term-conditions/privacy-policy-term-conditions.component';
import { UnderConstructionComponent } from './components/beforeLoginComponents/under-construction/under-construction.component';
import { UnsubscribeMailComponent } from './components/beforeLoginComponents/unsubscribe-mail/unsubscribe-mail.component';
import { DeveloperDetailsComponent } from './components/beforeLoginComponents/developer-details/developer-details.component';

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
    SubTableComponent,
    SignupComponent,
    RentholderDashbordContentComponent,
    RentholderMenubarComponentComponent,
    AdminDashbordContentComponent,
    AdminDashbordUserComponent,
    FooterComponent,
    SignupStatusComponent,
    LandlordRequestComponent,
    LandlordRequestPipe,
    SearchPipe,
    PrintRentBillComponent,
    ContactComponent,
    AboutComponent,
    ForgotPasswordComponent,
    BillDetailsComponent,
    UpdateRentholderComponent,
    PrivacyPolicyTermConditionsComponent,
    UnderConstructionComponent,
    UnsubscribeMailComponent,
    DeveloperDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule,
    QRCodeModule,
    NgxCaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
