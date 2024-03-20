import { Global, Module, Provider } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

const provider: Provider<PrismaService> = {
  provide: "PRISMA_SERVICE",
  useClass: PrismaService
}

@Global()
@Module({
  providers:[provider],
  exports: [provider]
})
export class PrismaModule {}