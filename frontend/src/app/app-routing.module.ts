import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { Redir1Component } from './components/redir1/redir1.component';
import { ContactComponent } from './contact/contact.component';
import { ContractComponent } from './contract/contract.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MycontactsComponent } from './mycontacts/mycontacts.component';
import { NewcontractComponent } from './newcontract/newcontract.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { PropertyComponent } from './property/property.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path:'home', component: HeaderComponent,
    children:[
      {path:'landing', component: LandingComponent},
      {path:'login', component: LoginComponent},
      {path:'register', component:RegisterComponent},
      {path:'about', component:AboutComponent},
      {path:'search', component:SearchComponent},
      {path:'about', component:AboutComponent},
      {path:'contact', component:ContactComponent},
      {path:'dashboard', component:DashboardComponent,
      children:[
        {path:'properties', component:PropertyComponent},
        {path:'newcontract', component:NewcontractComponent},
        {path:'contract', component:ContractComponent},
        {path:'contacts', component:MycontactsComponent},
        {path:'redir1', component:Redir1Component},
        {path:'operacion', component:OperacionesComponent}
      ]}
    ]
  },
  {path:'', redirectTo:'/home/landing', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
