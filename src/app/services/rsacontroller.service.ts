import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as rsa from 'my-rsa';
//import bcu from 'bigint-crypto-utils'
import * as bc from 'bigint-conversion';
import { bigintToHex, hexToBigint, textToBigint } from 'bigint-conversion';
import { BuiltinConverter } from '@angular/compiler/src/compiler_util/expression_converter';
import {Datos, RsaPublicKey,RsaPrivateKey} from '../models/rsa.model'
@Injectable({
  providedIn: 'root'
})


export class RsacontrollerService{
  pubKeyServer: rsa.RsaPublicKey;
  keyPairPaillier;

  constructor(private http: HttpClient) { }

  getClavePubServer(): rsa.RsaPublicKey {
    return this.pubKeyServer;
  }

  async getPubKeyServer(){
    this.http.get<Datos>(environment.API+ "/rsa/server/pubkey").subscribe(async datos =>{
      this.pubKeyServer = new rsa.RsaPublicKey(bc.hexToBigint(datos.e), bc.hexToBigint(datos.n));
    });
  }

  async sendPubkey(){
    let payload ={
      e: bc.bigintToHex(RsaPublicKey.e),
      n: bc.bigintToHex(RsaPublicKey.n)
      };
      this.http.post(environment.API + '/rsa/client/pubkey', payload).subscribe(data =>{
        console.log(data);
      });
  }
}
