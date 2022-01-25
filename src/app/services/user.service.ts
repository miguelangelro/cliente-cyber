import { UserRecibido } from './../models/rsa.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { executionAsyncResource } from 'async_hooks';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(environment.API+'/user/productos');
  }

  insertProducto(id:string, coins:any): Observable<any> {
    return this.http.post(environment.API + '/user/productos',{
      idProducto: id,
      coins: coins
    });
  }

  verifyRegisteredCoins(coins:any): Observable<any> {
    return this.http.post(environment.API + '/banco/verify/coins',{
      coinsFirmadas: coins
    });
  }

  getUser(): Observable<UserRecibido> {
    return this.http.get<UserRecibido>(environment.API+'/user/me');
  }

  retirarSaldo(euros:number, coins:any): Observable<any> {
    return this.http.post<any>(environment.API+'/user/retrieve', {
      retirar: euros,
      coinsCegados: coins
    });
  }

  insertCoins(coins:any): Observable<any> {
    return this.http.post(environment.API + '/user/insertCoins',{
      coins: coins
    });
  }
}
