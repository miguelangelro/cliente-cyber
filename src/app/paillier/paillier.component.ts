import { Component, OnInit } from '@angular/core';
import { PaillierService } from '../services/paillier.service';
import Swal from 'sweetalert2';
import * as paillierBigint from 'paillier-bigint'
import * as bigintConversion from 'bigint-conversion';

@Component({
  selector: 'app-paillier',
  templateUrl: './paillier.component.html',
  styleUrls: ['./paillier.component.css']
})
export class PaillierComponent implements OnInit {

  Numero1 = 0;
  Numero2 = 0;
  Numero3 = 0;
  publicKeyPaillier;
  NumerosTotales =[];
  totalResultados;
  rec1;
  rec2;
  rec3;

  constructor(private paillier: PaillierService) { }

  ngOnInit(): void {
   
      
  }
 

}
