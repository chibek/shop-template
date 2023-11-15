CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`price` decimal(10,2) NOT NULL DEFAULT '0.00',
	`rating` int NOT NULL DEFAULT 0,
	`inventory` int NOT NULL DEFAULT 0,
	`thumbnail` varchar(191) DEFAULT 'null',
	`images` json DEFAULT ('null'),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
