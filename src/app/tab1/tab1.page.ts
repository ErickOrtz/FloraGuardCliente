import { Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Arbol } from '../services/arbol';

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

  constructor(private arbolService: Arbol) {}

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
        console.error('Error:', err);
      }
    });
  }
}