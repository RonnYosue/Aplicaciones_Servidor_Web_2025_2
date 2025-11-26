# 🧪 Ejemplos de Queries GraphQL - Apollo Studio

## Acceder a Apollo Studio
```
http://localhost:3000/graphql
```

---

## 📋 Queries de Ejemplo

### 1️⃣ Catálogo Completo con Análisis

```graphql
query CatalogoCompleto {
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

**Resultado esperado:**
```json
{
  "data": {
    "catalogo": {
      "totalProductos": 3,
      "productosDisponibles": 2,
      "productosAgotados": 1,
      "valorInventario": 32499.75,
      "precioPromedio": 866.66,
      "productos": [
        {
          "id": "abc-123",
          "name": "Laptop Dell XPS",
          "price": 1299.99,
          "stock": 15,
          "disponible": true,
          "estadoStock": "DISPONIBLE",
          "precioConDescuento": 1169.99,
          "createdAt": "2025-11-25T..."
        }
      ]
    }
  }
}
```

---

### 2️⃣ Listado de Productos

```graphql
query TodosLosProductos {
  productos {
    id
    name
    description
    price
    stock
    disponible
    estadoStock
    precioConDescuento
    imageUrl
  }
}
```

---

### 3️⃣ Productos Disponibles (Stock > 0)

```graphql
query SoloDisponibles {
  productosDisponibles {
    name
    price
    stock
    estadoStock
    precioConDescuento
  }
}
```

---

### 4️⃣ Producto Individual

```graphql
query ProductoPorId {
  producto(id: "679c8dc6-6662-495b-8ace-a0f13645a9b7") {
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

**⚠️ Nota:** Reemplaza el ID con uno válido de tu base de datos.

---

### 5️⃣ Productos con Stock Bajo

```graphql
query StockBajo {
  productosStockBajo(umbral: 20) {
    producto {
      id
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

**Resultado esperado:**
```json
{
  "data": {
    "productosStockBajo": [
      {
        "producto": {
          "id": "xyz-789",
          "name": "Producto con poco stock",
          "stock": 5,
          "estadoStock": "BAJO"
        },
        "unidadesRestantes": 5,
        "nivelUrgencia": "URGENTE",
        "requiereReabastecimiento": true
      }
    ]
  }
}
```

---

### 6️⃣ Carrito Completo

**Antes de ejecutar esta query, debes crear un carrito desde el REST:**

```http
POST http://localhost:3000/carts
Content-Type: application/json

{
  "userId": "usuario-123"
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

**Ahora ejecuta la query en GraphQL:**

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
        id
        name
        price
        estadoStock
      }
      createdAt
    }
    createdAt
    updatedAt
  }
}
```

**Resultado esperado:**
```json
{
  "data": {
    "carrito": {
      "id": "cart-123",
      "userId": "usuario-123",
      "status": "active",
      "total": 2599.98,
      "cantidadItems": 2,
      "estaActivo": true,
      "estadoDescripcion": "Carrito activo",
      "items": [
        {
          "id": "item-1",
          "quantity": 2,
          "subtotal": 2599.98,
          "product": {
            "id": "prod-1",
            "name": "Laptop Dell XPS",
            "price": 1299.99,
            "estadoStock": "DISPONIBLE"
          },
          "createdAt": "2025-11-25T..."
        }
      ],
      "createdAt": "2025-11-25T...",
      "updatedAt": "2025-11-25T..."
    }
  }
}
```

---

### 7️⃣ Resumen del Carrito con IVA

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

**Resultado esperado:**
```json
{
  "data": {
    "resumenCarrito": {
      "cartId": "cart-123",
      "total": 2599.98,
      "iva": 416.00,
      "totalConIva": 3015.98,
      "totalFormateado": "$3015.98 MXN",
      "itemCount": 1,
      "items": [
        {
          "productName": "Laptop Dell XPS",
          "quantity": 2,
          "unitPrice": 1299.99,
          "subtotal": 2599.98,
          "descripcion": "2x Laptop Dell XPS a $1299.99 c/u"
        }
      ]
    }
  }
}
```

---

## 🔄 Query Combinada (Múltiples Consultas)

Puedes ejecutar varias queries a la vez:

```graphql
query DashboardCompleto {
  # Estadísticas generales
  catalogo {
    totalProductos
    productosDisponibles
    productosAgotados
    valorInventario
    precioPromedio
  }
  
  # Productos disponibles
  productosDisponibles {
    name
    price
    stock
    estadoStock
  }
  
  # Productos con stock crítico
  productosStockBajo(umbral: 10) {
    producto {
      name
      stock
    }
    nivelUrgencia
    requiereReabastecimiento
  }
}
```

---

## 🎯 Query con Variables

También puedes usar variables en Apollo Studio:

**Query:**
```graphql
query VerProducto($productId: ID!) {
  producto(id: $productId) {
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

**Variables (en el panel de Apollo Studio):**
```json
{
  "productId": "679c8dc6-6662-495b-8ace-a0f13645a9b7"
}
```

---

## 🔍 Introspección del Schema

Para ver todo el schema disponible:

```graphql
query {
  __schema {
    queryType {
      fields {
        name
        description
      }
    }
  }
}
```

---

## ⚠️ Nota Importante

**GraphQL NO permite mutations en este proyecto** (solo queries).

Todas las operaciones de escritura (crear, actualizar, eliminar) deben hacerse mediante el REST API:
- POST /products
- PUT /products/:id
- DELETE /products/:id
- etc.

GraphQL solo lee y transforma datos.

---

## ✅ Checklist de Pruebas

- [ ] Ejecutar query `catalogo`
- [ ] Ejecutar query `productos`
- [ ] Ejecutar query `productosDisponibles`
- [ ] Ejecutar query `producto` con ID válido
- [ ] Crear carrito vía REST
- [ ] Añadir items al carrito vía REST
- [ ] Ejecutar query `carrito` con ID del carrito creado
- [ ] Ejecutar query `resumenCarrito`
- [ ] Ejecutar query `productosStockBajo`
- [ ] Verificar logs en la consola del servidor

---

**¡Todas las queries están listas para probar en Apollo Studio!** 🚀

**URL:** http://localhost:3000/graphql
