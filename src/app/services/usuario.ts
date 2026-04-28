import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient) {}

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
}
