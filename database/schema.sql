-- ============================================================
--  Pak Property Point — MySQL / MariaDB schema
--  Import order:  1) schema.sql   2) seed.sql
--  Engine: utf8mb4 (Urdu titles + descriptions)
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `properties` (
  `id`           VARCHAR(32)  NOT NULL,
  `slug`         VARCHAR(191) NOT NULL,
  `title`        VARCHAR(255) NOT NULL,
  `title_ur`     VARCHAR(255) DEFAULT NULL,
  `city`         VARCHAR(100) NOT NULL,
  `area`         VARCHAR(191) DEFAULT NULL,
  `type`         ENUM('House','Apartment','Plot','Commercial','Farmhouse') NOT NULL DEFAULT 'House',
  `purpose`      ENUM('sale','rent') NOT NULL DEFAULT 'sale',
  `price`        BIGINT UNSIGNED NOT NULL DEFAULT 0,
  `beds`         SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `baths`        SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `size_label`   VARCHAR(64)  DEFAULT NULL,
  `sqft`         INT UNSIGNED NOT NULL DEFAULT 0,
  `image`        VARCHAR(500) NOT NULL DEFAULT '',
  `gallery`      JSON         DEFAULT NULL,
  `featured`     TINYINT(1)   NOT NULL DEFAULT 0,
  `verified`     TINYINT(1)   NOT NULL DEFAULT 0,
  `installments` TINYINT(1)   NOT NULL DEFAULT 0,
  `badge`        VARCHAR(100) DEFAULT NULL,
  `description`  TEXT         DEFAULT NULL,
  `amenities`    JSON         DEFAULT NULL,
  `agent`        VARCHAR(150) DEFAULT NULL,
  `agent_phone`  VARCHAR(40)  DEFAULT NULL,
  `posted_label` VARCHAR(64)  DEFAULT NULL,
  `possession`   VARCHAR(100) DEFAULT NULL,
  `sort_order`   INT NOT NULL DEFAULT 0,
  `is_active`    TINYINT(1) NOT NULL DEFAULT 1,
  `created_at`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_properties_slug` (`slug`),
  KEY `ix_properties_city`    (`city`),
  KEY `ix_properties_purpose` (`purpose`),
  KEY `ix_properties_type`    (`type`),
  KEY `ix_properties_price`   (`price`),
  KEY `ix_properties_active`  (`is_active`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cities` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100) NOT NULL,
  `listings`   INT UNSIGNED NOT NULL DEFAULT 0,
  `image`      VARCHAR(500) DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_cities_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `testimonials` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(150) NOT NULL,
  `role`       VARCHAR(191) DEFAULT NULL,
  `text`       TEXT         DEFAULT NULL,
  `stars`      TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `ix_testimonials_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `services` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`      VARCHAR(191) NOT NULL,
  `title_ur`   VARCHAR(255) DEFAULT NULL,
  `icon`       VARCHAR(64)  DEFAULT NULL,
  `blurb`      VARCHAR(500) DEFAULT NULL,
  `points`     JSON         DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `ix_services_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `team` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(150) NOT NULL,
  `role`       VARCHAR(191) DEFAULT NULL,
  `city`       VARCHAR(100) DEFAULT NULL,
  `years`      SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `image`      VARCHAR(500) DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `ix_team_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `milestones` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `year`       VARCHAR(16) NOT NULL,
  `text`       VARCHAR(500) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `ix_milestones_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `offices` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `city`       VARCHAR(150) NOT NULL,
  `address`    VARCHAR(500) DEFAULT NULL,
  `phone`      VARCHAR(40)  DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `ix_offices_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `site_settings` (
  `key`   VARCHAR(64) NOT NULL,
  `value` VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: lead capture from the Contact form (safe to ignore if unused)
CREATE TABLE IF NOT EXISTS `leads` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(150) NOT NULL,
  `phone`      VARCHAR(40)  NOT NULL,
  `email`      VARCHAR(191) DEFAULT NULL,
  `message`    TEXT         DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ix_leads_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
