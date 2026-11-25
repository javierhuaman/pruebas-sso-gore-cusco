import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GoreAuthService } from '@gore-cusco/sso-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Prueba EXTERNO</h1>

    <!-- Aviso de alExpirarSesion: 'avisar' (no saca al usuario de la página) -->
    @if (auth.sesionExpirada()) {
      <div role="alert" style="background:#fde8e8; border:1px solid #c00; padding:8px; margin:8px 0">
        Su sesión terminó. Lo que escribió sigue en pantalla.
        <button type="button" (click)="auth.ingresar()">Ingresar de nuevo</button>
      </div>
    }

    <nav><a routerLink="/">Portada</a> | <a routerLink="/tramites">Mis trámites</a></nav>

    <p>
      Estado de la sesión: <strong>{{ auth.estado() }}</strong>
      <button type="button" (click)="comprobar()">Comprobar sesión</button>
      {{ resultado() }}
    </p>
    <textarea rows="2" cols="50" placeholder="Escriba algo aquí: no se pierde si la sesión termina"></textarea>

    <router-outlet />
  `,
})
export class AppComponent {
  readonly auth = inject(GoreAuthService);
  readonly resultado = signal('');

  /** Pide un token vigente: si está por vencer, la librería lo renueva con Keycloak. */
  comprobar(): void {
    this.auth
      .tokenVigente()
      .then((token) => this.resultado.set(token ? 'Token vigente' : 'Sin sesión'))
      .catch(() => this.resultado.set('No se pudo renovar el token'));
  }
}