CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(191) NOT NULL,
	"description" text,
	"price" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"inventory" integer DEFAULT 0 NOT NULL,
	"thumbnail" varchar(191) DEFAULT 'null',
	"images" json DEFAULT 'null',
	"createdAt" timestamp DEFAULT now()
);
