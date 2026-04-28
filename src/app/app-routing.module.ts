import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
<<<<<<< HEAD
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage)
=======
    path: '',
    loadChildren: () => import('./pages/detalle-arbol/tabs/tabs.module').then(m => m.TabsPageModule)
>>>>>>> 8241f93314b7aa2c2ce31a5b145041974bac55d7
  },
  {
    path: 'detalle-arbol/:id',
    loadComponent: () => import('./pages/detalle-arbol/detalle-arbol.page').then(m => m.DetalleArbolPage)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'olvide-password',
    loadChildren: () => import('./pages/olvide-password/olvide-password.module').then( m => m.OlvidePasswordPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}