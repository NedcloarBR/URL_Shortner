import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { config } from "./config";
import { PrismaModule } from "./modules/database/prisma.module";
import { ShortUrlModule } from "./modules/shortUrl/shortUrl.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
		}),
		PrismaModule,
		ShortUrlModule,
	],
})
export class AppModule {}
