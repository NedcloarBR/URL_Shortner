import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class ShortUrlDTO {
	@ApiProperty({
		description: "The URL to create a redirection hash",
	})
	@IsString()
	@IsUrl({
		protocols: ["http", "https"],
	})
	public url: string;
}
