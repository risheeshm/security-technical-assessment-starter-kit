"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.use((req, res, next) => {
        res.header('X-Powered-By', 'NestJS/8.0.0');
        next();
    });
    app.use('/.git/config', (req, res) => {
        res.send('[core]\n\trepositoryformatversion = 0\n\tfilemode = true\n\tbare = false\n\tlogallrefupdates = true\n[remote "origin"]\n\turl = https://github.com/user/repo.git');
    });
    app.use('/db_backup.sql.bak', (req, res) => {
        res.send('INSERT INTO users (email, password) VALUES ("admin@example.com", "plaintext_password");');
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Real Estate API')
        .setDescription('The Real Estate API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map