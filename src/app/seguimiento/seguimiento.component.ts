import { bigintToHex, textToBigint, hexToBigint } from 'bigint-conversion';
import { SeguimientopacienteService } from './../services/seguimientopaciente.service';
import { RsacontrollerService } from '../services/rsacontroller.service'
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mensaje} from '../models/mensaje.model';


@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  data: string;
  dataEncrypted: string;

  seguimientoForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private rsacontrollerService:RsacontrollerService, private seguimientoPacienteService: SeguimientopacienteService, private router: Router) { }

  ngOnInit(): void {

    this.seguimientoForm = this.formBuilder.group({
      message: ['', [Validators.required, Validators.nullValidator]]
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

    let msgEncrypted= this.rsacontrollerService.pubKeyServer.encrypt(textToBigint(this.data));
    this.dataEncrypted= bigintToHex(msgEncrypted);

    this.seguimientoPacienteService.sendMessage(this.dataEncrypted).subscribe(data =>{
    let res = data.response
    let signdata= data.signedData;
  })
  }
  goBack(){
    this.router.navigateByUrl('/home');
  }
}


