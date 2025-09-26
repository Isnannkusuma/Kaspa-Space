<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'Coworking Space',
                'slug' => 'coworking-space',
                'description' => 'Layanan ruang kerja bersama dan virtual office',
                'icon' => 'building-office',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Jasa Profesional',
                'slug' => 'jasa-profesional',
                'description' => 'Layanan profesional seperti konsultasi, desain, dan lainnya',
                'icon' => 'briefcase',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Kasper AI',
                'slug' => 'kasper-ai',
                'description' => 'Layanan AI dan otomasi bisnis',
                'icon' => 'cpu-chip',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Microsoft Key',
                'slug' => 'microsoft-key',
                'description' => 'Lisensi Microsoft Office dan Windows',
                'icon' => 'key',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Open Library',
                'slug' => 'open-library',
                'description' => 'Akses perpustakaan digital dan e-book',
                'icon' => 'book-open',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Food & Beverage',
                'slug' => 'food-beverage',
                'description' => 'Layanan makanan dan minuman',
                'icon' => 'cake',
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']], // cek berdasarkan slug
                $category
            );
        }
    }
}
