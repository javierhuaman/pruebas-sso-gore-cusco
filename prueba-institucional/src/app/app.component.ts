import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Prueba INSTITUCIONAL</h1>
    <nav><a routerLink="/">Inicio</a> | <a routerLink="/bajas">Bajas</a></nav>
    <router-outlet />
  `,
})
export class AppComponent {}
