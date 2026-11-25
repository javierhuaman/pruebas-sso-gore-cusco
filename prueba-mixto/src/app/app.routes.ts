import { Routes } from '@angular/router';
import { externoGuard, GoreSinServicioComponent, institucionalGuard } from '@gore-cusco/sso-angular';

const panel = () => import('./paginas/panel.component');
const aviso = () => import('./paginas/aviso.component');

export const routes: Routes = [
  // Página de los dos botones y avisos: fuera de los guards
    { path: 'sin-servicio', component: GoreSinServicioComponent },
  { path: 'ingresar', loadComponent: () => import('./paginas/ingresar.component') },
  { path: 'sin-acceso', loadComponent: aviso, data: { mensaje: 'No tiene acceso a esta sección.' } },
  { path: 'sin-acceso-institucional', loadComponent: aviso, data: { mensaje: 'Su cuenta no tiene acceso institucional vigente.' } },
  // Funciones de servidores del GORE
  {
    path: 'gestion',
    canActivate: [institucionalGuard],
    loadComponent: panel,
    data: { titulo: 'Gestión: parte INSTITUCIONAL' },
  },
  // Funciones para ciudadanos
  {
    path: 'consultas',
    canActivate: [externoGuard],
    loadComponent: panel,
    data: { titulo: 'Consultas: parte EXTERNO' },
  },
  { path: '', pathMatch: 'full', redirectTo: 'ingresar' },
];
