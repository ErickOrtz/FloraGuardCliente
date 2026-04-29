import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Arbol } from 'src/app/services/arbol'; // ajusta ruta
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    private arbolService: Arbol,
    private alertCtrl: AlertController
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

  // abrirModalEditar() {
  //   this.nuevoNombre = this.arbol?.nombre || '';
  //   this.modalAbierto = true;
  // }

  // cerrarModal() {
  //   this.modalAbierto = false;
  // }


  // guardarNombre() {
  //   if (!this.nuevoNombre || this.nuevoNombre.trim() === '') {
  //     return;
  //   }

  //   this.arbolService
  //     .cambiarNombreArbol(this.arbol.id, this.nuevoNombre)
  //     .subscribe((resp: any) => {

  //       if (resp.success == true) {
  //         this.arbol = resp.data;
  //         this.cerrarModal();
  //       } else {
  //         console.error(resp.mensaje);
  //       }

  //     });
  // }
  async abrirModalEditar() {
    const alert = await this.alertCtrl.create({
      header: 'Editar nombre',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nuevo nombre',
          value: this.arbol?.nombre || ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const nuevoNombre = data.nombre;

            if (!nuevoNombre || nuevoNombre.trim() === '') {
              return false; // ❌ evita cerrar el alert
            }

            this.arbolService
              .cambiarNombreArbol(this.arbol.id, nuevoNombre)
              .subscribe({
                next: (resp: any) => {
                  if (resp.success === true) {
                    this.arbol = resp.data;
                  } else {
                    this.mostrarError(resp.mensaje);
                  }
                },
                error: () => {
                  this.mostrarError('Error al actualizar el nombre');
                }
              });
              return true;
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarError(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}