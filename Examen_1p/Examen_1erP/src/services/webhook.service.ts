import { Injectable, Logger } from '@nestjs/common';
import { NotificationsGateway } from '../websocket/notifications.gateway';

export interface WebhookNotificationDto {
  entity: string; // 'Product', 'Cart', 'CartItem'
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  data: any; // Los datos de la entidad
}

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  // Procesar notificación desde REST y enviar al WebSocket
  async processNotification(webhook: WebhookNotificationDto) {
    this.logger.log(`🔔 Webhook recibido: ${webhook.operation} en ${webhook.entity}`);

    // Aplicar lógica adicional (ejemplo: formatear, validar, enriquecer datos)
    const enrichedNotification = this.enrichNotification(webhook);

    // Emitir al WebSocket Gateway
    const result = this.notificationsGateway.emitNotification(enrichedNotification);

    this.logger.log(`✅ Notificación enviada a ${result.clientsNotified} clientes`);

    return result;
  }

  // Lógica adicional del webhook: enriquecer datos antes de enviar
  private enrichNotification(webhook: WebhookNotificationDto) {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();

    // Construir mensaje descriptivo
    const type = this.buildNotificationType(webhook);

    return {
      id,
      type,
      operation: webhook.operation,
      entity: webhook.entity,
      data: webhook.data,
      timestamp,
    };
  }

  // Generar tipo de notificación amigable
  private buildNotificationType(webhook: WebhookNotificationDto): string {
    const operationMap: Record<string, string> = {
      CREATE: 'creado',
      UPDATE: 'actualizado',
      DELETE: 'eliminado',
    };

    const entityMap: Record<string, string> = {
      Product: 'Producto',
      Cart: 'Carrito',
      CartItem: 'Item de carrito',
    };

    const entity = entityMap[webhook.entity] || webhook.entity;
    const operation = operationMap[webhook.operation] || webhook.operation;

    return `${entity} ${operation}`;
  }
}
