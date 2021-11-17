import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { DataTablesModule } from "angular-datatables";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { TopPropertiesComponent } from './components/top-properties/top-properties.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyTableComponent } from './components/property-table/property-table.component';
import { PropertyComponent } from './property/property.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { FormTitleComponent } from './components/form-title/form-title.component';
import { PropertyImagesComponent } from './components/property-images/property-images.component';
import { ContractFilesComponent } from './components/contract-files/contract-files.component';
import { ContractFormComponent } from './components/contract-form/contract-form.component';
import { ContractTableComponent } from './components/contract-table/contract-table.component';
import { NewcontractComponent } from './newcontract/newcontract.component';
import { ContractComponent } from './contract/contract.component';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { MycontactsComponent } from './mycontacts/mycontacts.component';
import { RenewalFormComponent } from './components/renewal-form/renewal-form.component';
import { IncrementFormComponent } from './components/increment-form/increment-form.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { ChargeFormComponent } from './components/charge-form/charge-form.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { Redir1Component } from './components/redir1/redir1.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    SearchComponent,
    AboutComponent,
    RegisterComponent,
    HeaderComponent,
    TopPropertiesComponent,
    PropertyDetailComponent,
    SearchFilterComponent,
    ContactComponent,
    FooterComponent,
    DashboardComponent,
    PropertyTableComponent,
    PropertyComponent,
    PropertyFormComponent,
    FormTitleComponent,
    PropertyImagesComponent,
    ContractFilesComponent,
    ContractFormComponent,
    ContractTableComponent,
    NewcontractComponent,
    ContractComponent,
    ContactTableComponent,
    ContactFormComponent,
    MycontactsComponent,
    RenewalFormComponent,
    IncrementFormComponent,
    OperacionesComponent,
    ChargeFormComponent,
    PaymentFormComponent,
    ReportFormComponent,
    Redir1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareButtonsModule,
    ShareIconsModule, 
    SweetAlert2Module.forRoot(),
    DataTablesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
