-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 23 Okt 2025 pada 09.36
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kaspa_space`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-isnan@gmail.com|127.0.0.1', 'i:1;', 1759219435),
('laravel-cache-isnan@gmail.com|127.0.0.1:timer', 'i:1759219435;', 1759219435),
('laravel-cache-kusumaisnan9@gmail.com|127.0.0.1', 'i:1;', 1759800270),
('laravel-cache-kusumaisnan9@gmail.com|127.0.0.1:timer', 'i:1759800270;', 1759800270),
('laravel-cache-vio@gmail.com|127.0.0.1', 'i:1;', 1758939004),
('laravel-cache-vio@gmail.com|127.0.0.1:timer', 'i:1758939004;', 1758939004);

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `icon`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Coworking Space', 'coworking-space', 'Layanan ruang kerja bersama dan virtual office', 'building-office', 1, 1, '2025-09-26 00:48:14', '2025-09-26 00:57:58'),
(2, 'Jasa Profesional', 'jasa-profesional', 'Layanan profesional seperti konsultasi, desain, dan lainnya', 'briefcase', 1, 2, '2025-09-26 00:48:14', '2025-09-26 00:57:58'),
(3, 'Kasper AI', 'kasper-ai', 'Layanan AI dan otomasi bisnis', 'cpu-chip', 1, 3, '2025-09-26 00:48:14', '2025-09-26 00:57:58'),
(4, 'Microsoft Key', 'microsoft-key', 'Lisensi Microsoft Office dan Windows', 'key', 1, 4, '2025-09-26 00:48:14', '2025-09-26 00:57:58'),
(5, 'Open Library', 'open-library', 'Akses perpustakaan digital dan e-book', 'book-open', 1, 5, '2025-09-26 00:48:14', '2025-09-26 00:57:58'),
(6, 'Food & Beverage', 'food-beverage', 'Layanan makanan dan minuman', 'cake', 1, 6, '2025-09-26 00:48:14', '2025-09-26 00:57:59'),
(7, 'Bisnis Digital', 'bisnis-digital', 'Bisnis Digital', 'briefcase', 1, 7, '2025-09-28 22:17:10', '2025-09-28 22:17:10'),
(8, 'FnB', 'fnb', 'makanan minuman', 'cake', 1, 8, '2025-09-29 00:16:37', '2025-09-29 00:16:37'),
(13, 'Food', 'food', 'Makanan', 'cake', 1, 9, '2025-10-21 20:22:55', '2025-10-21 20:22:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `google_sheets_configs`
--

CREATE TABLE `google_sheets_configs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `spreadsheet_id` varchar(255) NOT NULL,
  `sheet_name` varchar(255) NOT NULL DEFAULT 'Sheet1',
  `range` varchar(255) NOT NULL DEFAULT 'A1:H1000',
  `api_key` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `last_synced` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_09_24_041355_create_schedules_table', 1),
(5, '2025_09_25_013719_xxxx_create_google_sheets_configs_table', 1),
(6, '2025_09_26_074139_create_categories_table', 1),
(7, '2025_09_26_074140_create_products_table', 1),
(8, '2025_09_26_074141_create_product_variants_table', 1),
(9, '2025_09_26_074154_create_product_recommendations_table', 1),
(10, '2025_10_10_023808_create_orders_table', 2),
(11, '2025_10_10_023815_create_order_items_table', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_number` varchar(255) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `tax` decimal(15,2) NOT NULL DEFAULT 0.00,
  `total` decimal(15,2) NOT NULL,
  `status` enum('pending','processing','completed','cancelled') NOT NULL DEFAULT 'pending',
  `payment_status` enum('unpaid','paid','refunded') NOT NULL DEFAULT 'unpaid',
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `payment_method` varchar(20) DEFAULT 'cash',
  `payment_proof` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `customer_name`, `customer_email`, `customer_phone`, `notes`, `subtotal`, `tax`, `total`, `status`, `payment_status`, `paid_at`, `created_at`, `updated_at`, `payment_method`, `payment_proof`) VALUES
(1, 'ORD-68EF2723D6630', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 100000.00, 0.00, 100000.00, 'pending', '', NULL, '2025-10-14 21:46:27', '2025-10-14 21:46:27', 'cash', NULL),
(2, 'ORD-68EF28B635328', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 150000.00, 0.00, 150000.00, 'pending', '', NULL, '2025-10-14 21:53:10', '2025-10-14 21:53:10', 'cash', NULL),
(3, 'ORD-68EF291319BE2', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 150000.00, 0.00, 150000.00, 'pending', '', NULL, '2025-10-14 21:54:43', '2025-10-14 21:54:43', 'cash', NULL),
(4, 'ORD-68EF2954BDD27', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 150000.00, 0.00, 150000.00, 'pending', '', NULL, '2025-10-14 21:55:48', '2025-10-14 21:55:48', 'cash', NULL),
(5, 'ORD-68F31A7771699', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 150000.00, 0.00, 150000.00, 'pending', 'unpaid', NULL, '2025-10-17 21:41:27', '2025-10-17 21:41:27', 'cash', NULL),
(6, 'ORD-68F31AB96B2EE', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 150000.00, 0.00, 150000.00, 'pending', 'unpaid', NULL, '2025-10-17 21:42:33', '2025-10-17 21:42:33', 'cash', NULL),
(7, 'ORD-68F34B6C00A07', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 200000.00, 0.00, 200000.00, 'pending', 'unpaid', NULL, '2025-10-18 01:10:20', '2025-10-18 01:10:20', 'cash', NULL),
(8, 'ORD-68F34BDA84426', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 150000.00, 0.00, 150000.00, 'pending', 'unpaid', NULL, '2025-10-18 01:12:10', '2025-10-18 01:12:10', 'cash', NULL),
(9, 'ORD-68F34D7ECE33F', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 200000.00, 0.00, 200000.00, 'pending', 'unpaid', NULL, '2025-10-18 01:19:10', '2025-10-18 01:19:10', 'cash', NULL),
(10, 'ORD-68F34E6AB1CD2', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 150000.00, 0.00, 150000.00, 'pending', 'unpaid', NULL, '2025-10-18 01:23:06', '2025-10-18 01:23:06', 'cash', NULL),
(11, 'ORD-68F35022A002F', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 150000.00, 0.00, 150000.00, 'pending', 'unpaid', NULL, '2025-10-18 01:30:26', '2025-10-18 01:30:26', 'cash', NULL),
(12, 'ORD-68F3510252B2F', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 150000.00, 0.00, 150000.00, 'pending', 'unpaid', NULL, '2025-10-18 01:34:10', '2025-10-18 01:34:10', 'cash', NULL),
(13, 'ORD-68F848FEDA2E3', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 150000.00, 0.00, 150000.00, 'pending', 'unpaid', NULL, '2025-10-21 20:01:18', '2025-10-21 20:01:18', 'cash', NULL),
(14, 'ORD-68F8498A1709F', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 200000.00, 0.00, 200000.00, 'pending', 'unpaid', NULL, '2025-10-21 20:03:38', '2025-10-21 20:03:38', 'cash', NULL),
(15, 'ORD-68F84B3A4D54D', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 200000.00, 0.00, 200000.00, 'pending', 'unpaid', NULL, '2025-10-21 20:10:50', '2025-10-21 20:10:50', 'cash', NULL),
(16, 'ORD-68F84D470F9BD', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 200000.00, 0.00, 200000.00, 'pending', 'unpaid', NULL, '2025-10-21 20:19:35', '2025-10-21 20:19:35', 'cash', NULL),
(17, 'ORD-68F85111D77A9', 'Muhammad Isnani', 'isnan@gmail.com', '0888888888', NULL, 200000.00, 0.00, 200000.00, 'pending', 'unpaid', NULL, '2025-10-21 20:35:45', '2025-10-21 20:35:45', 'cash', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `variant_id` bigint(20) UNSIGNED DEFAULT NULL,
  `variant_name` varchar(255) DEFAULT NULL,
  `custom_options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`custom_options`)),
  `quantity` int(11) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `variant_id`, `variant_name`, `custom_options`, `quantity`, `price`, `subtotal`, `created_at`, `updated_at`) VALUES
(1, 1, 7, 'Shared Desk', NULL, 'gold', '[]', 2, 50000.00, 100000.00, '2025-10-14 21:46:27', '2025-10-14 21:46:27'),
(2, 2, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-14 21:53:10', '2025-10-14 21:53:10'),
(3, 3, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-14 21:54:43', '2025-10-14 21:54:43'),
(4, 4, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-14 21:55:48', '2025-10-14 21:55:48'),
(5, 5, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-17 21:41:27', '2025-10-17 21:41:27'),
(6, 6, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-17 21:42:33', '2025-10-17 21:42:33'),
(7, 7, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-18 01:10:20', '2025-10-18 01:10:20'),
(8, 7, 7, 'Shared Desk', NULL, 'gold', '[]', 1, 50000.00, 50000.00, '2025-10-18 01:10:20', '2025-10-18 01:10:20'),
(9, 8, 5, 'Bisnis Digital', NULL, 'Silver', '[]', 1, 150000.00, 150000.00, '2025-10-18 01:12:10', '2025-10-18 01:12:10'),
(10, 9, 5, 'Bisnis Digital', NULL, 'Silver', '[]', 1, 150000.00, 150000.00, '2025-10-18 01:19:10', '2025-10-18 01:19:10'),
(11, 9, 7, 'Shared Desk', NULL, 'gold', '[]', 1, 50000.00, 50000.00, '2025-10-18 01:19:10', '2025-10-18 01:19:10'),
(12, 10, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-18 01:23:06', '2025-10-18 01:23:06'),
(13, 11, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-18 01:30:26', '2025-10-18 01:30:26'),
(14, 12, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-18 01:34:10', '2025-10-18 01:34:10'),
(15, 13, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-21 20:01:18', '2025-10-21 20:01:18'),
(16, 14, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-21 20:03:38', '2025-10-21 20:03:38'),
(17, 14, 7, 'Shared Desk', NULL, 'gold', '[]', 1, 50000.00, 50000.00, '2025-10-21 20:03:38', '2025-10-21 20:03:38'),
(18, 15, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-21 20:10:50', '2025-10-21 20:10:50'),
(19, 15, 7, 'Shared Desk', NULL, 'gold', '[]', 1, 50000.00, 50000.00, '2025-10-21 20:10:50', '2025-10-21 20:10:50'),
(20, 16, 7, 'Shared Desk', NULL, 'gold', '[]', 1, 50000.00, 50000.00, '2025-10-21 20:19:35', '2025-10-21 20:19:35'),
(21, 16, 5, 'Bisnis Digital', NULL, 'Silver', '[]', 1, 150000.00, 150000.00, '2025-10-21 20:19:35', '2025-10-21 20:19:35'),
(22, 17, 7, 'Shared Desk', NULL, 'gold', '[]', 1, 50000.00, 50000.00, '2025-10-21 20:35:45', '2025-10-21 20:35:45'),
(23, 17, 6, 'Coworking Space', NULL, 'Gold', '[]', 1, 150000.00, 150000.00, '2025-10-21 20:35:45', '2025-10-21 20:35:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment_settings`
--

CREATE TABLE `payment_settings` (
  `id` bigint(20) NOT NULL,
  `qris_image` varchar(255) DEFAULT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `account_number` varchar(50) DEFAULT NULL,
  `account_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `payment_settings`
--

INSERT INTO `payment_settings` (`id`, `qris_image`, `bank_name`, `account_number`, `account_name`, `created_at`, `updated_at`) VALUES
(1, 'qris/RkCTjBPzSZtc3BgYmE040Dia75mkVqkMy2JuRjiL.png', 'Bank BRI', '1234567890', 'Kaspa Space', '2025-10-15 00:26:20', '2025-10-21 20:25:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `promo_label` varchar(255) DEFAULT NULL,
  `base_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `custom_options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`custom_options`)),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `meta_description` text DEFAULT NULL,
  `meta_keywords` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `title`, `slug`, `subtitle`, `description`, `promo_label`, `base_price`, `images`, `custom_options`, `is_active`, `is_featured`, `sort_order`, `meta_description`, `meta_keywords`, `category_id`, `created_at`, `updated_at`) VALUES
(5, 'Bisnis Digital', 'bisnis-digital', 'Bisnis Digital', 'Bisnis Digital', 'Bisnis Digital', 100000.00, '[\"products\\/zZkMeKG3oeyg284VGgixSktdzpMWWiVibNZ9DwPl.png\"]', '[{\"question\":\"tambahhan\",\"type\":\"text\",\"required\":\"1\"}]', 1, 0, 0, NULL, NULL, 7, '2025-09-29 00:10:41', '2025-09-30 21:12:21'),
(6, 'Coworking Space', 'coworking-space', 'Sewa Coworking Space', 'Penyewaan Coworking Space', 'NEW', 100000.00, '[\"products\\/jjYBiSMXyLhLw2ueReAqhBQvdDOHQFIZSyMRkg3j.png\"]', '[{\"question\":\"Tambahkan layanan\",\"type\":\"text\",\"required\":\"1\"}]', 1, 1, 0, NULL, NULL, 1, '2025-09-30 01:05:51', '2025-09-30 21:16:05'),
(7, 'Shared Desk', 'shared-desk', 'Shared Desk', 'Shared Desk', 'PROMO', 10000.00, '[\"products\\/vOTuNBhety41nJeIj1VD19dY4iHPACDTQTqwtXkn.png\"]', NULL, 1, 1, 0, NULL, NULL, 1, '2025-09-30 01:33:58', '2025-09-30 21:12:35'),
(8, 'Herbwise VR', 'herbwise-vr', 'Herbwise VR', 'Herbwise VR', 'NEW', 999.00, '[\"products\\/XFnq1B6QooMLbghyXC76WeRlZDszUI7BJ7ZzDssR.png\"]', NULL, 1, 1, 0, NULL, NULL, 3, '2025-09-30 21:37:51', '2025-09-30 21:37:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_recommendations`
--

CREATE TABLE `product_recommendations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `recommended_product_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Rekomendasi untuk Anda',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `compare_price` decimal(12,2) DEFAULT NULL,
  `stock_quantity` int(11) NOT NULL DEFAULT 0,
  `manage_stock` tinyint(1) NOT NULL DEFAULT 0,
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`attributes`)),
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `name`, `sku`, `price`, `compare_price`, `stock_quantity`, `manage_stock`, `attributes`, `image`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(11, 5, 'Silver', '3r354534', 150000.00, 100000.00, 0, 0, NULL, NULL, 1, 0, '2025-09-29 00:10:41', '2025-09-29 00:10:41'),
(12, 6, 'Gold', '54636325', 150000.00, 100000.00, 0, 0, NULL, NULL, 1, 0, '2025-09-30 01:05:51', '2025-09-30 01:05:51'),
(13, 7, 'gold', '6634525', 50000.00, 10000.00, 0, 0, NULL, NULL, 1, 0, '2025-09-30 01:33:58', '2025-09-30 01:33:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedules`
--

CREATE TABLE `schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `room` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `sub_type` varchar(255) DEFAULT NULL,
  `occupancy` varchar(255) NOT NULL,
  `inv` varchar(255) DEFAULT NULL,
  `check_in` varchar(255) DEFAULT NULL,
  `check_out` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('fosEbkuaW3QMZE3ZYs5ieCu8j0vv20I5GuiDY6IH', 6, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiTjRIY0NobjdmRkhzUjVqMXhyMVpoSzd6T0N2ZVgwYUg3T0JRalNPeiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NjtzOjQ6ImNhcnQiO2E6Mjp7aTowO2E6OTp7czoyOiJpZCI7czoxMzoiNjhmODUwYWNmMTNhNyI7czoxMDoicHJvZHVjdF9pZCI7aTo3O3M6MTI6InByb2R1Y3RfbmFtZSI7czoxMToiU2hhcmVkIERlc2siO3M6MTA6InZhcmlhbnRfaWQiO2k6MTM7czoxMjoidmFyaWFudF9uYW1lIjtzOjQ6ImdvbGQiO3M6MTQ6ImN1c3RvbV9vcHRpb25zIjthOjA6e31zOjg6InF1YW50aXR5IjtpOjE7czo1OiJwcmljZSI7aTo1MDAwMDtzOjg6InN1YnRvdGFsIjtpOjUwMDAwO31pOjE7YTo5OntzOjI6ImlkIjtzOjEzOiI2OGY4NTBiNDQxYzk0IjtzOjEwOiJwcm9kdWN0X2lkIjtpOjY7czoxMjoicHJvZHVjdF9uYW1lIjtzOjE1OiJDb3dvcmtpbmcgU3BhY2UiO3M6MTA6InZhcmlhbnRfaWQiO2k6MTI7czoxMjoidmFyaWFudF9uYW1lIjtzOjQ6IkdvbGQiO3M6MTQ6ImN1c3RvbV9vcHRpb25zIjthOjA6e31zOjg6InF1YW50aXR5IjtpOjE7czo1OiJwcmljZSI7aToxNTAwMDA7czo4OiJzdWJ0b3RhbCI7aToxNTAwMDA7fX1zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyMToiaHR0cDovLzEyNy4wLjAuMTo4MDAwIjt9fQ==', 1761104190);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', '2025-09-26 00:48:13', '$2y$12$nGkFaZrO532sf2KhhXjSWe5/Ir7WNdBRLR/aYCM7KU0VSTVl0D8MO', '1GUbTec489', '2025-09-26 00:48:14', '2025-09-26 00:57:58'),
(3, 'isnann', 'a710220004@student.ums.ac.id', NULL, '$2y$12$gRBUCwPQ1zI7WSr.9TvZzeEPDG1hjNxTlSefSY2sB294cRKrDDPKa', NULL, '2025-09-26 19:09:30', '2025-09-26 19:09:30'),
(4, 'm Isnani kusuma', 'isnan@gmail.com', NULL, '$2y$12$Cpt4FOgTkz5NOUuWblJAIOSnKBy1xvoiEuKT5il4UwQEtGB8xt8hK', NULL, '2025-09-28 21:59:04', '2025-09-28 21:59:04'),
(5, 'Isnani kusuma', 'kusumaisnan9@gmail.com', NULL, '$2y$12$M7U9n1X2ym9gEj9R5LP4teOKLwAlcobNredlErWPU84AyK3OZoGEO', NULL, '2025-09-30 01:03:58', '2025-09-30 01:03:58'),
(6, 'kaspa space', 'kaspaspace@gmail.com', NULL, '$2y$12$Hpn9xqvzWAsP98NTg8hvMeyVG8UMm51D0f12sOoZ/Bu04y4pHA//O', NULL, '2025-10-06 18:24:05', '2025-10-06 18:24:05');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `google_sheets_configs`
--
ALTER TABLE `google_sheets_configs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_number_unique` (`order_number`);

--
-- Indeks untuk tabel `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`),
  ADD KEY `order_items_variant_id_foreign` (`variant_id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `payment_settings`
--
ALTER TABLE `payment_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indeks untuk tabel `product_recommendations`
--
ALTER TABLE `product_recommendations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_product_recommendation` (`product_id`,`recommended_product_id`),
  ADD KEY `product_recommendations_product_id_index` (`product_id`),
  ADD KEY `product_recommendations_recommended_product_id_index` (`recommended_product_id`);

--
-- Indeks untuk tabel `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_variants_sku_unique` (`sku`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`);

--
-- Indeks untuk tabel `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedules_room_date_index` (`room`,`date`),
  ADD KEY `schedules_occupancy_index` (`occupancy`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `google_sheets_configs`
--
ALTER TABLE `google_sheets_configs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `payment_settings`
--
ALTER TABLE `payment_settings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `product_recommendations`
--
ALTER TABLE `product_recommendations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `order_items_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`);

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product_recommendations`
--
ALTER TABLE `product_recommendations`
  ADD CONSTRAINT `product_recommendations_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_recommendations_recommended_product_id_foreign` FOREIGN KEY (`recommended_product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
