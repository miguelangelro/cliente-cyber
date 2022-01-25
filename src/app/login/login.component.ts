import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bigintToHex, textToBigint } from 'bigint-conversion';
import { AuthService } from '../services/auth.service';
import { RsacontrollerService } from '../services/rsacontroller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    correo: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router,private rsacontrollerService:RsacontrollerService) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  login(): void {
    const { correo, password } = this.form;
    console.log(correo + "   "+ password)

    const emailEncrypted= this.rsacontrollerService.pubKeyServer.encrypt(textToBigint(correo));
    const passEncrypted= this.rsacontrollerService.pubKeyServer.encrypt(textToBigint(password));

    this.authService.login(bigintToHex(emailEncrypted), bigintToHex(passEncrypted)).subscribe(
      (data) => {
        if(data['ok']== true){
        localStorage.setItem('ACCESS_TOKEN', data['token']);
        console.log(this.authService.getToken());
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigateByUrl('/home');
        }
        else return;
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
