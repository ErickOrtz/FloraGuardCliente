import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Arbol {
  private apiUrl = `${environment.url}/arbol`;

  constructor(private http: HttpClient) { }

  getArboles() {
    return this.http.get(`${this.apiUrl}/listar/arboles`);
  }

  cambiarNombreArbol(idArbol: number, nombreNuevo: string) {
    const params = new HttpParams()
      .set('idArbol', idArbol)
      .set('nombreNuevo', nombreNuevo);

    return this.http.post(`${this.apiUrl}/cambiar/nombre/arbol`, null, { params });
  }

  obtenerArbolPorId(id: number) {
    return this.http.get(`${this.apiUrl}/obtener/arbol`, {
      params: { idArbol: id }
    });
  }
}
