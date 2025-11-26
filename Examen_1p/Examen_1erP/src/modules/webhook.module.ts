import { Module } from '@nestjs/common';
import { NotificationsGateway } from '../websocket/notifications.gateway';
import { WebhookService } from '../services/webhook.service';
import { WebhookController } from '../rest/webhook.controller';

@Module({
  providers: [NotificationsGateway, WebhookService],
  controllers: [WebhookController],
  exports: [WebhookService], // Exportar para usar en otros módulos
})
export class WebhookModule {}
