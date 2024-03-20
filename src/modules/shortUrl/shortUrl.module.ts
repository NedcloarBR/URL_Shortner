import { Module } from "@nestjs/common";
import { ShortUrlController } from "./shortUrl.controller";
import { ShortUrlService } from "./shortUrl.service";

@Module({
	controllers: [ShortUrlController],
	providers: [ShortUrlService],
})
export class ShortUrlModule {}
