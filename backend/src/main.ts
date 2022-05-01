import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // swagger
  const config = new DocumentBuilder()
    .setTitle('real-world')
    .setDescription('RestApiで作成しました。')
    .setVersion('1.0')
    .addTag('feed')
    .addTag('user')
    .addTag('tags')
    .addTag('comment')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(4000);
}
bootstrap();
