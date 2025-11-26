# 🧪 Instrucciones de Prueba - Examen Completo

## ✅ Estado Actual
El servidor está corriendo en: **http://localhost:3000**

---

## 📋 Orden de Prueba Sugerido

### **Fase 1: Probar REST API (Pregunta 2)**

#### **1.1. Crear un Producto**
```http
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Laptop Dell XPS 13",
  "description": "Laptop ultraligera de alto rendimiento",
  "price": 1299.99,
  "stock": 25,
  "imageUrl": "https://example.com/laptop.jpg"
}
```

**Respuesta esperada:**
```json
{
  "id": "uuid-generado",
  "name": "Laptop Dell XPS 13",
  "description": "Laptop ultraligera de alto rendimiento",
  "price": 1299.99,
  "stock": 25,
  "imageUrl": "https://example.com/laptop.jpg",
  "createdAt": "2025-11-25T...",
  "updatedAt": "2025-11-25T..."
}
```

---

#### **1.2. Listar Productos**
```http
GET http://localhost:3000/products
```

---

#### **1.3. Obtener Producto por ID**
```http
GET http://localhost:3000/products/{id-del-producto-creado}
```

---

#### **1.4. Actualizar Producto**
```http
PUT http://localhost:3000/products/{id-del-producto-creado}
Content-Type: application/json

{
  "price": 1199.99,
  "stock": 20
}
```

---

#### **1.5. Crear un Carrito**
```http
POST http://localhost:3000/carts
Content-Type: application/json

{
  "userId": "usuario-123"
}
```

**Respuesta esperada:**
```json
{
  "id": "uuid-generado",
  "userId": "usuario-123",
  "status": "active",
  "items": [],
  "createdAt": "2025-11-25T...",
  "updatedAt": "2025-11-25T..."
}
```

---

#### **1.6. Añadir Item al Carrito (Endpoint Especializado)**
```http
POST http://localhost:3000/carts/{id-del-carrito}/items
Content-Type: application/json

{
  "productId": "{id-del-producto}",
  "quantity": 3
}
```

**Respuesta esperada:**
```json
{
  "id": "uuid-carrito",
  "userId": "usuario-123",
  "status": "active",
  "items": [
    {
      "id": "uuid-item",
      "quantity": 3,
      "product": {
        "id": "uuid-producto",
        "name": "Laptop Dell XPS 13",
        "price": 1199.99,
        ...
      }
    }
  ]
}
```

---

#### **1.7. Calcular Total del Carrito (Endpoint Especializado)**
```http
GET http://localhost:3000/carts/{id-del-carrito}/total
```

**Respuesta esperada:**
```json
{
  "cartId": "uuid-carrito",
  "total": 3599.97,
  "itemCount": 3,
  "items": [
    {
      "productName": "Laptop Dell XPS 13",
      "quantity": 3,
      "unitPrice": 1199.99,
      "subtotal": 3599.97
    }
  ]
}
```

---

#### **1.8. Checkout del Carrito (Endpoint Especializado)**
```http
POST http://localhost:3000/carts/{id-del-carrito}/checkout
```

**Respuesta esperada:**
```json
{
  "id": "uuid-carrito",
  "userId": "usuario-123",
  "status": "ordered",
  "items": [...],
  "total": 3599.97
}
```

**⚠️ Nota:** El stock del producto se reducirá automáticamente (de 20 a 17 unidades).

---

#### **1.9. Verificar Stock Actualizado**
```http
GET http://localhost:3000/products/{id-del-producto}
```

Deberías ver `"stock": 17`

---

#### **1.10. Productos con Stock Bajo (Endpoint Especializado)**
```http
GET http://localhost:3000/products/low-stock/20
```

Debería devolver el producto porque tiene 17 unidades (< 20).

---

### **Fase 2: Probar WebSocket + Webhook (Pregunta 3)**

#### **2.1. Abrir Cliente WebSocket**

1. Navega a la carpeta del proyecto
2. Haz doble clic en **`websocket-client.html`**
3. Se abrirá en tu navegador
4. Haz clic en el botón **"Conectar"**
5. Deberías ver: ✅ **"Conectado al servidor WebSocket"**

---

#### **2.2. Crear Producto y Ver Notificación**

**En Postman:**
```http
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Mouse Logitech MX Master",
  "price": 99.99,
  "stock": 50
}
```

**En el Cliente HTML (navegador):**
Inmediatamente aparecerá una notificación como:

```
➕ Producto creado

ID: notif-1732579200000-abc123
Operación: CREATE
Entidad: Product

Datos:
{
  "id": "uuid...",
  "name": "Mouse Logitech MX Master",
  "price": 99.99,
  "stock": 50,
  ...
}

⏰ 19:30:45
```

---

#### **2.3. Actualizar Producto y Ver Notificación**

**En Postman:**
```http
PUT http://localhost:3000/products/{id-del-mouse}
Content-Type: application/json

{
  "price": 89.99
}
```

**En el Cliente HTML:**
```
✏️ Producto actualizado

ID: notif-1732579210000-xyz789
Operación: UPDATE
Entidad: Product

Datos:
{
  "id": "uuid...",
  "name": "Mouse Logitech MX Master",
  "price": 89.99,  ← Actualizado
  "stock": 50,
  ...
}

⏰ 19:31:00
```

---

#### **2.4. Crear Carrito y Ver Notificación**

**En Postman:**
```http
POST http://localhost:3000/carts
Content-Type: application/json

{
  "userId": "usuario-456"
}
```

**En el Cliente HTML:**
```
➕ Carrito creado

ID: notif-1732579220000-def456
Operación: CREATE
Entidad: Cart
...
```

---

#### **2.5. Añadir Item al Carrito y Ver Notificación**

**En Postman:**
```http
POST http://localhost:3000/carts/{id-carrito}/items
Content-Type: application/json

{
  "productId": "{id-del-mouse}",
  "quantity": 2
}
```

**En el Cliente HTML:**
```
✏️ Carrito actualizado

ID: notif-1732579230000-ghi789
Operación: UPDATE
Entidad: Cart

Datos:
{
  "action": "item-added",
  "cart": {
    "id": "...",
    "items": [
      { "product": { "name": "Mouse Logitech MX Master" }, "quantity": 2 }
    ]
  }
}
...
```

---

#### **2.6. Probar Webhook Directo (Opcional)**

También puedes invocar el webhook directamente sin pasar por el REST:

```http
POST http://localhost:3000/webhook/notificaciones
Content-Type: application/json

{
  "entity": "Product",
  "operation": "CREATE",
  "data": {
    "id": "test-manual-123",
    "name": "Producto de Prueba Manual",
    "price": 49.99
  }
}
```

El cliente HTML recibirá la notificación igual.

---

### **Fase 3: Verificar Logs del Servidor**

En la terminal donde está corriendo el servidor, deberías ver logs como:

```
[NotificationsGateway] Cliente conectado: abc123 | Total: 1
[WebhookService] 🔔 Webhook recibido: CREATE en Product
[NotificationsGateway] 📡 Emitiendo notificación: Producto creado - CREATE
[WebhookService] ✅ Notificación enviada a 1 clientes
```

---

## ✅ Checklist de Verificación Final

### Pregunta 1: Dominio
- [x] 3 entidades funcionan correctamente
- [x] Relaciones se cargan con eager loading
- [x] Validaciones de DTOs se aplican
- [x] Lógica de negocio funciona (stock, checkout, etc.)

### Pregunta 2: REST API
- [x] CRUD completo para Product funciona
- [x] CRUD completo para Cart funciona
- [x] Endpoint especializado: Checkout funciona
- [x] Endpoint especializado: Calculate Total funciona
- [x] Endpoint especializado: Add to Cart funciona
- [x] Endpoint especializado: Low Stock funciona
- [x] Validaciones rechazan datos inválidos

### Pregunta 3: WebSocket + Webhook
- [x] Cliente HTML se conecta al WebSocket
- [x] POST en Product genera notificación
- [x] PUT en Product genera notificación
- [x] POST en Cart genera notificación
- [x] POST en Cart Items genera notificación
- [x] Notificaciones incluyen: id, tipo, operación, datos
- [x] REST NO comunica directo con WebSocket (pasa por webhook)
- [x] Múltiples clientes reciben las mismas notificaciones

---

## 🎯 Flujo Completo Demostrado

```
┌─────────────┐
│   Postman   │  POST /products
│   (REST)    │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ ProductController│  webhookService.processNotification()
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ WebhookService   │  Enriquece datos + emite
└──────┬───────────┘
       │
       ▼
┌──────────────────────┐
│ NotificationsGateway │  server.emit('notification', ...)
└──────┬───────────────┘
       │
       ▼
┌──────────────────┐
│ Cliente HTML     │  ✅ Notificación mostrada en tiempo real
│ (Navegador)      │
└──────────────────┘
```

---

## 🎓 Para Entregar

**Capturas/Video deben mostrar:**
1. ✅ Servidor corriendo con lista de endpoints
2. ✅ Cliente HTML conectado (botón verde)
3. ✅ POST desde Postman creando un producto
4. ✅ Notificación apareciendo instantáneamente en el navegador
5. ✅ Datos completos de la notificación (id, tipo, operación, datos)
6. ✅ Logs del servidor mostrando el flujo del webhook

---

## 📝 Documentación Completa

- **`README.md`** - Pregunta 1: Dominio y justificación
- **`REST-API.md`** - Pregunta 2: Todos los endpoints REST
- **`PREGUNTA-3-WEBSOCKET.md`** - Pregunta 3: Flujo WebSocket completo
- **`ENTREGA-FINAL.md`** - Resumen ejecutivo del examen completo
- **`INSTRUCCIONES-PRUEBA.md`** - Este archivo (guía de prueba paso a paso)

---

**¡Todo el examen está completo y funcionando!** 🎉

Para detener el servidor: `Ctrl + C` en la terminal
