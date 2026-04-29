import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Arbol } from '../../services/arbol';
import { Usuario } from 'src/app/services/usuario';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab1Page implements OnInit {

  arboles: any[] = [];
  currentPage = 0;
  pageSize = 5;
  modalBusquedaAbierto = false;
  idBusqueda: number | null = null;

  constructor(private arbolService: Arbol, private usuarioService: Usuario, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.cargarArboles();
  }

  ionViewDidEnter() {
    this.cargarArboles();
  }

  cargarArboles() {
    this.arbolService.getArboles().subscribe({
      next: (data: any) => {
        console.log('Datos:', data);
        this.arboles = data.data;
      },
      error: (err) => {
        console.error('❌ ERROR COMPLETO:', JSON.stringify(err));
        console.error('❌ STATUS:', err.status);
        console.error('❌ MESSAGE:', err.message);
        console.error('❌ URL:', err.url);
      }
    });
  }

  get arbolesPaginados() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.arboles.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.arboles.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  async adoptar(arbol: any) {
    try {
      const res: any = await this.arbolService.adoptarArbol(arbol.id);
      console.log('Respuesta de adopción:', res);
      if (res.exito) {
        alert('¡Árbol adoptado con éxito!');
        this.cargarArboles();
      } else {
        alert('Error al adoptar el árbol: ' + res.mensaje);
      }
    } catch (err: any) {
      console.error('Error al adoptar el árbol:', err);
      alert('Error al adoptar el árbol. Por favor, inténtalo de nuevo.');
    }
  }

  abrirModalBusqueda() {
    this.modalBusquedaAbierto = true;
  }

  cerrarModalBusqueda() {
    this.modalBusquedaAbierto = false;
    this.idBusqueda = null;
  }

  buscarPorId() {
    if (!this.idBusqueda) return;
    this.arbolService.obtenerArbolPorId(this.idBusqueda, "MOBILE", localStorage.getItem('device_id') || '').then((res: any) => {
      console.log('Resultado de búsqueda:', res);
      if (res && res.data) {
        this.arboles = [res.data]; // Mostrar solo el árbol encontrado
      } else {
        console.warn('No se encontró el árbol con ID:', this.idBusqueda);
        this.arboles = []; // Limpiar lista si no se encuentra
      }
    }).catch((err) => {
      console.error('Error:', err);
      this.arboles = [];
      this.cerrarModalBusqueda();
    });
  }
  async abrirBusqueda() {
    const alert = await this.alertCtrl.create({
      header: 'Buscar árbol por ID',
      inputs: [
        {
          name: 'id',
          type: 'number',
          placeholder: 'Ej: 1'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Buscar',
          handler: async (data) => {
            const id = data.id;
            if (!id) return;

            try {
              const res: any = await this.arbolService.obtenerArbolPorId(
                id,
                "MOBILE",
                localStorage.getItem('device_id') || ''
              );

              if (res.data.id) {
                console.log(res.data);
                this.arboles = [res.data];
                this.currentPage = 0;
              } else {
                this.cargarArboles();
                const alert = await this.alertCtrl.create({
                header: 'Sin resultados',
                message: 'No se encontró ningún árbol con ese ID 🌳',
                buttons: ['OK']
              });

              await alert.present();
              }

            } catch (err) {
              console.error(err);
              this.arboles = [];
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
