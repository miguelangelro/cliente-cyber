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

  data: string;

  seguimientoForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private seguimientoPacienteService: SeguimientopacienteService, private router: Router) { }

  ngOnInit(): void {
    this.seguimientoForm = this.formBuilder.group({
      message: ['', [Validators.required, Validators.nullValidator]],
      /*fecha: ['', [Validators.required, Validators.nullValidator]],
      telefono: ['', [Validators.required, Validators.nullValidator]],
      dni: ['', [Validators.required, Validators.nullValidator]],
      fiebre: ['', [Validators.required, Validators.nullValidator]],
      tos: ['', [Validators.required, Validators.nullValidator]],
      dificultad: ['', [Validators.required, Validators.nullValidator]],
      malestar: ['', [Validators.required, Validators.nullValidator]]*/
    });
  }
  get formControls(){
    return this.seguimientoForm.controls;
  }

  sendMessage(): void{
    if(this.seguimientoForm.invalid){
      return;
    }
    const message = this.seguimientoForm.value.message;
    this.data = message;
    const text = {
      'message': message, 
    };



  this.seguimientoPacienteService.sendMessage(text.message).subscribe(async data =>{
    this.router.navigateByUrl('/new');
  })
  }
  goBack(){
    this.router.navigateByUrl('/home');
  }
}


