import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleArbolPageRoutingModule } from './detalle-arbol-routing.module';

import { DetalleArbolPage } from './detalle-arbol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleArbolPageRoutingModule
  ],
  declarations: [DetalleArbolPage]
})
export class DetalleArbolPageModule {}
