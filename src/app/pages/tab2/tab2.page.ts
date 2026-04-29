import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Arbol } from '../../services/arbol';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/services/usuario';

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
    private router: Router,
    private usuarioService: Usuario
  ) {}
   user: any;

  ngOnInit() {
    this.cargarArbolesAdoptados();
  }

  async ionViewDidEnter() {
    this.cargarArbolesAdoptados();
  }
  
  async cargarArbolesAdoptados() {
    try {
      const res: any = await this.arbolService.getArbolesAdoptados("MOBILE", localStorage.getItem('device_id') || '');
      console.log('Respuesta:', res);
      this.arboles = res.data;
    } catch (err: any) {
      console.error('Error:', err);
    }
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
