import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaillierService {

  constructor(private http: HttpClient) { }

  getPaillierPubKey(): any{
    return this.http.get(environment.API + "/rsa/paillier");
  }


  Homorfismpost(mensaje: any){
    return this.http.post(environment.API + "/rsa/paillier/homorfism", mensaje);
  }
}
