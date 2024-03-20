import { urls } from "@prisma/client";

export class ShortUrlEntity implements urls {
	public hash: string;
	public url: string;
}
