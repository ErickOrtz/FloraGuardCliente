import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Arbol {
  private apiUrl = `${environment.API_FLORAGUARD_URL}/arbol`;

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

  getArbolesAdoptados() {
    const token = localStorage.getItem('access_token');

    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<any>(`${this.apiUrl}/obtener/arboles/adoptados`, { headers });
  }

  adoptarArbol(id: number) {
    const token = localStorage.getItem('access_token');

    return this.http.post(
      `http://localhost:8081/floraguard/adopciones/adoptar?idArbol=${id}`,
      {}, // 👈 body vacío
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
