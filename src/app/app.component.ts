import { PaillierService } from './services/paillier.service';
import { RsacontrollerService } from './services/rsacontroller.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rsaKeyPair } from 'my-rsa';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

   constructor(rsa:RsacontrollerService, paillier: PaillierService){
     rsa.getPubKeyServer();
     rsa.sendPubkey();
     paillier.obtenerClavePublicaServer();
  }

}
