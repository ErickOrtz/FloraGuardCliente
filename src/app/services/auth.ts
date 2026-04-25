import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export type Cliente = 'WEB' | 'MOBILE';


/*
  * Interfaz que representa la respuesta de una solicitud de inicio de 
  * sesión en la aplicación móvil.
  * @interface LoginResponseMobile
  * @property {string} accessToken - El token de acceso generado para el usuario.
  * @property {string} refreshToken - El token de actualización para renovar el acceso.
  * @property {string} expiresAt - La fecha y hora de expiración del token de acceso.
  * @property {string} message - Un mensaje adicional sobre el resultado del inicio de sesión.
  * @description Esta interfaz se utiliza para tipar la respuesta que se recibe al intentar iniciar sesión desde un dispositivo móvil.
  * @author Erick Ortiz Gomez
  * @version 1.0.0
  * @since 22-04-2026
*/
export interface LoginResponseMobile{
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  message: string;
}

export interface LoginResponseWeb{
  accessToken: string;
  expiresAt: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // URL base del servicio de autenticación, obtenida del archivo de entorno.
  private baseUrlServicio = environment.API_FLORAGUARD_URL;
  
  /*Constructor de la clase Auth.
  * @param {HttpClient} http - El cliente HTTP de Angular para realizar solicitudes al backend.
  * @description Este constructor inyecta el servicio HttpClient, que se 
  * utiliza para comunicarse con el backend de autenticación.
  * @author Erick Ortiz Gomez
  * @version 1.0.0
  * @since 22-04-2026
  */
  constructor(private http: HttpClient) {}

  /* Método para iniciar sesión en la aplicación.
  * @param {Object} params - Un objeto que contiene los parámetros necesarios para el inicio de sesión.
  * @param {string} params.username - El nombre de usuario del usuario que intenta iniciar sesión.
  * @param {string} params.password - La contraseña del usuario.
  * @param {string} params.deviceId - El ID del dispositivo desde el cual se intenta iniciar sesión.
  * @param {Cliente} params.clientType - El tipo de cliente (WEB o MOBILE).
  * @returns {Promise<LoginResponseMobile | LoginResponseWeb>} Una promesa que resuelve con la respuesta del backend, que puede ser de tipo
  *  móvil o web dependiendo del cliente.
  * @throws {Error} Si ocurre un error durante la solicitud de inicio de sesión.
  * @description Este método envía una solicitud POST al endpoint de inicio de sesión del backend, pasando los parámetros 
  * necesarios. La respuesta se maneja como una promesa, y se espera que el backend devuelva 
  * un objeto con los tokens de acceso y actualización, así como la fecha de expiración y un mensaje.  
  * @author Erick Ortiz Gomez
  * @version 1.0.0
  * @since 22-04-2026
  */
  async login(params: {
    username: string;
    password: string;
    deviceId: string;
    clientType: Cliente; 
  }): Promise<LoginResponseMobile | LoginResponseWeb> {
    return await firstValueFrom(
      this.http.post<LoginResponseMobile | LoginResponseWeb>(
        `${this.baseUrlServicio}/api/auth/login`,
        params,
        { withCredentials: params.clientType === 'WEB' }
      )
    );
  }

  setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  logoutLocal() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

}
