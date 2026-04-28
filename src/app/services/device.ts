import { Injectable } from '@angular/core';

const KEY_DEVICE = 'device_id';

@Injectable({
  providedIn: 'root',
})
export class Device {
  /*
    * Obtiene el ID del dispositivo desde el almacenamiento local o lo crea si no existe.
    * @returns {Promise<string>} El ID del dispositivo.
    * @throws {Error} Si ocurre un error al generar o almacenar el ID del dispositivo.
    * @description Este método primero intenta obtener el ID del dispositivo desde
    *  el almacenamiento local. Si no existe, genera un nuevo
    *  ID utilizando crypto.randomUUID(), lo almacena en el local storage
    *  y luego lo devuelve.
    * @author Erick Ortiz Gomez
    * @version 1.0.0
    * @since 22-04-2026
  */  
  async obtenerOCrearIdDispositivo(): Promise<string> {
    let id = localStorage.getItem(KEY_DEVICE);
    if (id) return id;
    id = crypto.randomUUID();
    localStorage.setItem(KEY_DEVICE, id);
    return id;
  }
}