import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url = 'http://localhost:3000/tienda/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }
}
