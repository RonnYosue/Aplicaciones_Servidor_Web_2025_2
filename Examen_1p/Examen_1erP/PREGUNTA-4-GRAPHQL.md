# Pregunta 4 - GraphQL sobre REST con Transformación de Datos

## 🎯 **Arquitectura Implementada**

```
Apollo Studio → GraphQL Resolver → HttpService (Axios) → REST API → Base de Datos
                     ↓
              Transformación
              de Datos
```

### **Flujo Completo:**
1. **Apollo Studio** envía una query GraphQL
2. **GraphQL Resolver** recibe la petición
3. **GraphqlRestService** consume el **REST API** mediante **HttpService/Axios**
4. **REST API** obtiene datos de la base de datos
5. **GraphqlRestService** **TRANSFORMA** los datos antes de devolverlos
6. **GraphQL** devuelve los datos transformados al cliente

**⚠️ IMPORTANTE:** GraphQL **NO** accede directamente a la base de datos. Toda la información proviene del REST implementado en la Pregunta 2.

---

## 📂 **Archivos Creados**

### **Types (Esquema GraphQL):**
- `src/graphql/types/product.type.ts` - ProductType con campos transformados
- `src/graphql/types/cart.type.ts` - CartType y CartItemType transformados
- `src/graphql/types/business.type.ts` - Tipos para consultas de negocio

### **Servicios:**
- `src/graphql/services/graphql-rest.service.ts` - Consume REST y transforma datos

### **Resolvers:**
- `src/graphql/resolvers/shop.resolver.ts` - 6 consultas de negocio

### **Módulos:**
- `src/graphql/graphql.module.ts` - Módulo GraphQL con HttpModule

### **Esquema Auto-generado:**
- `src/schema.gql` - Esquema GraphQL generado automáticamente

---

## 🔄 **Transformaciones Implementadas**

### **1. ProductType (Producto Transformado)**

**Datos originales del REST:**
```json
{
  "id": "uuid",
  "name": "Laptop Dell",
  "price": 1299.99,
  "stock": 15
}
```

**Datos transformados en GraphQL:**
```json
{
  "id": "uuid",
  "name": "Laptop Dell",
  "price": 1299.99,
  "stock": 15,
  "disponible": true,                    // ← TRANSFORMADO: stock > 0
  "estadoStock": "DISPONIBLE",            // ← TRANSFORMADO: AGOTADO/BAJO/DISPONIBLE/ABUNDANTE
  "precioConDescuento": 1169.99           // ← TRANSFORMADO: 10% descuento
}
```

---

### **2. CartType (Carrito Transformado)**

**Datos originales del REST:**
```json
{
  "id": "uuid",
  "status": "active",
  "items": [
    { "product": {...}, "quantity": 2 }
  ]
}
```

**Datos transformados en GraphQL:**
```json
{
  "id": "uuid",
  "status": "active",
  "items": [...],
  "total": 2599.98,                      // ← TRANSFORMADO: suma de subtotales
  "cantidadItems": 2,                    // ← TRANSFORMADO: cantidad total
  "estaActivo": true,                    // ← TRANSFORMADO: status === 'active'
  "estadoDescripcion": "Carrito activo"  // ← TRANSFORMADO: descripción amigable
}
```

---

### **3. CartSummaryType (Resumen con IVA)**

**Datos originales del REST:**
```json
{
  "cartId": "uuid",
  "total": 2599.98,
  "items": [...]
}
```

**Datos transformados en GraphQL:**
```json
{
  "cartId": "uuid",
  "total": 2599.98,
  "items": [...],
  "iva": 415.99,                         // ← TRANSFORMADO: 16% IVA
  "totalConIva": 3015.97,                // ← TRANSFORMADO: total + IVA
  "totalFormateado": "$3015.97 MXN"      // ← TRANSFORMADO: formato moneda
}
```

---

### **4. LowStockProductType (Análisis de Stock)**

**Datos originales del REST:**
```json
{
  "id": "uuid",
  "name": "Producto",
  "stock": 3
}
```

**Datos transformados en GraphQL:**
```json
{
  "producto": {...},
  "unidadesRestantes": 3,
  "nivelUrgencia": "CRITICO",            // ← TRANSFORMADO: CRITICO/URGENTE/MODERADO
  "requiereReabastecimiento": true       // ← TRANSFORMADO: < 30% del umbral
}
```

---

### **5. CatalogType (Análisis Estadístico)**

**Datos originales del REST:**
```json
[
  { "id": "1", "price": 100, "stock": 10 },
  { "id": "2", "price": 200, "stock": 0 }
]
```

**Datos transformados en GraphQL:**
```json
{
  "productos": [...],
  "totalProductos": 2,
  "productosDisponibles": 1,             // ← TRANSFORMADO: conteo con stock > 0
  "productosAgotados": 1,                // ← TRANSFORMADO: conteo con stock = 0
  "valorInventario": 1000.00,            // ← TRANSFORMADO: suma(precio * stock)
  "precioPromedio": 150.00               // ← TRANSFORMADO: promedio de precios
}
```

---

## 📊 **Consultas de Negocio Implementadas**

### **1. `catalogo` - Catálogo con Análisis Estadístico**

**Basado en:** Necesidad de gestión de inventario

**Query:**
```graphql
query {
  catalogo {
    totalProductos
    productosDisponibles
    productosAgotados
    valorInventario
    precioPromedio
    productos {
      id
      name
      price
      stock
      disponible
      estadoStock
      precioConDescuento
    }
  }
}
```

**Transformaciones:**
- Cuenta productos disponibles/agotados
- Calcula valor total del inventario
- Calcula precio promedio
- Agrega estado de stock a cada producto

---

### **2. `productos` - Listado con Transformaciones**

**Basado en:** Imagen del e-commerce (listado de productos)

**Query:**
```graphql
query {
  productos {
    id
    name
    price
    stock
    disponible
    estadoStock
    precioConDescuento
  }
}
```

**Transformaciones:**
- `disponible`: booleano calculado (stock > 0)
- `estadoStock`: categoría textual (AGOTADO/BAJO/DISPONIBLE/ABUNDANTE)
- `precioConDescuento`: precio con 10% descuento

---

### **3. `carrito` - Carrito con Totales Calculados**

**Basado en:** Imagen del carrito lateral del e-commerce

**Query:**
```graphql
query {
  carrito(id: "uuid-del-carrito") {
    id
    status
    total
    cantidadItems
    estaActivo
    estadoDescripcion
    items {
      id
      quantity
      subtotal
      product {
        name
        price
      }
    }
  }
}
```

**Transformaciones:**
- `total`: suma de subtotales de items
- `cantidadItems`: suma de cantidades
- `estaActivo`: booleano basado en status
- `estadoDescripcion`: texto amigable del estado
- `subtotal`: precio * cantidad por item

---

### **4. `resumenCarrito` - Resumen con IVA**

**Basado en:** Necesidad de mostrar totales con impuestos

**Query:**
```graphql
query {
  resumenCarrito(id: "uuid-del-carrito") {
    cartId
    total
    iva
    totalConIva
    totalFormateado
    itemCount
    items {
      productName
      quantity
      unitPrice
      subtotal
      descripcion
    }
  }
}
```

**Transformaciones:**
- `iva`: 16% del total
- `totalConIva`: total + IVA
- `totalFormateado`: formato moneda mexicana
- `descripcion`: texto descriptivo por item

---

### **5. `productosStockBajo` - Análisis de Stock**

**Basado en:** Gestión de inventario y reabastecimiento

**Query:**
```graphql
query {
  productosStockBajo(umbral: 20) {
    producto {
      name
      stock
      estadoStock
    }
    unidadesRestantes
    nivelUrgencia
    requiereReabastecimiento
  }
}
```

**Transformaciones:**
- `nivelUrgencia`: CRITICO/URGENTE/MODERADO basado en porcentaje
- `requiereReabastecimiento`: booleano si está < 30% del umbral
- Análisis de cada producto

---

### **6. `productosDisponibles` - Productos Comprables**

**Basado en:** Mostrar solo productos disponibles en el e-commerce

**Query:**
```graphql
query {
  productosDisponibles {
    id
    name
    price
    stock
    disponible
    estadoStock
  }
}
```

**Transformaciones:**
- Filtra solo productos con `stock > 0`
- Incluye todos los campos transformados

---

## 🚀 **Cómo Usar Apollo Studio**

### **Paso 1: Acceder a Apollo Studio**

Abre tu navegador y ve a:
```
http://localhost:3000/graphql
```

Verás la interfaz de Apollo Studio.

---

### **Paso 2: Ejecutar Consultas**

#### **Ejemplo 1: Obtener Catálogo con Análisis**

```graphql
query ObtenerCatalogo {
  catalogo {
    totalProductos
    productosDisponibles
    productosAgotados
    valorInventario
    precioPromedio
    productos {
      id
      name
      price
      stock
      disponible
      estadoStock
      precioConDescuento
      createdAt
    }
  }
}
```

**Click en:** ▶️ "ObtenerCatalogo"

---

#### **Ejemplo 2: Listar Productos Disponibles**

```graphql
query ProductosDisponibles {
  productosDisponibles {
    id
    name
    price
    stock
    estadoStock
    precioConDescuento
  }
}
```

---

#### **Ejemplo 3: Ver Carrito con Totales**

Primero crea un carrito desde Postman (REST):
```http
POST http://localhost:3000/carts
Content-Type: application/json

{
  "userId": "user-123"
}
```

Luego añade productos:
```http
POST http://localhost:3000/carts/{cart-id}/items
Content-Type: application/json

{
  "productId": "{product-id}",
  "quantity": 2
}
```

Ahora consulta desde GraphQL:
```graphql
query VerCarrito {
  carrito(id: "tu-cart-id-aqui") {
    id
    userId
    status
    total
    cantidadItems
    estaActivo
    estadoDescripcion
    items {
      id
      quantity
      subtotal
      product {
        name
        price
        estadoStock
      }
    }
  }
}
```

---

#### **Ejemplo 4: Resumen con IVA**

```graphql
query ResumenConIVA {
  resumenCarrito(id: "tu-cart-id-aqui") {
    cartId
    total
    iva
    totalConIva
    totalFormateado
    itemCount
    items {
      productName
      quantity
      unitPrice
      subtotal
      descripcion
    }
  }
}
```

---

#### **Ejemplo 5: Productos con Stock Bajo**

```graphql
query StockBajo {
  productosStockBajo(umbral: 20) {
    producto {
      name
      stock
      estadoStock
    }
    unidadesRestantes
    nivelUrgencia
    requiereReabastecimiento
  }
}
```

---

#### **Ejemplo 6: Producto Individual**

```graphql
query VerProducto {
  producto(id: "tu-product-id-aqui") {
    id
    name
    description
    price
    stock
    disponible
    estadoStock
    precioConDescuento
    imageUrl
    createdAt
    updatedAt
  }
}
```

---

## ✅ **Requisitos Cumplidos**

- [x] GraphQL **NO** accede directamente a la base de datos
- [x] Usa **HttpModule/Axios** para consumir REST
- [x] Al menos **6 consultas de negocio** basadas en las imágenes
- [x] Todos los datos REST son **transformados** antes de devolverse
- [x] Todas las consultas funcionan desde **Apollo Studio**
- [x] **NO** se permiten mutations (solo queries)
- [x] **NO** hay acceso directo a la base de datos

---

## 🔍 **Verificar Transformaciones**

Para ver que GraphQL consume REST y transforma, abre la consola del servidor mientras ejecutas queries:

```
[GraphqlRestService] 📡 Consultando REST: GET /products
[GraphqlRestService] ✅ Obtenidos 3 productos del REST
```

Esto confirma que:
1. GraphQL hace HTTP request al REST
2. El REST consulta la base de datos
3. GraphQL transforma los datos antes de devolverlos

---

## 📊 **Comparación REST vs GraphQL**

### **REST:**
```http
GET http://localhost:3000/products
```
```json
[
  {
    "id": "abc",
    "name": "Laptop",
    "price": 1299.99,
    "stock": 15
  }
]
```

### **GraphQL (mismo dato transformado):**
```graphql
query {
  productos {
    name
    price
    disponible          # ← Transformado
    estadoStock         # ← Transformado
    precioConDescuento  # ← Transformado
  }
}
```
```json
{
  "data": {
    "productos": [
      {
        "name": "Laptop",
        "price": 1299.99,
        "disponible": true,
        "estadoStock": "DISPONIBLE",
        "precioConDescuento": 1169.99
      }
    ]
  }
}
```

---

## 🎯 **Ventajas de esta Arquitectura**

1. **Separación de responsabilidades:**
   - REST maneja la base de datos
   - GraphQL maneja transformaciones y consultas flexibles

2. **Reutilización:**
   - El REST ya existente se reutiliza
   - No se duplica lógica de acceso a datos

3. **Transformaciones centralizadas:**
   - Toda la lógica de transformación en un solo lugar
   - Fácil de mantener y actualizar

4. **Flexibilidad:**
   - Los clientes pueden pedir exactamente los campos que necesitan
   - Evita over-fetching y under-fetching

---

## 📝 **Notas para el Profesor**

- ✅ GraphQL consume REST mediante HttpService (Axios)
- ✅ NO hay acceso directo a TypeORM ni a la base de datos
- ✅ Todas las transformaciones están documentadas
- ✅ 6 consultas de negocio basadas en el dominio del e-commerce
- ✅ Apollo Studio funcional en http://localhost:3000/graphql
- ✅ NO se implementaron mutations (solo queries)
- ✅ El esquema GraphQL se genera automáticamente

---

**¡Implementación completa de GraphQL sobre REST con transformación de datos!** 🚀

**Probar en:** http://localhost:3000/graphql
