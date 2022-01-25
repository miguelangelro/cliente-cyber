import { bigintToHex, textToBigint, hexToBigint } from 'bigint-conversion';
import { Component, OnInit } from '@angular/core';
import { PaillierService } from '../services/paillier.service';
import Swal from 'sweetalert2';
import * as paillierBigint from 'paillier-bigint'
import * as bigintConversion from 'bigint-conversion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paillier',
  templateUrl: './paillier.component.html',
  styleUrls: ['./paillier.component.css']
})
export class PaillierComponent implements OnInit {

  m1Encrypted: bigint;
  m2Encrypted: bigint;
  sumEncrypted: bigint;
  data1: string;
  data2: string;
  dataEncrypted: string;
  paillierForm: FormGroup;
  publicKeyPaillier: paillierBigint.PublicKey;
  totalResultadoDesdeBacked;
  totalResultado;

  constructor(private formBuilder: FormBuilder, private paillier: PaillierService) { }

  ngOnInit(): void {
    this.paillierForm = this.formBuilder.group({
      message1: ['', [Validators.required, Validators.nullValidator]],
      message2: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  get formControls() {
    return this.paillierForm.controls;
  }

  sendMessage(): void {
    if (this.paillierForm.invalid) {
      return;
    }
    const message1 = this.paillierForm.value.message1;
    const message2 = this.paillierForm.value.message2;
    this.data1 = message1;
    this.data2 = message2;
    this.m1Encrypted = this.paillier.publicKeyPaillier.encrypt(BigInt(message1));
    this.m2Encrypted = this.paillier.publicKeyPaillier.encrypt(BigInt(message2));
    this.sumEncrypted = this.paillier.publicKeyPaillier.addition(this.m1Encrypted, this.m2Encrypted)
    this.dataEncrypted = bigintToHex(this.sumEncrypted);

    this.paillier.sendMessage(bigintToHex(this.m1Encrypted),bigintToHex(this.m2Encrypted)).subscribe(data => {
      if(data['ok']==true){
      this.totalResultadoDesdeBacked = data['msg']
      }
    })
  }

 

}
