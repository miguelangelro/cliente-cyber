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
import * as paillierBigint from 'paillier-bigint'
import * as bigintConversion from 'bigint-conversion';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PaillierService {
  publicKeyPaillier: paillierBigint.PublicKey;

  constructor(private http: HttpClient) { }

  sendMessage(msg: String, msg2: String ): Observable<any> {
    return this.http.post<any>(environment.API + '/rsa/paillier/homorfismSum', {
      mensaje1: msg,
      mensaje2: msg2
    });
  }

  getPaillierPubKey(): any{
    return this.http.get(environment.API + "/rsa/paillier");
  }

  obtenerClavePublicaServer() {
    this.getPaillierPubKey().subscribe(
      async (res) => {
        console.log("PAILLIER")
        this.publicKeyPaillier = new paillierBigint.PublicKey(bigintConversion.hexToBigint(res['n']), bigintConversion.hexToBigint(res['g']))
        //console.log("La clave Publica Paillier es: ", this.publicKeyPaillier)
      },
      (err) => {
        console.log('error');
        Swal.fire('Error en la recogida de la clave', '', 'error');
      }
    );
  }


  // Homorfismpost(mensaje: any){
  //   return this.http.post(environment.API + "/rsa/paillier/homorfism", mensaje);
  // }
}
