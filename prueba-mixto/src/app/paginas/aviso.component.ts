import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoreAuthService } from '@gore-cusco/sso-angular';

/** Página de aviso: siempre fuera de los guards. */
@Component({
  selector: 'app-aviso',
  standalone: true,
  template: `
    <h2>{{ mensaje }}</h2>
    @if (auth.autenticado()) {
      <p>Ingresaste como {{ auth.usuario()?.usuario }} ({{ auth.contexto() ?? 'sin contexto' }}).</p>
      <button type="button" (click)="auth.salir()">Ingresar con otra cuenta</button>
    }
  `,
})
export default class AvisoComponent {
  readonly auth = inject(GoreAuthService);
  readonly mensaje = inject(ActivatedRoute).snapshot.data['mensaje'] as string;
}
