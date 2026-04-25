import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-arbol',
  templateUrl: './detalle-arbol.page.html',
  styleUrls: ['./detalle-arbol.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetalleArbolPage implements OnInit {

  arbol: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.arbol = nav?.extras?.state?.['arbol'];

    console.log('Arbol recibido:', this.arbol);
  }
}