import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { WebhookService, WebhookNotificationDto } from '../services/webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  // POST /webhook/notificaciones
  // Endpoint intermediario entre REST y WebSocket
  @Post('notificaciones')
  @HttpCode(HttpStatus.OK)
  async receiveNotification(@Body() notification: WebhookNotificationDto) {
    return this.webhookService.processNotification(notification);
  }
}
