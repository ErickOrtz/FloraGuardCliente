import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
   imports: [IonicModule, CommonModule]
})
export class Tab1Page {

  arboles = [
    {
      nombre: 'Pino',
      descripcion: 'Este es un ejemplo del texto que tendrá el card.',
      imagen: 'assets/pino.jpg'
    },
    {
      nombre: 'Abeto',
      descripcion: 'Otro ejemplo de descripción para el árbol.',
      imagen: 'assets/pino.jpg'
    }
  ];

  constructor() {}

}