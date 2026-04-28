import { Component } from '@angular/core';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  constructor(private usuarioService: Usuario) {}
    user: any;
    ionViewDidEnter() {
    let accesToken = localStorage.getItem('access_token');
    if (accesToken) {
      this.usuarioService.getUsuarioActual(accesToken).subscribe({
        next: (data) => {
          console.log('Usuario actual:', data);
          this.user = data.data.usuario;
        },
        error: (err) => {
          console.error('Error al obtener usuario actual:', err);
        }
      });
    }
  }
}
