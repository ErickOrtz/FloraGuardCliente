

import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario, UsuarioRequest } from 'src/app/services/usuario';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, HttpClientModule]
})
export class RegistrarPage {
  form: FormGroup;
  showConfirm = false;
  passwordMismatch = false;
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(private fb: FormBuilder, private router: Router, private usuarioService: Usuario) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      confirm: [''],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['']
    });

    this.form.get('password')?.valueChanges.subscribe(val => {
      this.showConfirm = !!val;
      if (!val) {
        this.form.get('confirm')?.setValue('');
        this.passwordMismatch = false;
      }
    });

    this.form.get('confirm')?.valueChanges.subscribe(val => {
      this.passwordMismatch = val && val !== this.form.get('password')?.value;
    });
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.form.value.password !== this.form.value.confirm) {
      this.passwordMismatch = true;
      return;
    }

    // Separar nombre completo
    const nombreCompleto = this.form.value.nombre.trim().split(' ');
    let nombre = '';
    let apellidoPaterno = '';
    let apellidoMaterno = '';
    if (nombreCompleto.length === 1) {
      nombre = nombreCompleto[0];
    } else if (nombreCompleto.length === 2) {
      nombre = nombreCompleto[0];
      apellidoPaterno = nombreCompleto[1];
    } else if (nombreCompleto.length >= 3) {
      nombre = nombreCompleto.slice(0, -2).join(' ');
      apellidoPaterno = nombreCompleto[nombreCompleto.length - 2];
      apellidoMaterno = nombreCompleto[nombreCompleto.length - 1];
    }

    const datos: UsuarioRequest = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      usuario: this.form.value.usuario,
      contrasena: this.form.value.password,
      correo: this.form.value.correo,
      telefono: this.form.value.telefono
    };

    this.loading = true;
    this.usuarioService.registrarUsuarioGuardian(datos).subscribe({
      next: (resp) => {
        console.log('Respuesta del servidor:', resp);
        this.loading = false;
        this.successMsg = 'Registro correcto';
        // Guardar el usuario en localStorage para precargarlo en login
        localStorage.setItem('preload_username', this.form.value.usuario);
        console.log('usuario en localStorage:', localStorage.getItem('preload_username'));
        this.form.reset();
        // Redirigir inmediatamente al login
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.error('Error de conexión al backend:');
        console.error('Error del servidor:', err);
        this.loading = false;
        if (err.codigo === -1) {
          this.errorMsg = 'El correo ya está registrado.';
        } else if (err.codigo === -2) {
          this.errorMsg = 'El nombre de usuario ya está registrado.';
        } else {
          this.errorMsg = err.mensaje || 'Error al registrar usuario.';
        }
      }
    });
  }
}
