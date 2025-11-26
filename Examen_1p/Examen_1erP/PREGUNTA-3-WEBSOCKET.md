# Pregunta 3 - WebSocket con Webhook Intermediario

## 🎯 **Arquitectura Implementada**

```
Postman (REST)  →  REST Controller  →  Webhook Service  →  WebSocket Gateway  →  Cliente HTML
                      (POST/PUT)          (Intermediario)      (Notificaciones)     (Navegador)
```

### **Flujo Completo:**
1. **Postman** hace POST/PUT a cualquier entidad (Product, Cart)
2. **REST Controller** invoca al **WebhookService** (no comunica directamente con WebSocket)
3. **WebhookService** aplica lógica adicional (enriquecer datos, formatear)
4. **WebhookService** invoca al **WebSocket Gateway**
5. **WebSocket Gateway** emite evento global a TODOS los clientes conectados
6. **Cliente HTML** recibe la notificación en tiempo real

---

## 📂 **Archivos Creados**

### **1. WebSocket Gateway**
**Ubicación:** `src/websocket/notifications.gateway.ts`

- Maneja conexiones/desconexiones de clientes
- Emite eventos **globales** (sin rooms)
- Registra cantidad de clientes conectados

### **2. Servicio Webhook (Intermediario)**
**Ubicación:** `src/services/webhook.service.ts`

- Recibe notificaciones del REST
- Aplica lógica adicional:
  - Genera ID único para cada notificación
  - Enriquece datos con timestamp
  - Formatea mensajes descriptivos
- Invoca al WebSocket Gateway

### **3. Controlador Webhook**
**Ubicación:** `src/rest/webhook.controller.ts`

- Endpoint: `POST /webhook/notificaciones`
- Recibe datos del REST
- Delega al WebhookService

### **4. Módulo Webhook**
**Ubicación:** `src/modules/webhook.module.ts`

- Agrupa Gateway, Service y Controller
- Exporta WebhookService para usar en otros módulos

### **5. Cliente HTML**
**Ubicación:** `websocket-client.html`

- Interfaz visual para conectarse al WebSocket
- Muestra notificaciones en tiempo real
- Contador de notificaciones
- Auto-scroll y animaciones

---

## 🔧 **Integraciones REST → Webhook**

### **ProductController** (modificado)
- `POST /products` → Notifica creación
- `PUT /products/:id` → Notifica actualización

### **CartController** (modificado)
- `POST /carts` → Notifica creación de carrito
- `POST /carts/:id/items` → Notifica item añadido
- `PUT /carts/:cartId/items/:itemId` → Notifica cantidad actualizada

**IMPORTANTE:** El REST NO se comunica directamente con WebSocket, siempre pasa por el Webhook.

---

## 🚀 **Cómo Probar el Flujo Completo**

### **Paso 1: Arrancar el Servidor**

```powershell
npm run start:dev
```

El servidor arrancará en: `http://localhost:3000`

---

### **Paso 2: Abrir el Cliente WebSocket**

1. Abre el archivo `websocket-client.html` en tu navegador
2. Haz clic en **"Conectar"**
3. Deberías ver: ✅ Conectado al servidor WebSocket

---

### **Paso 3: Enviar Request desde Postman**

#### **Ejemplo 1: Crear un Producto (POST)**

```
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Camisa Roja",
  "price": 399.99,
  "stock": 20
}
```

**Resultado en el Cliente HTML:**
```
➕ Producto creado
ID: notif-1732579200000-abc123
Operación: CREATE
Entidad: Product
Datos: { id: "...", name: "Camisa Roja", price: 399.99, ... }
⏰ 18:30:45
```

---

#### **Ejemplo 2: Actualizar un Producto (PUT)**

```
PUT http://localhost:3000/products/{productId}
Content-Type: application/json

{
  "price": 349.99,
  "stock": 15
}
```

**Resultado en el Cliente HTML:**
```
✏️ Producto actualizado
ID: notif-1732579210000-xyz789
Operación: UPDATE
Entidad: Product
Datos: { id: "...", name: "Camisa Roja", price: 349.99, stock: 15, ... }
⏰ 18:31:00
```

---

#### **Ejemplo 3: Crear un Carrito (POST)**

```
POST http://localhost:3000/carts
Content-Type: application/json

{
  "userId": "user-456"
}
```

**Resultado en el Cliente HTML:**
```
➕ Carrito creado
ID: notif-1732579220000-def456
Operación: CREATE
Entidad: Cart
Datos: { id: "...", userId: "user-456", status: "active", ... }
⏰ 18:32:00
```

---

#### **Ejemplo 4: Añadir Item al Carrito (POST)**

```
POST http://localhost:3000/carts/{cartId}/items
Content-Type: application/json

{
  "productId": "{productId}",
  "quantity": 3
}
```

**Resultado en el Cliente HTML:**
```
✏️ Carrito actualizado
ID: notif-1732579230000-ghi789
Operación: UPDATE
Entidad: Cart
Datos: { action: "item-added", cart: { id: "...", items: [...] } }
⏰ 18:33:00
```

---

### **Paso 4: Probar Webhook Directo (Opcional)**

También puedes invocar el webhook directamente:

```
POST http://localhost:3000/webhook/notificaciones
Content-Type: application/json

{
  "entity": "Product",
  "operation": "CREATE",
  "data": {
    "id": "test-123",
    "name": "Producto de Prueba",
    "price": 99.99
  }
}
```

---

## 📊 **Estructura de Notificación**

Cada notificación que recibe el cliente tiene esta estructura:

```typescript
{
  id: string;              // ID único generado por el webhook
  type: string;            // Mensaje descriptivo ("Producto creado")
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: string;          // 'Product', 'Cart', 'CartItem'
  data: any;              // Datos completos de la entidad
  timestamp: string;       // ISO 8601 timestamp
}
```

---

## 🔍 **Verificar Funcionamiento**

### **En el Navegador (Cliente HTML):**
- ✅ Debe mostrar "Conectado"
- ✅ Contador de notificaciones debe incrementarse
- ✅ Cada notificación aparece con animación
- ✅ Datos en formato JSON legible

### **En la Terminal del Servidor:**
Verás logs como:
```
[NotificationsGateway] Cliente conectado: abc123 | Total: 1
[WebhookService] 🔔 Webhook recibido: CREATE en Product
[NotificationsGateway] 📡 Emitiendo notificación: Producto creado - CREATE
[WebhookService] ✅ Notificación enviada a 1 clientes
```

### **En Postman:**
- El request REST funciona normalmente
- Responde con la entidad creada/actualizada
- NO hay cambio visible (el WebSocket es asíncrono)

---

## 🎯 **Puntos Clave de la Implementación**

### ✅ **1. Separación de Responsabilidades**
- REST → Solo maneja HTTP
- Webhook → Intermediario con lógica adicional
- WebSocket → Solo emite eventos

### ✅ **2. Sin Comunicación Directa**
El REST **NO** importa ni usa `NotificationsGateway` directamente.
Solo usa `WebhookService`.

### ✅ **3. Eventos Globales (Sin Rooms)**
Todos los clientes conectados reciben TODAS las notificaciones.
No hay segregación por usuario o sala.

### ✅ **4. Lógica Adicional en Webhook**
- Genera IDs únicos
- Añade timestamps
- Formatea mensajes descriptivos
- Podría agregar: validaciones, filtros, logging, métricas, etc.

### ✅ **5. Notificaciones Incluyen:**
- ✅ ID único
- ✅ Tipo de operación (CREATE/UPDATE/DELETE)
- ✅ Datos relevantes de la entidad

---

## 🧪 **Múltiples Clientes**

Puedes abrir varios navegadores con `websocket-client.html` y:
1. Todos recibirán las mismas notificaciones
2. El servidor registra cuántos clientes están conectados
3. Puedes ver el contador de clientes en los logs

---

## 📝 **Resumen del Flujo**

```
┌─────────────┐
│   Postman   │  POST /products (Crear producto)
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ ProductController   │  1. Crea producto
│ (REST)              │  2. Invoca webhookService.processNotification()
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  WebhookService     │  1. Recibe datos del REST
│  (Intermediario)    │  2. Enriquece notificación (ID, timestamp, tipo)
│                     │  3. Invoca gateway.emitNotification()
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ NotificationsGateway│  1. Emite evento 'notification'
│ (WebSocket)         │  2. Envía a TODOS los clientes conectados
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Cliente HTML        │  1. Recibe notificación
│ (Navegador)         │  2. Muestra en UI con animación
└─────────────────────┘
```

---

## ✅ **Checklist de Requisitos Cumplidos**

- [x] POST/PUT en cualquier entidad invoca webhook
- [x] Endpoint webhook: `POST /webhook/notificaciones`
- [x] Webhook recibe datos del REST
- [x] Webhook aplica lógica adicional (enriquecer datos)
- [x] Webhook emite notificación al WebSocket
- [x] REST NO comunica directamente con WebSocket
- [x] WebSocket emite eventos globales (sin rooms)
- [x] Notificaciones incluyen: id, tipo operación, datos relevantes
- [x] Flujo completo funcional: REST → Webhook → WebSocket → Cliente
- [x] Cliente HTML visual para probar

---

## 🎓 **Para Entregar**

1. ✅ Código fuente completo
2. ✅ Cliente HTML funcional
3. ✅ Esta documentación
4. ✅ Capturas/video mostrando:
   - Cliente conectado
   - POST desde Postman
   - Notificación apareciendo en tiempo real
   - Logs del servidor

---

**¡Implementación Completa de la Pregunta 3!** 🚀
