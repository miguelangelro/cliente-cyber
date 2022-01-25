import { UserComponent } from './user/user.component';
import { MiddlewareGuard } from './middleware.guard';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedSecretComponent } from './shared-secret/shared-secret.component';
import { LoginComponent } from './login/login.component';
import { PaillierComponent } from './paillier/paillier.component';
import { RegisterComponent } from './register/register.component';





const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'home', component: HomeComponent,canActivate:[MiddlewareGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'new', component: SeguimientoComponent,canActivate:[MiddlewareGuard]},
  { path: 'ss', component: SharedSecretComponent,canActivate:[MiddlewareGuard]},
  { path: 'paillier', component: PaillierComponent,canActivate:[MiddlewareGuard]},
  { path: 'user', component: UserComponent,canActivate:[MiddlewareGuard]},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
