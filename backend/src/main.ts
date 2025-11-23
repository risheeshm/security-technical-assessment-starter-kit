import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // VULNERABILITY: Insecure CORS (VULN-006)
  app.enableCors({
    origin: true, // Reflects the request origin
    credentials: true,
  });

  // VULNERABILITY: Missing Security Headers (VULN-016)
  // Explicitly disabling or not setting security headers like HSTS, X-Frame-Options
  // (NestJS doesn't set them by default without helmet, so we just ensure we don't add helmet)

  // VULNERABILITY: Information Disclosure (VULN-017)
  // Leaking framework version
  app.use((req, res, next) => {
    res.header('X-Powered-By', 'NestJS/8.0.0');
    next();
  });

  // VULNERABILITY: Verbose Error Handling (VULN-039)
  // Not using a custom exception filter that hides stack traces in production
  // (NestJS default is okay-ish but often leaks info in dev mode, forcing it here for demo)

  // VULNERABILITY: Directory Listing (VULN-040)
  // If we were using ServeStaticModule, we would enable 'serveRoot' and 'renderPath'
  // Simulating by just noting it or adding a route that lists files (already done in logs/view)

  // VULNERABILITY: Git Metadata Exposure (VULN-056)
  // Simulating exposure of .git directory
  app.use('/.git/config', (req, res) => {
    res.send('[core]\n\trepositoryformatversion = 0\n\tfilemode = true\n\tbare = false\n\tlogallrefupdates = true\n[remote "origin"]\n\turl = https://github.com/user/repo.git');
  });

  // VULNERABILITY: Backup File Exposure (VULN-057)
  // Simulating exposure of backup files
  app.use('/db_backup.sql.bak', (req, res) => {
    res.send('INSERT INTO users (email, password) VALUES ("admin@example.com", "plaintext_password");');
  });

  // VULNERABILITY: Swagger UI in Production (VULN-058)
  // Enabling Swagger documentation in production environment
  const config = new DocumentBuilder()
    .setTitle('Real Estate API')
    .setDescription('The Real Estate API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
