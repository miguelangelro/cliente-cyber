import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mensaje } from '../models/mensaje.model'
import { signResponse } from '../models/rsa.model';

@Injectable({
  providedIn: 'root'
})
export class SeguimientopacienteService {

  constructor(private http: HttpClient) { }
/*
  getAll(): Observable<SeguimientoPaciente[]>{
    return this.http.get<SeguimientoPaciente[]>(environment.API + "/seguimiento/all");
  }

  getSeguimiento(id: String): Observable<SeguimientoPaciente>{
    return this.http.get<SeguimientoPaciente>(environment.API+ "/seguimiento/" + id);
  }
*/
  sendMessage(msg: String): Observable<signResponse>{
    return this.http.post<signResponse>(environment.API + '/rsa/post', {
      message: msg
    });
  }

  /*deleteSeguimiento(id: String): Observable<any>{
    return this.http.delete(environment.API + "/seguimiento/"+id);
  }*/
  }

