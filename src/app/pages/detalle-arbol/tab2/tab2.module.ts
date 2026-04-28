import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
<<<<<<<< HEAD:src/app/pages/tab2/tab2.module.ts
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
========
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';
>>>>>>>> 8241f93314b7aa2c2ce31a5b145041974bac55d7:src/app/pages/detalle-arbol/tab2/tab2.module.ts

import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    Tab2Page
  ],
})
export class Tab2PageModule {}
