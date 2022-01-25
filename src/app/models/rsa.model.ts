import { Producto } from './producto.model';
 import * as rsa from 'my-rsa'
 import * as bcu from 'bigint-crypto-utils'
 let d = 115220408843156139592577962318095156923441159785620421516587331257092027103488384587590896643154927128311485592433557545039328726761148705937479875958905n;
 let n = 11743701297595527092501993649208401709629180853608406788386600199993841648960293880467309751061451444256132699734853792116741108484439011186847793375428623n;
 let e = 65537n

export let RsaPublicKey = new rsa.RsaPublicKey(e,n);
export let RsaPrivateKey = new rsa.RsaPrivateKey(d,n);

export interface Datos {
    e: string;
    n: string;
}

export interface signResponse{
    response: string;
    signedData: string;
}


export interface User{
  nombre: string;
  correo: string;
  password: string;
}

export interface UserRecibido{
  nombre: string;
  correo: string;
  password: string;
  _id: string;
  saldo_euros: number;
  coins: string[];
  productos: Producto[];
}


export class Cegar {
    r: bigint
    pubKey: rsa.RsaPublicKey
  
    constructor (pubKey: rsa.RsaPublicKey) {
      this.pubKey = pubKey
      this.r = bcu.randBetween(this.pubKey.n)
    }
  
    cegarMensaje (msg: bigint): bigint {
      const bm: bigint = (msg * (this.pubKey.encrypt(this.r))) % this.pubKey.n
      return bm
    }
  
    descegarMensaje (blindedSignature: bigint): bigint {
      return (blindedSignature * bcu.modInv(this.r, this.pubKey.n) % this.pubKey.n)
    }
  }