import { User, UserRecibido } from './../models/rsa.model';
import { UserService } from './../services/user.service';
import { HomeService } from './../services/home.service';
import { Mensaje } from '../models/mensaje.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../models/producto.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listProductos: Producto[] = [];
  usuario: UserRecibido;

  constructor(private _homeService: HomeService, private UserService: UserService) { }
  

  ngOnInit(): void {
    this.obtenerProductos();
    this.UserService.getUser().subscribe(data =>{
      if(data['ok']==true){
        this.usuario = data['user'];
      }
    });
  }
  

  obtenerProductos() {
    this._homeService.getProductos().subscribe(data => {
      console.log("vemos data recibida:", data);
      this.listProductos = data.productos;
    }, error => {
        console.log(error);
      })
  }

  comprar(id:string, valor:number){
    if(valor>this.usuario.coins.length){
      console.log("No se puede adquirir el producto, fondos insuficientes.")
    }
    else{
      let coinsAenviar:string[]=[];
      for(let i=0; i<valor; i++){
        coinsAenviar.push(this.usuario.coins.pop())
      }
      this.UserService.verifyRegisteredCoins(coinsAenviar).subscribe(data=>{
        if(data['ok']== true){
          console.log(data['msg'])
          this.UserService.insertProducto(id, coinsAenviar).subscribe(data => {
            if(data['ok']== true){
            this.ngOnInit();
          }
        })
        }
      })
  }
  }
}