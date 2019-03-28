CREATE TABLE "item" (
    "id" UUID PRIMARY KEY,
    "category" VARCHAR(255) NOT NULL,
    "place" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "owner_id" UUID,
    "created" TIMESTAMPTZ DEFAULT NOW(),
    "disposed" BOOLEAN DEFAULT 'false',
    CONSTRAINT "item_owner_id_key"
        FOREIGN KEY ("owner_id")
        REFERENCES "owner"("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);
