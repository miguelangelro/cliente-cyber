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
  
  constructor(private _homeService: HomeService) { }


  ngOnInit(): void {
    this.obtenerProductos();
  }
  

  obtenerProductos() {
    this._homeService.getProductos().subscribe(data => {
      console.log("vemos data recibida:", data);
      this.listProductos = data.productos;
    }, error => {
        console.log(error);
      })
  }

}