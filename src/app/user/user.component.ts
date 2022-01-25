import { RsacontrollerService } from './../services/rsacontroller.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../models/producto.model';
import { User, UserRecibido, Cegar } from './../models/rsa.model';
import { UserService } from './../services/user.service';
import * as bcu from 'bigint-crypto-utils'
import { bigintToHex, hexToBigint } from 'bigint-conversion';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  retirarForm: FormGroup;
  saldo:number ;
  listProductos: Producto[] = [];
  listCoins: Array<String>= [];
  form: any = {
    retirar: null
  };
  cegar: Cegar;

  constructor(private UserService: UserService, private rsaService: RsacontrollerService, private formBuilder: FormBuilder) {
    this.cegar = new Cegar(this.rsaService.getClavePubServer())
   }

  ngOnInit(): void {
    this.UserService.getUser().subscribe(data =>{
      if(data['ok']==true){
        console.log(data['user']);
        this.saldo = data['user'].saldo_euros;
        console.log("data: ", data);
        this.listProductos = data['user'].productos;
        this.listCoins = data['user'].coins;
      }
    });
    this.retirarForm = this.formBuilder.group({
      retirar: ['', [Validators.required, Validators.nullValidator]]
    });
    }

    get formControls() {
      return this.retirarForm.controls;
    }

  async retirar(){
    const retirar = this.retirarForm.value.retirar;
    console.log(retirar)
    const retirarNumber= parseInt(retirar)
    console.log(retirarNumber)
    if(this.saldo-retirarNumber < 0){
      console.log("Selecciona una cantidad correcta.")
    }
    else{
      let coinsCegados: string[]=[];
      let idsGenerados: string[]=[];
      let id: string;
      let num;

      for(let i=0; i<retirar; i++){
        id = bigintToHex(bcu.randBetween(this.rsaService.getClavePubServer().n))
        idsGenerados.push(id);
        const idRandomCegado = this.cegar.cegarMensaje(hexToBigint(id));
        coinsCegados.push(bigintToHex(idRandomCegado));
      }
      
      this.UserService.retirarSaldo(retirarNumber,coinsCegados).subscribe(data =>{
        console.log('IDs firmados por el servidor: ' + data['dataBlindSigned']);
        const coinsCegadosFirmados = data['dataBlindSigned'];

        const coinsDescegadosFirmados = coinsCegadosFirmados.map((blindSignedCoin:string) => {
          return  this.cegar.descegarMensaje(hexToBigint(blindSignedCoin));  
        });

        const coinsDescegadosFirmadosHex = coinsDescegadosFirmados.map((SignedCoin:bigint) => {
          return  bigintToHex(SignedCoin);  
        });

        const coinsDescegadosVerified = coinsDescegadosFirmados.map((SignedCoin:bigint) => {
          return  bigintToHex(this.rsaService.getClavePubServer().verify(SignedCoin));  
        });


        console.log('Coins verificados: ',coinsDescegadosVerified);
        console.log('Coins generados: ',idsGenerados);
        this.UserService.insertCoins(coinsDescegadosFirmadosHex).subscribe(data=>{
          console.log(data['msg']);
        })
        
       /* 
        let j=0;
        let dif=false;

        while(j<coinsDescegadosVerified.length && dif==false){
          if(coinsDescegadosVerified[j]!= idsGenerados[j]) dif= true;
        }
        if(dif==true){
          console.log("La firma no esta verificada para la moneda con ID:",idsGenerados[j]);
        }
        else{
          this.UserService.insertCoins(coinsDescegadosVerified).subscribe(data=>{
            console.log(data['msg']);
          })
        }*/

      })
    }
  
  }
}
