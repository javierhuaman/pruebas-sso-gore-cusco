import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoreAuthService, GoreContexto } from '@gore-cusco/sso-angular';

@Component({
  selector: 'app-ingresar',
  standalone: true,
  template: `
    <h2>¿Cómo deseas ingresar?</h2>
    @if (requiere === 'INSTITUCIONAL') {
      <p>Esta sección es solo para servidores del GORE Cusco.</p>
    }
    <button type="button" (click)="entrar('INSTITUCIONAL', '/gestion')">Acceder institucional</button>
    <button type="button" (click)="entrar('EXTERNO', '/consultas')">Acceder ciudadano</button>
  `,
})
export default class IngresarComponent {
  private readonly auth = inject(GoreAuthService);
  private readonly ruta = inject(ActivatedRoute);
  /** El guard indica qué contexto pide la sección y a qué página volver. */
  readonly requiere = this.ruta.snapshot.queryParamMap.get('contexto');

  entrar(contexto: GoreContexto, inicio: string): void {
    const volverA = this.ruta.snapshot.queryParamMap.get('returnUrl') ?? inicio;
    void this.auth.ingresar(contexto, { volverA });
  }
}
