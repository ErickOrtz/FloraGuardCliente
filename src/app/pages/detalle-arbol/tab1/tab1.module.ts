import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
<<<<<<<< HEAD:src/app/pages/tab1/tab1.module.ts
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
========
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';
>>>>>>>> 8241f93314b7aa2c2ce31a5b145041974bac55d7:src/app/pages/detalle-arbol/tab1/tab1.module.ts

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    Tab1Page
  ]
})
export class Tab1PageModule {}
