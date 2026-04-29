import { Component } from '@angular/core';
import { Usuario } from 'src/app/services/usuario';
import { Auth } from 'src/app/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})

export class Tab3Page {
  user: any;

  constructor(
    private usuarioService: Usuario,
    private auth: Auth,
    private router: Router
  ) {}
  async logout() {
    const deviceId = localStorage.getItem('device_id') || '';
    const refreshToken = localStorage.getItem('refresh_token') || '';
    try {
      await this.auth.logout({ deviceId, refreshToken });
    } catch (err) {
      // Si hay error igual limpiamos local
      this.auth.logoutLocal();
    }
    this.router.navigate(['/login']);
  }

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
