import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { name } from "../package.json";
import { AppModule } from "./app.module";

async function bootstrap() {
	const logger = new Logger("Main");
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	const configService = app.get<ConfigService>(ConfigService);
	const Port = configService.get<number>("PORT");
	app.useGlobalPipes(
		new ValidationPipe({
			always: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
	app.setGlobalPrefix("api");
	try {
		await app.listen(Port, "0.0.0.0");
		logger.log(`${name} Running on Port: ${Port} in ${configService.get<string>("ENVIRONMENT")} mode`);
	} catch (error) {
		logger.error("An error occurred when starting: ", (error as Error).message);
	}
}
bootstrap();
