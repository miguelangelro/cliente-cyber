import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedSecretComponent } from './shared-secret/shared-secret.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/new' },
 // { path: 'home', component: HomeComponent},
  { path: 'new', component: SeguimientoComponent},
  { path: 'ss', component: SharedSecretComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
