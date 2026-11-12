import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow requests from Next.js frontend
  app.enableCors({
    origin: "http://localhost:3000",
  });

  // Validate incoming data
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Backend runs on port 3001
  await app.listen(3001);
}
bootstrap();
