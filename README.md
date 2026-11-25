# pruebas-sso-gore-cusco

Tres aplicaciones Angular 19 mínimas que muestran cómo integrar un sistema con el IAM / Keycloak del GORE Cusco usando la librería `@gore-cusco/sso-angular`. Cada una corresponde a un tipo de sistema.

| Proyecto | Tipo de sistema | Cliente en Keycloak | Puerto | Qué muestra |
|---|---|---|---|---|
| `prueba-institucional` | INSTITUCIONAL | `pinst-frontend` | 4301 | Login obligatorio con `institucionalGuard`. La ruta `/bajas` exige además el rol `BIEN_BAJA` (`goreGuard`). Cierre de sesión por inactividad a 1 minuto. |
| `prueba-externo` | EXTERNO | `pext-frontend` | 4302 | Portada pública sin login. `/tramites` protegida con `externoGuard`. Con `alExpirarSesion: 'avisar'`, lo escrito en pantalla no se pierde cuando vence la sesión. |
| `prueba-mixto` | MIXTO | `pmix-frontend` | 4303 | Página `/ingresar` con dos botones (institucional o ciudadano). `/gestion` es la parte institucional y `/consultas` la parte externa. |

## Requisitos

- **Node.js** 18.19+, 20.11+ o 22+ (lo que pide Angular 19) y npm. Verifique con `node -v`.
- **Token de lectura del registro npm de GitLab** (deploy token con `read_package_registry`). Lo entrega el equipo IAM.
- **Cliente registrado en Keycloak** para cada prueba que vaya a usar. El equipo IAM lo configura con:
  - Redirect URI: `http://localhost:<puerto>/*`
  - Web origins: `http://localhost:<puerto>`

## 1. Configurar el acceso al registro npm (`.npmrc`)

La librería `@gore-cusco/sso-angular` se instala desde el registro privado de GitLab. En la carpeta de **cada** proyecto (`prueba-institucional`, `prueba-externo`, `prueba-mixto`) cree un archivo `.npmrc` con este contenido, reemplazando `[dominio]` e `[ID]` por los datos que entrega el equipo IAM:

```ini
@gore-cusco:registry=https://gitlab.[dominio]/api/v4/projects/[ID]/packages/npm/
//gitlab.[dominio]/api/v4/projects/[ID]/packages/npm/:_authToken="${NPM_TOKEN}"
```

Luego defina la variable `NPM_TOKEN` con su token:

```powershell
# Windows (una sola vez; después abra una terminal nueva)
setx NPM_TOKEN "su-token"
```

```bash
# Linux / macOS (en la terminal actual)
export NPM_TOKEN="su-token"
```

> `.npmrc` está en `.gitignore`: **nunca** lo suba al repositorio.

## 2. Configurar el entorno

Edite `src/environments/environment.ts` del proyecto y reemplace `[dominio]` por el dominio de Keycloak que entrega el equipo IAM:

```ts
export const environment = {
  keycloakUrl: 'https://auth-dev.[dominio]', // Keycloak de desarrollo (lo entrega el equipo IAM)
  clientId: 'pmix-frontend',                 // lo crea el IAM al registrar el sistema
  apiUrl: 'http://localhost:8083/api/',      // su backend (en esta prueba no se llama)
};
```

> No suba este archivo con los valores reales. Para que git ignore sus cambios locales:
> `git update-index --skip-worktree src/environments/environment.ts`

## 3. Instalar

Dentro de la carpeta del proyecto:

```bash
cd prueba-institucional
npm ci
```

`npm ci` instala exactamente las versiones de `package-lock.json`. Use `npm install` solo si va a agregar o actualizar dependencias.

## 4. Ejecutar

Cada prueba se levanta en su propio puerto, que debe coincidir con la redirect URI registrada en Keycloak:

| Proyecto | Comando | Abrir en |
|---|---|---|
| `prueba-institucional` | `npm start -- --port 4301` | http://localhost:4301 |
| `prueba-externo` | `npm start -- --port 4302` | http://localhost:4302 |
| `prueba-mixto` | `npm start -- --port 4303` | http://localhost:4303 |

Puede levantar las tres a la vez (una terminal por proyecto) para probar el inicio de sesión único (SSO) entre ellas.

Para generar la versión compilada: `npm run build` (queda en `dist/`).

## Estructura de cada proyecto

```
src/
├── environments/environment.ts   URL de Keycloak, clientId y URL del backend
├── app/
│   ├── app.config.ts             provideGoreAuth({ tipoSistema, clientId, ... })
│   ├── app.routes.ts             rutas y guards de la librería
│   ├── app.component.ts          encabezado con el estado de la sesión
│   └── paginas/                  panel (datos del token), aviso y portada / ingresar
├── index.html
└── main.ts
```

## Problemas frecuentes

| Síntoma | Causa probable |
|---|---|
| `npm ci` responde 401 o 404 en `@gore-cusco/sso-angular` | Falta el `.npmrc`, el token venció o `NPM_TOKEN` no está definido en esa terminal. |
| Keycloak muestra «Parámetro no válido: redirect_uri» | Levantó la prueba en otro puerto, o el cliente no tiene registrada la redirect URI de ese puerto. |
| Error de CORS en `/token` o «No fue posible conectar con el servicio de identidad» | Falta `http://localhost:<puerto>` en Web origins del cliente. |
