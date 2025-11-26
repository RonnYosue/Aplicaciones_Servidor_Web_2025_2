import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

// WebSocket Gateway que emite eventos GLOBALES (sin rooms)
@WebSocketGateway({
  cors: {
    origin: '*', // Permitir cualquier origen (desarrollo)
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);
  private connectedClients = 0;

  // Cuando un cliente se conecta
  handleConnection(client: Socket) {
    this.connectedClients++;
    this.logger.log(`Cliente conectado: ${client.id} | Total: ${this.connectedClients}`);
    
    // Enviar mensaje de bienvenida al cliente
    client.emit('welcome', {
      message: 'Conectado al servidor WebSocket',
      clientId: client.id,
      timestamp: new Date().toISOString(),
    });
  }

  // Cuando un cliente se desconecta
  handleDisconnect(client: Socket) {
    this.connectedClients--;
    this.logger.log(`Cliente desconectado: ${client.id} | Total: ${this.connectedClients}`);
  }

  // Método para emitir notificaciones globales (llamado desde el webhook)
  emitNotification(notification: {
    id: string;
    type: string;
    operation: 'CREATE' | 'UPDATE' | 'DELETE';
    entity: string;
    data: any;
    timestamp: string;
  }) {
    this.logger.log(`📡 Emitiendo notificación: ${notification.type} - ${notification.operation}`);
    
    // Emitir a TODOS los clientes conectados (sin rooms)
    this.server.emit('notification', notification);
    
    return {
      success: true,
      clientsNotified: this.connectedClients,
      notification,
    };
  }

  // Obtener estadísticas del WebSocket
  getStats() {
    return {
      connectedClients: this.connectedClients,
      serverActive: this.server !== undefined,
    };
  }
}
