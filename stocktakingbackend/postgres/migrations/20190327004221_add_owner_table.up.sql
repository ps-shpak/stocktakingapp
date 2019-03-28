CREATE TABLE "owner" (
    "id" UUID PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "created" TIMESTAMPTZ DEFAULT NOW(),
    "may_login" BOOLEAN DEFAULT 'false'
);