import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { ShortUrlDTO } from "./shortUrl.dto";
import { ShortUrlEntity } from "./shortUrl.entity";
import { ShortUrlService } from "./shortUrl.service";

@ApiTags("shortUrl")
@Controller("shortUrl")
export class ShortUrlController {
	public constructor(private readonly service: ShortUrlService) {}

	@ApiBody({ type: [ShortUrlDTO] })
	@ApiResponse({ status: HttpStatus.CREATED, description: "Redirection Hash Created" })
	@Post()
	public async short(@Body() { url }: ShortUrlDTO): Promise<ShortUrlEntity> {
		return await this.service.short({ url });
	}

	@Get()
	@ApiResponse({ status: HttpStatus.FOUND, description: "Redirection Hashes found in Database" })
	public async getAll(): Promise<{ count: number; urls: ShortUrlEntity[] }> {
		return await this.service.getAll();
	}

	@ApiParam({
		name: "hash",
		description: "The redirection hash created in POST method",
		required: true,
	})
	@ApiResponse({ status: HttpStatus.PERMANENT_REDIRECT, description: "Redirect to URL if found in Database" })
	@Get(":hash")
	public async get(@Res() res: Response, @Param("hash") hash: string) {
		res.status(HttpStatus.PERMANENT_REDIRECT).redirect(await this.service.get(hash));
	}
}
