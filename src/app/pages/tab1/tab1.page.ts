import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Arbol } from '../../services/arbol';
import { Usuario } from 'src/app/services/usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab1Page implements OnInit {

  // arboles = [
  //   {
  //     nombre: 'Pino',
  //     descripcion: 'Este es un ejemplo del texto que tendrá el card.',
  //     imagen: 'assets/pino.jpg'
  //   },
  //   {
  //     nombre: 'Abeto',
  //     descripcion: 'Otro ejemplo de descripción para el árbol.',
  //     imagen: 'assets/pino.jpg'
  //   }
  // ];

  arboles: any[] = [];
  currentPage = 0;
  pageSize = 5;
  modalBusquedaAbierto = false;
  idBusqueda: number | null = null;

  constructor(private arbolService: Arbol, private usuarioService: Usuario) { }

  ngOnInit() {
    this.cargarArboles();
  }

  ionViewDidEnter() {
    let accesToken = localStorage.getItem('access_token');
    if (accesToken) {
      this.usuarioService.getUsuarioActual(accesToken).subscribe({
        next: (data) => {
          console.log('Usuario actual:', data);
        },
        error: (err) => {
          console.error('Error al obtener usuario actual:', err);
        }
      });
    }
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

  adoptar(arbol: any) {
  this.arbolService.adoptarArbol(arbol.id).subscribe({
    next: (res: any) => {
      console.log('Adopción exitosa', res);

      // 🔥 Opcional: recargar lista
      this.cargarArboles();
    },
    error: (err) => {
      console.error('Error al adoptar:', err);
    }
  });
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

  this.arbolService.obtenerArbolPorId(this.idBusqueda).subscribe({
    next: (res: any) => {
      console.log('Resultado:', res);

      if (res.data) {
        this.arboles = [res.data]; // 👈 reemplaza lista
        this.currentPage = 0;
      } else {
        this.arboles = [];
      }

      this.cerrarModalBusqueda();
    },
    error: (err) => {
      console.error('Error:', err);
      this.arboles = [];
      this.cerrarModalBusqueda();
    }
  });
}
}
