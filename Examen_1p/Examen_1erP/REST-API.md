# Pregunta 2 - API REST Completa

## 🚀 Arrancar el Servidor

```powershell
npm run start:dev
```

El servidor estará disponible en: `http://localhost:3000`

---

## 📋 Endpoints Implementados

### **Products (Productos)**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/products` | Crear un producto nuevo |
| GET | `/products` | Listar todos los productos |
| GET | `/products/:id` | Obtener un producto por ID |
| PUT | `/products/:id` | Actualizar un producto |
| DELETE | `/products/:id` | Eliminar un producto |
| **GET** | `/products/low-stock/:threshold` | ⭐ **ESPECIALIZADO**: Productos con stock bajo |

### **Carts (Carritos)**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/carts` | Crear un carrito nuevo |
| GET | `/carts/:id` | Obtener un carrito por ID |
| PUT | `/carts/:id` | Actualizar estado/usuario del carrito |
| DELETE | `/carts/:id` | Cancelar un carrito |
| **POST** | `/carts/:id/items` | ⭐ **ESPECIALIZADO**: Añadir producto al carrito |
| **PUT** | `/carts/:cartId/items/:itemId` | ⭐ **ESPECIALIZADO**: Actualizar cantidad |
| **DELETE** | `/carts/:cartId/items/:itemId` | ⭐ **ESPECIALIZADO**: Eliminar item |
| **POST** | `/carts/:id/checkout` | ⭐ **ESPECIALIZADO**: Procesar checkout |
| **GET** | `/carts/:id/total` | ⭐ **ESPECIALIZADO**: Calcular total |

### **Cart Items**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/cart-items` | Crear item de carrito |
| GET | `/cart-items/:id` | Obtener item por ID |
| PUT | `/cart-items/:id` | Actualizar item |
| DELETE | `/cart-items/:id` | Eliminar item |

---

## 🧪 Ejemplos de Uso (con curl o Postman)

### 1️⃣ **Crear un Producto**

```bash
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Camisa Blanca",
  "description": "Camisa de algodón 100%",
  "price": 299.99,
  "stock": 50,
  "imageUrl": "https://example.com/camisa.jpg"
}
```

### 2️⃣ **Listar Todos los Productos**

```bash
GET http://localhost:3000/products
```

### 3️⃣ **Crear un Carrito**

```bash
POST http://localhost:3000/carts
Content-Type: application/json

{
  "userId": "user-123"
}
```

### 4️⃣ **Añadir Producto al Carrito** ⭐ Especializado

```bash
POST http://localhost:3000/carts/{cartId}/items
Content-Type: application/json

{
  "productId": "{productId}",
  "quantity": 2
}
```

### 5️⃣ **Obtener Total del Carrito** ⭐ Especializado

```bash
GET http://localhost:3000/carts/{cartId}/total
```

Respuesta:
```json
{
  "total": 599.98
}
```

### 6️⃣ **Hacer Checkout** ⭐ Especializado

```bash
POST http://localhost:3000/carts/{cartId}/checkout
```

Respuesta:
```json
{
  "cart": { 
    "id": "...", 
    "status": "ordered",
    "items": [...]
  },
  "charged": 599.98
}
```

### 7️⃣ **Productos con Stock Bajo** ⭐ Especializado

```bash
GET http://localhost:3000/products/low-stock/10
```

Retorna productos con stock menor a 10 unidades.

---

## ✅ Validaciones Implementadas

Todos los DTOs tienen validaciones con `class-validator`:

- ✅ `name`: String, máximo 200 caracteres
- ✅ `price`: Número positivo
- ✅ `stock`: Número positivo
- ✅ `quantity`: Mínimo 1
- ✅ `imageUrl`: Formato de URL válido
- ✅ `productId`/`cartId`: UUID válido
- ✅ `status`: Solo valores permitidos (active, ordered, cancelled)

### Ejemplo de Error de Validación

```bash
POST http://localhost:3000/products
{
  "name": "Producto",
  "price": -100  ❌
}
```

Respuesta:
```json
{
  "statusCode": 400,
  "message": ["El precio no puede ser negativo"],
  "error": "Bad Request"
}
```

---

## 🎯 Endpoints Especializados del Dominio

1. **POST /carts/:id/checkout**
   - Valida stock
   - Decrementa inventario
   - Cambia estado del carrito a "ordered"
   - Retorna total cobrado

2. **GET /carts/:id/total**
   - Calcula suma de (precio × cantidad) de todos los items

3. **POST /carts/:id/items**
   - Añade productos al carrito
   - Valida stock disponible
   - Si el producto ya existe, suma cantidades

4. **GET /products/low-stock/:threshold**
   - Útil para alertas de inventario
   - Retorna productos con stock bajo

---

## 🗄️ Base de Datos

- **Tipo**: SQLite
- **Archivo**: `database.sqlite` (se crea automáticamente)
- **Sincronización**: Automática (las tablas se crean al iniciar)

---

## 📂 Estructura de Carpetas

```
src/
├── rest/                    # 🆕 Controladores REST
│   ├── product.controller.ts
│   ├── cart.controller.ts
│   └── cart-item.controller.ts
├── modules/                 # 🆕 Módulos NestJS
│   ├── product.module.ts
│   └── cart.module.ts
├── entities/                # Entidades TypeORM
├── dtos/                    # DTOs con validaciones
├── services/                # Lógica de negocio
├── app.module.ts           # 🆕 Módulo raíz
└── main.ts                 # 🆕 Punto de entrada
```

---

## ✅ Cumplimiento de Requisitos

| Requisito | Estado |
|-----------|--------|
| CRUD completo por entidad (POST/GET/GET:id/PUT:id/DELETE:id) | ✅ |
| DTOs con validaciones `class-validator` | ✅ |
| Al menos un endpoint especializado del dominio | ✅ (4 implementados) |
| Carpeta `rest/` con controladores | ✅ |
| Validación global habilitada | ✅ |
| TypeORM configurado | ✅ |

---

## 🚀 Siguientes Pasos (Opcional)

- [ ] Agregar Swagger/OpenAPI para documentación interactiva
- [ ] Implementar autenticación JWT
- [ ] Agregar tests unitarios y e2e
- [ ] Implementar paginación en GET /products
- [ ] Agregar filtros y búsqueda
