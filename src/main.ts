import { NestFactory } from '@nestjs/core';
//
import * as bodyParser from 'body-parser';
//
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(parseInt(process.env.PORT) || 3333);
}
bootstrap();
