import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { ShortUrlDTO } from "./shortUrl.dto";
import { ShortUrlEntity } from "./shortUrl.entity";
import { ShortUrlService } from "./shortUrl.service";

@Controller("shortUrl")
export class ShortUrlController {
	public constructor(private readonly service: ShortUrlService) {}

	@Post()
	public async short(@Body() { url }: ShortUrlDTO): Promise<ShortUrlEntity> {
		return await this.service.short({ url });
	}

	@Get()
	public async getAll(): Promise<{ count: number; urls: ShortUrlEntity[] }> {
		return await this.service.getAll();
	}

	@Get(":hash")
	public async get(@Res() res, @Param("hash") hash: string) {
		res.status(HttpStatus.PERMANENT_REDIRECT).redirect(await this.service.get(hash));
	}
}
