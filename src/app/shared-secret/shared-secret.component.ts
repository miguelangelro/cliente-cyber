import { Component, OnInit } from '@angular/core';
import { RsacontrollerService } from '../services/rsacontroller.service';
import { SharedsecretService } from '../services/sharedsecret.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shared-secret',
  templateUrl: './shared-secret.component.html',
  styleUrls: ['./shared-secret.component.css']
})
export class SharedSecretComponent implements OnInit {

  constructor(private cifrarsecret: SharedsecretService) { }

  ngOnInit(): void {
  }

  mensajeCompartido;
  keysShared: number;
  keysThreshold: number=0;
  sharedSecretsKeys;
  keysRecovery: string[] = [];
  secretRecovery:any;
  errorSecretRecovery: Boolean = false;
  errorsecretSharing: Boolean = false;

  async secretSharing(): Promise<void> {
    if (this.mensajeCompartido === undefined || this.mensajeCompartido === '') {
      this.errorsecretSharing = true;
      return;
    }
    this.errorsecretSharing = false;
    let dataEnviar = { secret: this.mensajeCompartido, numKeysSecrets: this.keysShared, numkeysThreshold : this.keysThreshold };

     (await this.cifrarsecret.getSecretKeys(dataEnviar)).subscribe(
      async (res) => {
        console.log("*****SECRET SHARING****")
        console.log("Claves de secreto compartido", res)
        this.sharedSecretsKeys = res;

      },
      (err) => {
        console.log('error');
        Swal.fire('Error en la recogida de la claves Compartidas', '', 'error');
      }
    );
  }

  async RecoverySecret(): Promise<void> {
    this.errorsecretSharing = false;
    let dataEnviar ={keysRecovery: this.keysRecovery };
    
    (await this.cifrarsecret.recoverSecret(dataEnviar)).subscribe(
      async (res) => {
        this.secretRecovery = res['Recuperado'];
        // console.log("EEEPA", this.secretRecovery)
      },
      (err) => {
        console.log('error');
        Swal.fire('Error en la recuperación de las claves compartidas', '', 'error');
      }
    );
  }

}
