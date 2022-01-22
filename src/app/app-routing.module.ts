import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedSecretComponent } from './shared-secret/shared-secret.component';
import { LoginComponent } from './login/login.component';
import { PaillierComponent } from './paillier/paillier.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/new' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'new', component: SeguimientoComponent},
  { path: 'ss', component: SharedSecretComponent},
  { path: 'paillier', component: PaillierComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
