import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SeguimientoPaciente } from '../models/seguimiento.model'

@Injectable({
  providedIn: 'root'
})
export class SeguimientopacienteService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<SeguimientoPaciente[]>{
    return this.http.get<SeguimientoPaciente[]>(environment.API + "/seguimiento/all");
  }

  getSeguimiento(id: String): Observable<SeguimientoPaciente>{
    return this.http.get<SeguimientoPaciente>(environment.API+ "/seguimiento/" + id);
  }

  addSeguimiento(nuevoSeguimiento: SeguimientoPaciente): Observable<any>{
    return this.http.post(environment.API + '/seguimiento/add', nuevoSeguimiento);
  }

  deleteSeguimiento(id: String): Observable<any>{
    return this.http.delete(environment.API + "/seguimiento/"+id);
  }
  }

