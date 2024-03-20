-- CreateTable
CREATE TABLE "URLs" (
    "hash" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "URLs_pkey" PRIMARY KEY ("hash")
);

-- CreateIndex
CREATE UNIQUE INDEX "URLs_hash_key" ON "URLs"("hash");
