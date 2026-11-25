import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GoreAuthService } from '@gore-cusco/sso-angular';

/** Portada pública: se ve sin iniciar sesión. */
@Component({
  selector: 'app-portada',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Mesa de Partes Virtual</h2>
    @if (auth.autenticado()) {
      <p>Hola, {{ auth.usuario()?.nombre }}.</p>
      <a routerLink="/tramites">Ir a mis trámites</a>
      <button type="button" (click)="auth.salir()">Cerrar sesión</button>
    } @else {
      <button type="button" (click)="auth.ingresar()">Ingresar</button>
    }
  `,
})
export default class PortadaComponent {
  readonly auth = inject(GoreAuthService);
}
