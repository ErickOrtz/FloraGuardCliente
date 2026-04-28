import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },
      {
        path: 'tab2/detalle/:id',
<<<<<<<< HEAD:src/app/pages/tabs/tabs-routing.module.ts
        loadComponent: () => import('../detalle-arbol/detalle-arbol.page')
========
        loadComponent: () => import('../detalle-arbol.page')
>>>>>>>> 8241f93314b7aa2c2ce31a5b145041974bac55d7:src/app/pages/detalle-arbol/tabs/tabs-routing.module.ts
          .then(m => m.DetalleArbolPage)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
