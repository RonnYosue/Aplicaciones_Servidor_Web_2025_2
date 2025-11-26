# Examen — Pregunta 1: Dominio de Compras (NestJS + TypeORM)

- entities/
  - `product.entity.ts` — definición de productos.
  - `cart.entity.ts` — carrito de compra (estado y items).
  - `cart-item.entity.ts` — línea de carrito (producto + cantidad).
- dtos/
  - `create-product.dto.ts`, `update-product.dto.ts`
  - `create-cart.dto.ts`, `add-cart-item.dto.ts`
- services/
  - `product.service.ts` — CRUD básico de productos.
  - `cart.service.ts` — lógica de negocio para carrito: añadir, actualizar cantidades, eliminar, checkout.

Justificación del dominio (según las imágenes):

Las capturas muestran una única página de compra donde el usuario selecciona un producto, elige cantidad, color y otras variantes, y ve un resumen de su pedido en un panel lateral (carrito). A partir de ese flujo se deducen las siguientes responsabilidades: gestión de productos (catálogo), gestión del carrito (líneas de productos seleccionados) y control de stock para evitar ventas por encima del inventario.

Descripción clara de cada entidad:

- Product
  - Propósito: representar un artículo vendible en el catálogo.
  - Atributos relevantes: id, name, description, price, stock, imageUrl, timestamps.

- Cart
  - Propósito: representar un carrito de compras (puede ser anónimo o vinculado a un usuario) con estado (active, ordered, cancelled).
  - Atributos relevantes: id, items (relación con CartItem), userId (opcional), status, timestamps.
  - Método utilitario: getTotal() para calcular el total del carrito.

- CartItem
  - Propósito: representar una línea del carrito que junta un producto con una cantidad.
  - Atributos relevantes: id, quantity, relación al Product (eager load), relación al Cart, timestamps.

Relaciones entre entidades explicadas:

- Product 1..* CartItem: un producto puede estar en muchas líneas de carrito (diferentes carritos o distintas líneas).
- Cart 1..* CartItem: un carrito contiene múltiples líneas (CartItem). Las operaciones de cascada permiten crear/eliminar líneas junto con el carrito.

Reglas principales de negocio interpretadas en el flujo:

- No permitir añadir más cantidad de un producto a un carrito que la que hay en stock.
- Si se intenta modificar un carrito que ya fue ordenado (status !== 'active'), bloquear mutaciones.
- En el checkout se valida el stock una vez más y se decrementa el inventario al confirmar la orden.
- Si se añade el mismo producto dos veces al carrito, se suman las cantidades en la misma línea (en lugar de crear líneas duplicadas).
- El carrito puede crearse sin usuario (sesión anónima) o con un `userId` si el usuario está autenticado.

---

## ✅ Estado Completo del Examen

### Pregunta 1: Dominio ✅
- 3 entidades con TypeORM (Product, Cart, CartItem)
- DTOs con validaciones completas
- Servicios con lógica de negocio

### Pregunta 2: API REST ✅
- CRUD completo para cada entidad
- 4 endpoints especializados
- Documentación completa en `REST-API.md`

### Pregunta 3: WebSocket + Webhook ✅
- WebSocket Gateway para notificaciones en tiempo real
- Webhook intermediario (REST → Webhook → WebSocket)
- Cliente HTML de prueba
- Documentación completa en `PREGUNTA-3-WEBSOCKET.md`

### Pregunta 4: GraphQL sobre REST ✅
- GraphQL consume REST (NO acceso directo a base de datos)
- HttpModule/Axios para llamadas HTTP
- 6 consultas de negocio con transformación de datos
- Apollo Studio en http://localhost:3000/graphql
- Solo queries (no mutations)
- Documentación completa en `PREGUNTA-4-GRAPHQL.md`

---

## 🚀 Cómo Ejecutar

```powershell
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run start:dev
```

El servidor arrancará en `http://localhost:3000`

**URLs importantes:**
- **REST API:** http://localhost:3000/products, /carts, etc.
- **GraphQL Apollo Studio:** http://localhost:3000/graphql
- **WebSocket Cliente:** Abrir `websocket-client.html` en navegador

---

## 📚 Documentación Completa

- **ENTREGA-FINAL.md** - Resumen ejecutivo completo del examen
- **README.md** - Este archivo (Pregunta 1)
- **REST-API.md** - Pregunta 2: Todos los endpoints REST
- **PREGUNTA-3-WEBSOCKET.md** - Pregunta 3: Flujo WebSocket completo
- **PREGUNTA-4-GRAPHQL.md** - Pregunta 4: GraphQL queries y transformaciones
- **INSTRUCCIONES-PRUEBA.md** - Guía paso a paso para probar todo
