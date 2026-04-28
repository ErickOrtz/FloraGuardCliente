import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Arbol } from '../../services/arbol';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonicModule, CommonModule]
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

  constructor(private arbolService: Arbol) { }

  ngOnInit() {
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
}
