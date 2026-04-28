
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth, Cliente } from 'src/app/services/auth';
import { Device } from 'src/app/services/device';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, HttpClientModule]
})

export class LoginPage {

  goToOlvidePassword() {
    this.router.navigateByUrl('/olvide-password');
  }

  goToRegistrar() {
    this.router.navigateByUrl('/registrar');
  }

  ionViewDidEnter() {
    //this.testBackendConnection();
  }

  async testBackendConnection() {
    this.loading = true;
    try {
      const result = await this.auth.getTestConnection();
      let mensajeData = result.data.mensaje + ' - ' + result.data.descripcion;  
      alert('Conexión exitosa al backend: ' + mensajeData);
    } catch (e: any) {
      console.error('Error de conexión al backend:', e);
      this.errorMsg = 'Error de conexión al backend';
      this.showErrorModal = true;
    } finally {
      this.loading = false;
    }
  }


  loading = false;
  errorMsg = '';
  showErrorModal = false;
  alertButtons = [
    {
      text: 'Cerrar',
      role: 'cancel',
      handler: () => { this.showErrorModal = false; }
    }
  ];

  // Para tu caso: en app móvil usa MOBILE
  clientType: Cliente = 'MOBILE';


  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private device: Device,
    private router: Router
  ) {
    // Precargar usuario si existe en localStorage
    const preloadUser = localStorage.getItem('preload_username');
    if (preloadUser) {
      this.form.get('username')?.setValue(preloadUser);
      localStorage.removeItem('preload_username');
    }
  }

  async onSubmit() {
    this.errorMsg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    try {
      const deviceId = await this.device.obtenerOCrearIdDispositivo();
      const res: any = await this.auth.login({
        username: this.form.value.username!,
        password: this.form.value.password!,
        deviceId,
        clientType: this.clientType,
      });

      this.auth.setAccessToken(res.accessToken);
      // MOBILE trae refreshToken en body
      if (this.clientType === 'MOBILE' && res.refreshToken) {
        this.auth.setRefreshToken(res.refreshToken);
      }

      // luego cambia la ruta a tabs
      await this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (e: any) {
      console.error('Login error:', e);
      this.errorMsg = e?.error?.message ?? 'Error al iniciar sesión';
      this.showErrorModal = true;
    } finally {
      this.loading = false;
    }
  }
}