import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Arbol {
  private apiUrl = `${environment.url}/arbol`;

  constructor(private http: HttpClient) {}

  getArboles() {
    return this.http.get(`${this.apiUrl}/listar/arboles`);
  }
}
