import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideGoreAuth } from '@gore-cusco/sso-angular';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideGoreAuth({
      tipoSistema: 'INSTITUCIONAL',
      clientId: environment.clientId,
      keycloakUrl: environment.keycloakUrl,
      apiUrls: [environment.apiUrl],
      cerrarPorInactividad: 1,   // 1 minuto, solo para la prueba
    }),
  ],
};
