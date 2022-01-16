import { SeguimientopacienteService } from './../services/seguimientopaciente.service';
import { Mensaje } from '../models/mensaje.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //seguimientos: SeguimientoPaciente[];
  constructor(private seguimientoPacienteService: SeguimientopacienteService, private router: Router) { }


  ngOnInit(): void {
   // this.seguimientoPacienteService.getAll().subscribe( data =>{
     // this.seguimientos = data;
    //})
  }
  /*delete(id){
    this.seguimientoPacienteService.deleteSeguimiento(id).subscribe(async data =>{
      window.location.reload();
    })
  }*/
}