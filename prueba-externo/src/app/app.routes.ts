import { Routes } from '@angular/router';
import { externoGuard , GoreSinServicioComponent } from '@gore-cusco/sso-angular';

export const routes: Routes = [
  // Portada pública, sin guard
   { path: 'sin-servicio', component: GoreSinServicioComponent },
  { path: '', pathMatch: 'full', loadComponent: () => import('./paginas/portada.component') },
  {
    path: 'sin-acceso',
    loadComponent: () => import('./paginas/aviso.component'),
    data: { mensaje: 'No tiene acceso a este sistema.' },
  },
  // Cualquier usuario que ingresó como EXTERNO
  {
    path: 'tramites',
    canActivate: [externoGuard],
    loadComponent: () => import('./paginas/panel.component'),
    data: { titulo: 'Mis trámites: sistema EXTERNO' },
  },
];
