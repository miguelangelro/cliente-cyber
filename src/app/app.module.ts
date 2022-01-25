import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { LoginComponent } from './login/login.component';
import { SharedSecretComponent } from './shared-secret/shared-secret.component';
import { PaillierComponent } from './paillier/paillier.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './shared/authconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SeguimientoComponent,
    LoginComponent,
    SharedSecretComponent,
    PaillierComponent,
    UserComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
