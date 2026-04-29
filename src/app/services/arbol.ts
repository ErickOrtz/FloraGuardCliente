import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class Arbol {
  private apiUrl = `${environment.API_FLORAGUARD_URL}/arbol`;
  private apiUrlAdopcion = `${environment.API_FLORAGUARD_URL}/adopciones`;

  constructor(private http: HttpClient, private auth: Auth) { }

  getArboles() {
    return this.http.get(`${this.apiUrl}/listar/arboles`);
  }

  cambiarNombreArbol(idArbol: number, nombreNuevo: string) {
    const params = new HttpParams()
      .set('idArbol', idArbol)
      .set('nombreNuevo', nombreNuevo);

    return this.http.post(`${this.apiUrl}/cambiar/nombre/arbol`, null, { params });
  }

  async obtenerArbolPorId(id: number, clientType: 'WEB' | 'MOBILE', deviceId: string) {
    let idArbol = id
    let token = localStorage.getItem('access_token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    try {
      return this.http.get(`${this.apiUrl}/obtener/arbol`, {
        params: { idArbol },
        headers
      }).toPromise();
    } catch (error: any) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Intentar refrescar el token
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw error;
        try {
          const refreshResponse = await this.auth.refreshToken({ refreshToken, clientType, deviceId });
          this.auth.setAccessToken(refreshResponse.accessToken);
          this.auth.setRefreshToken(refreshResponse.refreshToken);
          // Reintentar la petición con el nuevo token
          token = refreshResponse.accessToken;
          const retryHeaders = {
            Authorization: `Bearer ${token}`
          };
          return await this.http.get<any>(`${this.apiUrl}/obtener/arboles/adoptados`, { headers: retryHeaders }).toPromise();
        } catch (refreshError) {
          throw refreshError;
        }
      } else {
        throw error;
      }
    }
  }

  async getArbolesAdoptados(clientType: 'WEB' | 'MOBILE', deviceId: string) {
    let token = localStorage.getItem('access_token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    try {
      return await this.http.get<any>(`${this.apiUrl}/obtener/arboles/adoptados`, { headers }).toPromise();
    } catch (error: any) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Intentar refrescar el token
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw error;
        try {
          const refreshResponse = await this.auth.refreshToken({ refreshToken, clientType, deviceId });
          this.auth.setAccessToken(refreshResponse.accessToken);
          this.auth.setRefreshToken(refreshResponse.refreshToken);
          // Reintentar la petición con el nuevo token
          token = refreshResponse.accessToken;
          const retryHeaders = {
            Authorization: `Bearer ${token}`
          };
          return await this.http.get<any>(`${this.apiUrl}/obtener/arboles/adoptados`, { headers: retryHeaders }).toPromise();
        } catch (refreshError) {
          throw refreshError;
        }
      } else {
        throw error;
      }
    }
  }

  async adoptarArbol(id: number) {
    let token = localStorage.getItem('access_token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    try {
      // El backend espera el parámetro como @RequestParam, así que debe ir en la URL
      return await this.http.post(`${this.apiUrlAdopcion}/adoptar?idArbol=${id}`, {}, { headers }).toPromise();
    } catch (error: any) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Intentar refrescar el token
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw error;
        try {
          const refreshResponse = await this.auth.refreshToken({ refreshToken, clientType: 'MOBILE', deviceId : localStorage.getItem('device_id') || '' });
          this.auth.setAccessToken(refreshResponse.accessToken);
          this.auth.setRefreshToken(refreshResponse.refreshToken);
          // Reintentar la petición con el nuevo token
          token = refreshResponse.accessToken;
          const retryHeaders = {
            Authorization: `Bearer ${token}`
          };
          return await this.http.post(`${this.apiUrlAdopcion}/adoptar?idArbol=${id}`, {}, { headers: retryHeaders }).toPromise();
        } catch (refreshError) {
          throw refreshError;
        }
      } else {
        throw error;
      }
    }
  }
}
