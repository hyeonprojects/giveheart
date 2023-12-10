import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as csurf from 'csurf';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(csurf());

    // swagger
    const config = new DocumentBuilder()
        .setTitle('Give Heart API')
        .setDescription('The Give Heart API description')
        .setVersion('0.1.1')
        .addTag('give-heart')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);
}

bootstrap();
