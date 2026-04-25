import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Arbol } from 'src/app/services/arbol'; // ajusta ruta

@Component({
  selector: 'app-detalle-arbol',
  templateUrl: './detalle-arbol.page.html',
  styleUrls: ['./detalle-arbol.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalleArbolPage implements OnInit {

  arbol: any;

constructor(
  private router: Router,
  private arbolService: Arbol
) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.arbol = nav?.extras?.state?.['arbol'];

    console.log('Arbol recibido:', this.arbol);
  }

  modalAbierto: boolean = false;
  nuevoNombre: string = '';

  abrirModalEditar() {
    this.nuevoNombre = this.arbol?.nombre || '';
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }


  guardarNombre() {
    if (!this.nuevoNombre || this.nuevoNombre.trim() === '') {
      return;
    }

    this.arbolService
      .cambiarNombreArbol(this.arbol.id, this.nuevoNombre)
      .subscribe((resp: any) => {

        if (resp.success == true) {
          this.arbol.nombre = this.nuevoNombre;
          this.cerrarModal();
        } else {
          console.error(resp.mensaje);
        }

      });
  }
}