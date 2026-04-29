import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Arbol } from 'src/app/services/arbol'; // ajusta ruta
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
    private arbolService: Arbol
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.arbolService.obtenerArbolPorId(+id, "MOBILE", localStorage.getItem('device_id') || '').then((res: any) => {
        if (res && res.data) {
          this.arbol = res.data;
        }
      }).catch((err) => {
        console.error('Error:', err);
      });
    }
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
          this.arbol = resp.data;
          this.cerrarModal();
        } else {
          console.error(resp.mensaje);
        }

      });
  }
}