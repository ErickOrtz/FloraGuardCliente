import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Auth } from './auth';

export interface UsuarioRequest {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  usuario: string;
  contrasena: string;
  correo: string;
  telefono: string;
}

export interface RespuestaGeneral {
  exito: boolean;
  mensaje: string;
  data: any;
  codigo: number;
}

@Injectable({
  providedIn: 'root',
})
export class Usuario {
  private apiUrl = environment.API_FLORAGUARD_URL + '/usuarios/registrar/guardian';

  constructor(private http: HttpClient, private auth: Auth) { }

  registrarUsuarioGuardian(datosUsuario: UsuarioRequest): Observable<RespuestaGeneral> {
    console.log('Enviando datos al backend:', datosUsuario);
    return this.http.post<RespuestaGeneral>(this.apiUrl, datosUsuario).pipe(
      catchError((error: HttpErrorResponse) => {
        let respuesta: RespuestaGeneral = {
          exito: false,
          mensaje: 'Error de conexión o del servidor.',
          data: null,
          codigo: error.status || 500
        };
        // Manejo de error anidado en error.error.error y error.error.message
        if (error.error) {
          // Si el backend responde con { error: -1, message: '...' }
          if (typeof error.error === 'object') {
            if ('error' in error.error && 'message' in error.error) {
              respuesta.codigo = error.error.error;
              respuesta.mensaje = error.error.message;
            } else if ('mensaje' in error.error && 'codigo' in error.error) {
              respuesta.codigo = error.error.codigo;
              respuesta.mensaje = error.error.mensaje;
            }
          }
        }
        console.error('Error HTTP:', error);
        return throwError(() => respuesta);
      })
    );
  }

  async getUsuarioActual(accessToken: string): Promise<any> {
    const url = `${environment.API_FLORAGUARD_URL}/usuarios/me`;
    let token = accessToken;
    const headers = { Authorization: `Bearer ${token}` };
    try {
      return await firstValueFrom(this.http.get<any>(url, { headers }));
    } catch (error: any) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Intentar refrescar el token
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw error;
        try {
          const refreshResponse = await this.auth.refreshToken({ refreshToken, clientType: "MOBILE", deviceId: localStorage.getItem('device_id') || '' });
          this.auth.setAccessToken(refreshResponse.accessToken);
          this.auth.setRefreshToken(refreshResponse.refreshToken);
          // Reintentar la petición con el nuevo token
          token = refreshResponse.accessToken;
          const retryHeaders = { Authorization: `Bearer ${token}` };
          return await firstValueFrom(this.http.get<any>(url, { headers: retryHeaders }));
        } catch (refreshError) {
          throw refreshError;
        }
      } else {
        let respuesta: RespuestaGeneral = {
          exito: false,
          mensaje: 'Error de conexión o del servidor.',
          data: null,
          codigo: error.status || 500
        };
        if (error.error) {
          if (typeof error.error === 'object') {
            if ('error' in error.error && 'message' in error.error) {
              respuesta.codigo = error.error.error;
              respuesta.mensaje = error.error.message;
            } else if ('mensaje' in error.error && 'codigo' in error.error) {
              respuesta.codigo = error.error.codigo;
              respuesta.mensaje = error.error.mensaje;
            }
          }
        }
        throw respuesta;
      }
    }
  }
}
