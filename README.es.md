<p align="center">
  <img src="public/favicon.svg" alt="Logo de I Can See You" width="120" />
</p>

<h1 align="center">I Can See You</h1>

Aplicación web demo que simula y visualiza las señales de distracción detectables por el navegador durante una sesión cronometrada. Experimenta lo que las plataformas de exámenes típicas pueden (y no pueden) detectar cuando pierdes el foco: cambios de pestaña, pérdida de foco de la ventana, salidas de pantalla completa y más.

<p align="center">
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-6.1-BC52EE?style=flat-square&logo=astro" alt="Astro" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  <a href="https://pnpm.io"><img src="https://img.shields.io/badge/pnpm-10.32-F69220?style=flat-square&logo=pnpm" alt="pnpm" /></a>
  <a href="https://pages.cloudflare.com"><img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflarepages" alt="Cloudflare Pages" /></a>
</p>

> Este proyecto demuestra **solo señales del navegador**, no vigilancia a nivel de sistema operativo. La transparencia es un principio central.

## Stack Tecnológico

- **[Astro](https://astro.build)** 6.1 — shell estático + enrutado
- **[React](https://react.dev)** 19 — islas interactivas para la UI de la sesión
- **[Tailwind CSS](https://tailwindcss.com)** 4.2 — estilos utilitarios
- **TypeScript** 6.0 en modo estricto
- **pnpm** 10.32 — gestor de paquetes
- **Estado en el cliente** — sin backend para el MVP
- **sessionStorage** — transferencia ligera de resultados entre `/demo` y `/results`
- **[@fontsource/nanum-pen-script](https://fontsource.org/fonts/nanum-pen-script)** + **[@fontsource/lxgw-wenkai-mono-tc](https://fontsource.org/fonts/lxgw-wenkai-mono-tc)** — tipografía
- **[Lucide React](https://lucide.dev)** — iconos
- **[Cloudflare Pages](https://pages.cloudflare.com)** — despliegue

## Primeros Pasos

### Requisitos previos

- Node.js >= 22.12.0
- pnpm (corepack recomendado: `corepack enable`)

### Instalación

```sh
pnpm install
```

### Desarrollo

```sh
pnpm dev
```

Abre el servidor de desarrollo en `http://localhost:4321`.

### Verificación de tipos

```sh
pnpm check
```

### Build de producción

```sh
pnpm build
pnpm preview
```

## Estructura del Proyecto

```
src/
├── core/                   # Lógica de dominio (detección, eventos, mascota, resultados)
│   ├── detectionEngine.ts
│   ├── eventStore.ts
│   ├── mascotController.ts
│   ├── permissions.ts
│   └── resultsBuilder.ts
├── components/
│   ├── demo/               # UI de la sesión (sesión activa, temporizador, incidentes)
│   ├── landing/            # Hero, sección de cobertura
│   ├── layout/             # Header, footer, shell
│   ├── mascot/             # Componente MascotEyes
│   ├── support/            # Vista de fallback/error
│   └── ui/                 # Primitivas compartidas (Button, Card)
├── layouts/                # Layouts de Astro (Layout, DemoLayout)
├── pages/                  # Rutas: /, /demo, /results, /signals
├── styles/                 # CSS global, estilos de la mascota
└── assets/                 # Recursos estáticos (SVGs)
```

## Rutas

| Ruta        | Descripción                                        |
|-------------|----------------------------------------------------|
| `/`         | Página de inicio con CTA y resumen de cobertura    |
| `/demo`     | Sesión de detección cronometrada (60–90 s)         |
| `/results`  | Panel de resumen con métricas y advertencia        |
| `/signals`  | Referencia de señales de detección y tabla         |

## Señales de Detección

La app registra estos eventos del navegador durante una sesión:

| Señal                     | API / Evento                            | Confianza |
|---------------------------|-----------------------------------------|-----------|
| Cambio de visibilidad     | `visibilitychange`                      | Alta      |
| Foco / blur de ventana    | `window blur/focus`                     | Alta      |
| Salida de pantalla completa| `fullscreenchange`                     | Media     |
| Cursor sale del viewport | `mouseleave` en `document`              | Media     |
| Comportamiento de pegar   | evento `paste`                          | Baja      |
| Heurística DevTools       | Discrepancia de tamaño de ventana (mejor esfuerzo) | Baja |

Cada incidente se normaliza en un `DetectionEvent` con `id`, `type`, marcas de tiempo, duración, `confidence` y `source`.

## Sistema de Diseño

- **Identidad visual:** estilo doodle / dibujado a mano, paleta monocroma, fondo de cuaderno
- **Mascota:** ojos expresivos con pupilas que siguen el cursor y animación de parpadeo
- **Tipografía:** Nanum Pen Script (display) + LXGW WenKai Mono TC (cuerpo)
- **Paleta:** `#111` / `#444` / `#8A8A8A` / `#EAEAEA` / `#FAFAFA`

## CI

Un workflow de GitHub Actions ejecuta la verificación de tipos y el build en cada push y pull request hacia `main`. Ver `.github/workflows/ci.yml`.

## Contribuciones

1. Haz un fork del repositorio
2. Crea una rama de característica (`git checkout -b feat/tu-caracteristica`)
3. Haz tus commits (`git commit -m "feat: add your feature"`)
4. Haz push a la rama (`git push origin feat/tu-caracteristica`)
5. Abre un Pull Request

Por favor sigue las convenciones descritas en `AGENTS.md` — preserva el alcance del MVP aprobado, mantén la identidad visual doodle monocroma y prioriza la claridad y honestidad para el usuario.

## Licencia

[MIT](./LICENSE) — 2025 Miguel Alvarez
