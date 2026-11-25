import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoreAuthService } from '@gore-cusco/sso-angular';

/** Muestra lo que trae el token. Solo para la prueba: el backend valida todo de nuevo. */
@Component({
  selector: 'app-panel',
  standalone: true,
  template: `
    <h2>{{ titulo }}</h2>
    @if (auth.usuario(); as usuario) {
      <table border="1" cellpadding="6">
        <tr><th>Usuario</th><td>{{ usuario.usuario }} · {{ usuario.nombre }}</td></tr>
        <tr><th>Contexto</th><td>{{ auth.contexto() ?? 'sin contexto' }}</td></tr>
        <tr><th>Unidad ejecutora</th><td>{{ auth.unidadEjecutora() ?? '-' }}</td></tr>
        <tr><th>Unidad orgánica</th><td>{{ auth.unidadOrganica() ?? '-' }}</td></tr>
        <tr><th>SYSTEM_ACCESS</th><td>{{ auth.tieneAccesoAlSistema() ? 'sí' : 'no' }}</td></tr>
      </table>
      <p><button type="button" (click)="auth.salir()">Cerrar sesión</button></p>
    }
  `,
})
export default class PanelComponent {
  readonly auth = inject(GoreAuthService);
  readonly titulo = inject(ActivatedRoute).snapshot.data['titulo'] as string;
}
