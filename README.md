# 🧵 GoodThreads

Una aplicación e-commerce moderna construida con Angular para la venta de productos de anime y merchandising. 🎨

## 🚀 Inicio Rápido

### 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)

### ⚙️ Instalación

1. Clona el repositorio o navega al directorio del proyecto:
```bash
cd good-threads
```

2. Instala las dependencias:
```bash
npm install
```

### 🎯 Ejecutar el Proyecto

#### 🔥 Modo Desarrollo (Sin SSR)

Para iniciar el servidor de desarrollo:

```bash
npm start
```

O también puedes usar:

```bash
ng serve
```

Una vez iniciado, abre tu navegador y navega a:
```
http://localhost:4200
```

✨ La aplicación se recargará automáticamente cuando modifiques cualquier archivo fuente.

#### 🚀 Modo Producción con Express (SSR)

El proyecto utiliza **Express** para el renderizado del lado del servidor (SSR). Para ejecutarlo:

1. Primero, construye el proyecto:
```bash
npm run build
```

2. Luego, inicia el servidor Express:
```bash
npm run serve:ssr:good-threads
```

El servidor Express estará disponible en:
```
http://localhost:4000
```

💡 **Nota:** El puerto puede cambiarse usando la variable de entorno `PORT`.

## 🛠️ Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | 🚀 Inicia el servidor de desarrollo (puerto 4200) |
| `npm run build` | 📦 Construye el proyecto para producción |
| `npm run serve:ssr:good-threads` | 🌐 Inicia el servidor Express con SSR (puerto 4000) |
| `npm test` | 🧪 Ejecuta las pruebas unitarias |
| `ng generate component nombre-componente` | 🎨 Genera un nuevo componente |

## 🎨 Tecnologías Utilizadas

- **Angular 21** - Framework principal
- **Express 5** - Servidor Node.js para SSR
- **Tailwind CSS** - Estilos y diseño
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva
- **Angular SSR** - Renderizado del lado del servidor

## 📁 Estructura del Proyecto

```
good-threads/
├── src/
│   ├── app/
│   │   ├── features/      # 🎯 Características principales
│   │   ├── pages/         # 📄 Páginas de la aplicación
│   │   ├── shared/        # 🔄 Componentes compartidos
│   │   └── core/          # ⚙️ Servicios y modelos
│   └── assets/            # 🖼️ Imágenes y recursos
└── dist/                  # 📦 Build de producción
```

## 🛒 Características

- 🎯 Catálogo de productos
- 🛒 Carrito de compras
- 💳 Proceso de checkout
- 🎨 Diseño responsive
- ⚡ Renderizado del lado del servidor (SSR)

## 🧠 Decisiones de Diseño

### 🎨 Paleta de Colores

Se optó por una paleta **minimalista y atemporal** basada en blanco y negro como colores principales:

- **Blanco y Negro**: Colores base que transmiten elegancia, simplicidad y versatilidad. El contraste alto mejora la legibilidad y crea una experiencia visual limpia.
- **Rojo (#DC2626)**: Color de acento estratégicamente usado en elementos clave como el título principal del hero y botones de acción. El rojo aporta energía y llama la atención sin saturar la interfaz.
- **Grises**: Utilizados para estados hover, elementos secundarios y fondos sutiles, creando jerarquía visual sin competir con el contenido principal.

Esta elección refleja la filosofía de la marca: "Clothes without excess. Only style" - minimalismo con impacto.

### ⏳ Estados de Carga (Skeletons/Loaders)

Se implementó un **loader personalizado y distintivo** en lugar de skeletons tradicionales:

- **Loader Circular Animado**: Un círculo rotatorio con el texto "GOODTHREADS" que crea una experiencia de marca memorable durante la carga inicial.
- **Transiciones Suaves**: Fade-out elegante al finalizar la carga, evitando cortes bruscos que puedan generar frustración.
- **Estados de Loading Contextuales**: En listados de productos y detalles, se muestran mensajes claros ("Loading products...") manteniendo al usuario informado.

Esta decisión prioriza la **experiencia de marca** sobre la funcionalidad pura, haciendo que incluso el tiempo de espera sea parte de la identidad visual.

### 🛒 Experiencia del Carrito

El diseño del carrito se centra en **claridad, control y confianza**:

- **Estado Vacío Amigable**: Un ícono grande, mensaje claro y call-to-action directo ("View products") que guía al usuario sin frustración.
- **Resumen Sticky**: El resumen de orden permanece visible mientras el usuario navega, permitiendo siempre ver el total sin necesidad de hacer scroll.
- **Controles Intuitivos**: Botones de incremento/decremento de cantidad visibles y accesibles, con feedback visual inmediato.
- **Layout Responsive**: Grid adaptativo que prioriza el contenido en móviles y aprovecha el espacio en desktop.
- **Transiciones Suaves**: Hover states y animaciones sutiles que proporcionan feedback táctil sin distraer.

La prioridad fue crear un flujo de compra **sin fricciones**, donde el usuario siempre sepa dónde está, qué tiene en su carrito y cómo proceder.

### 🎯 Principios de Diseño Aplicados

- **Minimalismo**: Menos es más - cada elemento tiene un propósito.
- **Consistencia**: Patrones de diseño uniformes en toda la aplicación.
- **Accesibilidad**: Contraste adecuado, tamaños de fuente legibles y navegación clara.
- **Performance**: Carga rápida y transiciones optimizadas para no comprometer la velocidad.

## 📝 Notas

- El proyecto utiliza Angular CLI para el desarrollo
- Los estilos están configurados con Tailwind CSS
- El servidor de desarrollo se ejecuta en el puerto **4200** por defecto
- El servidor Express (SSR) se ejecuta en el puerto **4000** por defecto
- Express está configurado para servir archivos estáticos y manejar el renderizado SSR
- Para producción, siempre ejecuta `npm run build` antes de `npm run serve:ssr:good-threads`

---
