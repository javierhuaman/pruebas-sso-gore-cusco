import { Routes } from '@angular/router';
import { GoreSinServicioComponent,goreGuard, institucionalGuard } from '@gore-cusco/sso-angular';

const panel = () => import('./paginas/panel.component');
const aviso = () => import('./paginas/aviso.component');

export const routes: Routes = [
  // Avisos: fuera de los guards
  { path: 'sin-servicio', component: GoreSinServicioComponent },
  { path: 'sin-acceso', loadComponent: aviso, data: { mensaje: 'No tiene acceso a este sistema o a esta opción.' } },
  { path: 'sin-acceso-institucional', loadComponent: aviso, data: { mensaje: 'Su cuenta no tiene acceso institucional vigente.' } },
  // Exige además el rol BIEN_BAJA de pinst-backend
  {
    path: 'bajas',
    canActivate: [goreGuard({ contexto: 'INSTITUCIONAL', roles: ['BIEN_BAJA'] })],
    loadComponent: panel,
    data: { titulo: 'Bajas de bienes (rol BIEN_BAJA)' },
  },
  // Contexto INSTITUCIONAL, unidad ejecutora y SYSTEM_ACCESS
  {
    path: '',
    pathMatch: 'full',
    canActivate: [institucionalGuard],
    loadComponent: panel,
    data: { titulo: 'Inventario: sistema INSTITUCIONAL' },
  },
];
