# 🦙 Lama Buyer - Marketplace de Ropa Usada

Aplicación web para compradores en un marketplace especializado en venta de ropa usada y vintage.

## 📋 Características

- ✅ Autenticación segura con Clerk
- ✅ Catálogo de productos con búsqueda y filtros
- ✅ Carrito de compras funcional
- ✅ Sistema de órdenes y pedidos
- ✅ Seguimiento de envíos
- ✅ Perfil de usuario
- ✅ Paleta de colores personalizada
- ✅ Diseño responsive
- ✅ APIs mockeadas para desarrollo independiente

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 14+ con TypeScript y React
- **Estilos:** Tailwind CSS
- **Base de Datos:** PostgreSQL con Prisma ORM
- **Autenticación:** Clerk
- **Validación:** Zod
- **Deploy:** Vercel

## 🚀 Instalación

### Requisitos Previos

- Node.js 18+
- npm o yarn
- PostgreSQL
- Cuenta en Clerk

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/LourdesSantillan/lama-buyer.git
   cd lama-buyer
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con:
   - `DATABASE_URL`: URL de conexión a PostgreSQL
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clave pública de Clerk
   - `CLERK_SECRET_KEY`: Clave secreta de Clerk

4. **Migrar base de datos**
   ```bash
   npm run prisma:migrate
   ```

5. **Cargar datos de prueba (seed)**
   ```bash
   npm run prisma:seed
   ```

6. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (auth)/              # Páginas de autenticación
│   ├── (buyer)/             # Páginas del comprador
│   ├── (admin)/             # Páginas de administración
│   └── api/                 # Rutas API
├── components/              # Componentes reutilizables
├── lib/                     # Utilidades y configuraciones
└── styles/                  # Estilos globales
```

## 🎨 Paleta de Colores

- **Primario:** #8fa18d (Header)
- **Secundario:** #6f7f6d (Detalles)
- **Light:** #f6f1e7 (Fondo)
- **Card:** #ede6d8 (Tarjetas)
- **Dark:** #37413d (Texto)

## 📚 Páginas Principales

### Usuario Comprador

- **`/`** - Página principal
- **`/productos`** - Catálogo con búsqueda y filtros
- **`/productos/[id]`** - Detalle del producto
- **`/carrito`** - Carrito de compras
- **`/checkout`** - Proceso de compra
- **`/pedidos`** - Mis pedidos
- **`/pedidos/[id]`** - Detalle del pedido
- **`/perfil`** - Perfil del usuario

## 🔌 APIs Disponibles

### Productos
- `GET /api/productos` - Listar productos con filtros
- `GET /api/productos/[id]` - Detalle del producto

### Carrito
- `GET /api/carrito` - Obtener carrito
- `POST /api/carrito/items` - Agregar al carrito
- `PUT /api/carrito/items` - Actualizar cantidad
- `DELETE /api/carrito/items` - Remover del carrito
- `DELETE /api/carrito` - Vaciar carrito

### Pedidos
- `GET /api/pedidos` - Listar pedidos del usuario
- `GET /api/pedidos/[id]` - Detalle del pedido
- `POST /api/pedidos` - Crear pedido

### APIs Mock (Externas)
- `GET /api/mock/payments/metodos-pago` - Métodos de pago
- `GET /api/mock/shipping/envios/orden/[id]` - Estado de envío

## 🔐 Autenticación

La aplicación utiliza Clerk para autenticación. El flujo es:

1. Usuario se registra/inicia sesión en `/sign-in` o `/sign-up`
2. Clerk crea el usuario
3. Se sincroniza automáticamente a la base de datos Prisma
4. Se crean preferencias de comprador por defecto

## 💾 Modelo de Datos

### Comprador
- ID único
- Email
- Nombre
- DNI, teléfono
- Dirección de envío
- Relación con Clerk

### Producto
- Título, descripción
- Precio
- Imagen
- Categoría, talle, marca
- Estado (excelente, buen estado, regular)
- Stock

### ItemCarrito
- Referencia a comprador
- Referencia a producto
- Cantidad
- Precio unitario

### Pedido
- Número de orden
- Estado (pendiente, pagado, enviado, entregado)
- Montos (producto, envío, total)
- Dirección de envío
- Método de pago

### EstadoEnvio
- Código de seguimiento
- Empresa logística
- Estado actual
- Historial de estados

## 🧪 Testing

Para hacer testing manual de los flujos:

1. **Registro e inicio de sesión**
   - Ir a `/sign-up` y crear una cuenta
   - Verificar que se cree el registro de comprador en BD

2. **Búsqueda de productos**
   - Navegar a `/productos`
   - Usar filtros de categoría, talle, precio
   - Buscar por texto

3. **Agregar al carrito**
   - Ir a detalle de producto (`/productos/[id]`)
   - Agregar cantidad
   - Ir a `/carrito` y verificar

4. **Crear pedido**
   - Desde carrito, ir a checkout
   - Ingresar dirección y método de pago
   - Verificar que se cree el pedido

5. **Ver pedidos**
   - Ir a `/pedidos`
   - Hacer clic en un pedido
   - Ver detalles y estado de envío

## 📦 Dependencias Principales

- `react@18` - UI library
- `next@14` - Framework
- `@clerk/nextjs` - Authentication
- `@prisma/client` - ORM
- `tailwindcss` - CSS
- `zod` - Validation

## 🚢 Deploy a Vercel

1. Subir código a GitHub
2. Conectar repositorio en Vercel
3. Configurar variables de entorno
4. Deploy automático

## 📝 Requisitos Completados

✅ Páginas y componentes reutilizables en Next.js  
✅ API propia con REST endpoints  
✅ Base de datos PostgreSQL propia  
✅ Autenticación (Clerk)  
✅ Panel básico de administración  
✅ Búsqueda y paginación  
✅ Manejo de errores y 404  
✅ Validación de formularios (Zod)  
✅ Accesibilidad básica  
✅ Consumo de API externa (mocks)  
✅ Datos precargados (seed)  

## 🤝 Contribución

Este proyecto es parte del marketplace Lama. Para cambios importantes, consulta con el equipo.

## 📞 Soporte

Para problemas o preguntas, contactar a: info@lama.com

---

**Hecho con 🦙 por Lourdes Santillan**
