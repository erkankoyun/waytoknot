CREATE TABLE `directory_cities` (
	`key` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`state` text NOT NULL,
	`latitude` text NOT NULL,
	`longitude` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `directory_records` (
	`id` text PRIMARY KEY NOT NULL,
	`dedupe_key` text NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`city` text NOT NULL,
	`city_key` text NOT NULL,
	`state` text NOT NULL,
	`country` text NOT NULL,
	`url` text NOT NULL,
	`source` text NOT NULL,
	`status` text NOT NULL,
	`latitude` text NOT NULL,
	`longitude` text NOT NULL,
	`search_text` text NOT NULL,
	`payload` text NOT NULL,
	`site_checked_at` text,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `directory_records_dedupe_key_unique` ON `directory_records` (`dedupe_key`);
--> statement-breakpoint
CREATE INDEX directory_category_city ON directory_records(status, category, city_key);
--> statement-breakpoint
CREATE INDEX directory_state ON directory_records(status, state);
--> statement-breakpoint
CREATE VIRTUAL TABLE directory_fts USING fts5(name, city, search_text, content='directory_records', content_rowid='rowid', tokenize='unicode61 remove_diacritics 2');
--> statement-breakpoint
CREATE TRIGGER directory_fts_insert AFTER INSERT ON directory_records BEGIN INSERT INTO directory_fts(rowid,name,city,search_text) VALUES(new.rowid,new.name,new.city,new.search_text); END;
--> statement-breakpoint
CREATE TRIGGER directory_fts_delete AFTER DELETE ON directory_records BEGIN INSERT INTO directory_fts(directory_fts,rowid,name,city,search_text) VALUES('delete',old.rowid,old.name,old.city,old.search_text); END;
--> statement-breakpoint
CREATE TRIGGER directory_fts_update AFTER UPDATE ON directory_records BEGIN INSERT INTO directory_fts(directory_fts,rowid,name,city,search_text) VALUES('delete',old.rowid,old.name,old.city,old.search_text); INSERT INTO directory_fts(rowid,name,city,search_text) VALUES(new.rowid,new.name,new.city,new.search_text); END;
