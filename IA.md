# 🤖 Reporte de Uso de Inteligencia Artificial

Este documento detalla cómo se integraron herramientas de IA generativa para potenciar la calidad visual y la excelencia técnica del proyecto GoodThreads.

## 🛠️ Herramientas Utilizadas

- **ChatGPT** - Asistencia en arquitectura, patrones de diseño y desarrollo de componentes
- **Gemini** - Consultas sobre mejores prácticas y optimización de código
- **Remove.bg** - Eliminación de fondos en imágenes para mejor integración visual
- **Pinterest** - Inspiración para diseño UI/UX y tendencias de e-commerce

## 🎨 Generación de Activos Visuales (Imágenes y Video)

Se utilizaron modelos de IA generativa para crear una identidad visual cohesiva que reflejara el concepto "Clothes without excess. Only style".

### Prompts para Imágenes (Text-to-Image)

Para las colecciones de productos y banners, se proporcionó contexto sobre iluminación y estilo fotográfico:

**Prompt 1:**
```
High-end studio photography of a minimalist black streetwear hoodie, red snake graphic on the back, cinematic lighting, ultra-detailed texture, 8k resolution, professional fashion look.
```

**Prompt 2:**
```
Minimalist fashion collection banner for an anime-inspired streetwear brand, clean composition, high contrast black and white, professional e-commerce style.
```

### Prompts para Video (Text-to-Video)

Para el contenido dinámico del Hero, se buscó capturar movimiento y atmósfera:

**Prompt:**
```
Cinematic close-up of high-quality fabric movement, streetwear fashion aesthetic, moody lighting, dark background, smooth slow-motion, 4k.
```

### Procesamiento de Imágenes

- **Remove.bg:** Se utilizó para eliminar fondos de imágenes de productos, permitiendo una integración más limpia y profesional en el diseño de la aplicación.

## 🏛️ Arquitectura y Clean Code

Se consultó a **ChatGPT** y **Gemini** para validar y optimizar la estructura del proyecto bajo estándares de desarrollo modernos.

### Consultas de Directivas y Mejores Prácticas

Se utilizaron prompts específicos para determinar la mejor arquitectura:

**Prompt:**
```
¿Cuál es la mejor directiva o patrón en Angular para mantener Clean Code al separar componentes de lógica de negocio (Container) de componentes puramente visuales (Presentational)?
```

**Decisión tomada:** Se implementó el patrón Container-Presenter, asegurando que la lógica de consumo de servicios resida en componentes de funcionalidad (features), mientras que la UI sea reutilizable y tonta (dumb components).

## 🏗️ Desarrollo de Componentes

**ChatGPT** y **Gemini** asistieron en la estructura base de los elementos de la interfaz, los cuales fueron posteriormente refinados manualmente para cumplir con los requisitos de la prueba. **Pinterest** sirvió como fuente de inspiración para patrones de diseño y layouts de e-commerce.

- **Componentización de Cards:** Se solicitaron estructuras para componentes de tarjetas (cards) que fueran altamente reutilizables mediante el uso de `@Input()` y `@Output()`.

- **Refinamiento:** Aunque la IA propuso la estructura inicial, se modificó manualmente para integrar Angular Signals, asegurando una reactividad moderna y eficiente.

## ✅ Resumen de Intervención Humana

- **Lógica de Negocio:** Toda la integración del CartService y la persistencia en localStorage con protección para SSR fue desarrollada y supervisada manualmente.

- **Solución de Errores:** Se corrigieron errores críticos de entorno (como IntersectionObserver en Node.js) mediante lógica condicional de plataforma.

- **Accesibilidad:** Se añadieron manualmente etiquetas ARIA y labels para cumplir con los estándares de accesibilidad requeridos.
