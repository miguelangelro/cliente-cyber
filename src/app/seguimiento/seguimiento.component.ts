import { SeguimientopacienteService } from './../services/seguimientopaciente.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguimientoPaciente} from '../models/seguimiento.model';


@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  seguimientoForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private seguimientoPacienteService: SeguimientopacienteService, private router: Router) { }

  ngOnInit(): void {
    this.seguimientoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.nullValidator]],
      fecha: ['', [Validators.required, Validators.nullValidator]],
      telefono: ['', [Validators.required, Validators.nullValidator]],
      dni: ['', [Validators.required, Validators.nullValidator]],
      fiebre: ['', [Validators.required, Validators.nullValidator]],
      tos: ['', [Validators.required, Validators.nullValidator]],
      dificultad: ['', [Validators.required, Validators.nullValidator]],
      malestar: ['', [Validators.required, Validators.nullValidator]]
    });
  }
  get formControls(){
    return this.seguimientoForm.controls;
  }

  addSeguimiento(): void{
    if(this.seguimientoForm.invalid){
      return;
    }
    const nombre = this.seguimientoForm.value.nombre;
    const fecha = this.seguimientoForm.value.fecha;
    const telefono = this.seguimientoForm.value.telefono;
    const dni = this.seguimientoForm.value.dni;
    const fiebre = this.seguimientoForm.value.fiebre;
    const tos= this.seguimientoForm.value.tos;
    const dificultad = this.seguimientoForm.value.dificultad;
    const malestar = this.seguimientoForm.value.malestar;
    
    const seguimiento = {'nombre': nombre, 
    'fecha': fecha, 'telefono': telefono, 'dni': dni, 'fiebre': fiebre,
  'tos':tos, 'dificultad': dificultad, 'malestar': malestar};

  this.seguimientoPacienteService.addSeguimiento(seguimiento).subscribe(async data =>{
    this.router.navigateByUrl('/home');
  })
  }
  goBack(){
    this.router.navigateByUrl('/home');
  }
}


