import { User } from './../models/rsa.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public login(correo:string, password:string): Observable<any>{
    return this.http.post<any>(environment.API + '/user/auth/login', {
      correo: correo,
      password: password
    });
  }
  
  public register(nombre:string, correo:string, password:string): Observable<any>{
    return this.http.post<any>(environment.API + '/user/auth/register', {
      nombre: nombre,
      password: password,
      correo: correo
    });
  }
  
  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  
  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
  
  public getToken(){
    return localStorage.getItem('ACCESS_TOKEN');
  }
}
