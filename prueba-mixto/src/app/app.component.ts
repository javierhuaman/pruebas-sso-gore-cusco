import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GoreAuthService } from '@gore-cusco/sso-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Prueba MIXTO</h1>
    <nav>
      <a routerLink="/ingresar">Ingresar</a> | <a routerLink="/gestion">Gestión</a> |
      <a routerLink="/consultas">Consultas</a>
    </nav>
    <p>
      Estado: <strong>{{ auth.estado() }}</strong> ·
      Contexto: <strong>{{ auth.contexto() ?? '—' }}</strong>
      @if (auth.autenticado()) {
        · {{ auth.usuario()?.nombre }}
        <button type="button" (click)="auth.salir()">Cerrar sesión</button>
      }
    </p>
    <router-outlet />
  `,
})
export class AppComponent {
  readonly auth = inject(GoreAuthService);
}