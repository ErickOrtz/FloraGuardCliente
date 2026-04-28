import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';
import { LoginPage } from '../login/login.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: InicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule, CommonModule, FormsModule, LoginPage],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
