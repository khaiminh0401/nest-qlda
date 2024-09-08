import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AppLog } from './app.log';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLog(),
  });
  app.enableCors({
    origin: [
      'http://localhost:4200',
    ],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    methods: ["GET", "POST"],
    credentials: true,
  })
  app.setGlobalPrefix("api", {
    exclude: ["auth/login"]
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
