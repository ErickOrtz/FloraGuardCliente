import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Arbol } from '../../services/arbol';
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