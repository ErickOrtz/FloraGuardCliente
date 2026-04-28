import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
<<<<<<<< HEAD:src/app/pages/tab2/tab2.page.ts
import { Arbol } from '../../services/arbol';
========
import { Arbol } from '../../../services/arbol';
>>>>>>>> 8241f93314b7aa2c2ce31a5b145041974bac55d7:src/app/pages/detalle-arbol/tab2/tab2.page.ts
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab2Page implements OnInit {

  arboles: any[] = [];

  constructor(
    private arbolService: Arbol,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarArboles();
  }

  cargarArboles() {
    this.arbolService.getArboles().subscribe({
      next: (data: any) => {
        this.arboles = data.data;
      },
      error: (err) => console.error(err)
    });
  }

  verDetalle(arbol: any) {
    this.router.navigate(['/tabs/tab2/detalle', arbol.id]);
  }

}