import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as paillier from 'paillier-bigint';
import { Observable } from 'rxjs';
import * as rsa from 'my-rsa';
//import bcu from 'bigint-crypto-utils'
import * as bc from 'bigint-conversion';
import { bigintToHex, hexToBigint, textToBigint } from 'bigint-conversion';
import { BuiltinConverter } from '@angular/compiler/src/compiler_util/expression_converter';
import {Datos, RsaPublicKey,RsaPrivateKey} from '../models/rsa.model'

@Injectable({
  providedIn: 'root'
})
export class PaillierService {

  constructor(private http: HttpClient) { }

  sendMessage(msg: String): Observable<any> {
    return this.http.post<any>(environment.API + '/rsa/paillier/homorfismSum', {
      message: msg
    });
  }

  getPaillierPubKey(): any{
    return this.http.get(environment.API + "/rsa/paillier");
  }


  // Homorfismpost(mensaje: any){
  //   return this.http.post(environment.API + "/rsa/paillier/homorfism", mensaje);
  // }
}
