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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    DashbordComponent,
    MainMeterComponent,
    SubMeterComponent,
    ManageComponent
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
