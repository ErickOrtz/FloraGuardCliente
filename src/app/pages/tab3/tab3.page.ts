import { Component } from '@angular/core';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  constructor(private usuarioService: Usuario) { }
  
  user: any;

  async ionViewDidEnter() {
    let accesToken = localStorage.getItem('access_token');
    if (accesToken) {
      try {
        const data = await this.usuarioService.getUsuarioActual(accesToken);
        console.log('Usuario actual:', data);
        this.user = data.data.usuario;
      } catch (err: any) {
        console.error('Error al obtener usuario actual:', err);
      }
    }
  }
}
