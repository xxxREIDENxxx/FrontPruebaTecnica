import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { DistribuidorComponent } from './distribuidor/distribuidor.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'admin', component:AdminComponent},
  {path:'signin', component:SigninComponent},
  {path:'distribuidor', component:DistribuidorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
