import { IsString, IsUrl } from "class-validator";

export class ShortUrlDTO {
	@IsString()
	@IsUrl({
		protocols: ["http", "https"],
	})
	public url: string;
}
