import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedsecretService {

  constructor(private http: HttpClient) { }

  async getSecretKeys(mensaje: any){
    return this.http.post(environment.API + "/rsa/sharedsecret", mensaje);
  }
  async recoverSecret(mensaje: any){
    return this.http.post(environment.API + "/rsa/sharedsecret/recover", mensaje);
  }
}
