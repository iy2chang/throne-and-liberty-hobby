import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Request, Response } from 'express';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // prefix routes with /api
  app.setGlobalPrefix('api');

  // serve react pages
  app.use(express.static(join(__dirname, '..', '..', 'frontend', 'dist')));

  const expressApp = app.getHttpAdapter().getInstance();

  expressApp.get(/(.*)/, (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
  });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
