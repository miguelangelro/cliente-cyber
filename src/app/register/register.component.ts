import { User } from './../models/rsa.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    nombre: null,
    correo: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { nombre, correo, password } = this.form;
    this.authService.register(nombre, correo, password).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('ACCESS_TOKEN', data['token']);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigateByUrl('/home');
      },
      err => {
        console.log(err.error.message);
        this.isSignUpFailed = true;
      }
    );
  }
}