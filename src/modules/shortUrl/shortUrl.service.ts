import { Inject, Injectable } from "@nestjs/common";
import { createHash } from "src/utils/createHash";
import { PrismaService } from "../database/prisma.service";
import { ShortUrlDTO } from "./shortUrl.dto";
import { ShortUrlEntity } from "./shortUrl.entity";

@Injectable()
export class ShortUrlService {
	public constructor(@Inject("PRISMA_SERVICE") private readonly prisma: PrismaService) {}

	public short({ url }: ShortUrlDTO): Promise<ShortUrlEntity> {
		return this.prisma.urls.create({
			data: {
				hash: createHash(),
				url,
			},
		});
	}

	public async getAll(): Promise<{ count: number; urls: ShortUrlEntity[] }> {
		const [count, urls] = await Promise.all([await this.prisma.urls.count(), await this.prisma.urls.findMany()]);

		return {
			count,
			urls,
		};
	}

	public async get(hash: string): Promise<string> {
		const { url } = await this.prisma.urls.findFirst({
			where: {
				hash,
			},
		});
		return url;
	}
}
