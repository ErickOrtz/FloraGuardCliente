import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-olvide-password',
  templateUrl: './olvide-password.page.html',
  styleUrls: ['./olvide-password.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, HttpClientModule]
})
export class OlvidePasswordPage {
  loading = false;
  errorMsg = '';
  form = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  goToRegistrar() {
    this.router.navigateByUrl('/registrar');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Aquí irá la lógica para enviar el correo de restablecimiento
    // Ejemplo: this.auth.sendResetPasswordEmail(this.form.value.correo)
  }
}
