import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Blog Generation Service')
    .setDescription('API for SEO blog post generation pipeline')
    .setVersion('1.0')
    .addTag('cron', 'Cron trigger for generation')
    .addTag('admin', 'Admin panel API')
    .addApiKey({ type: 'apiKey', name: 'x-cron-token', in: 'header' }, 'cron')
    .addApiKey({ type: 'apiKey', name: 'x-admin-token', in: 'header' }, 'admin')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}
