<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductRecommendation;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $coworkingCategory = Category::where('slug', 'coworking-space')->first();
        $jasaCategory = Category::where('slug', 'jasa-profesional')->first();
        $kasperCategory = Category::where('slug', 'kasper-ai')->first();

        // Virtual Office Product
        $virtualOffice = Product::updateOrCreate(
            ['slug' => 'virtual-office-kaspa-space-sinarmas-surabaya'], // cek slug
            [
                'title' => 'Virtual Office - Kaspa Space Sinarmas Surabaya',
                'subtitle' => 'Virtual Office untuk Startup dan UMKM Indonesia maju',
                'description' => 'Layanan virtual office terlengkap dengan alamat prestisius di Sinarmas Surabaya. Cocok untuk startup dan UMKM yang ingin memiliki alamat bisnis profesional tanpa biaya sewa kantor yang mahal.',
                'promo_label' => 'NEW',
                'base_price' => 300000,
                'category_id' => $coworkingCategory->id,
                'is_active' => true,
                'is_featured' => true,
                'custom_options' => [
                    [
                        'question' => 'Tidak sekalian: Kasper AI, coworking lainnya, legalitas usaha, atau Microsoft key? 😊',
                        'type' => 'checkbox',
                        'options' => ['Ya, saya tertarik', 'Tidak, terima kasih'],
                        'required' => false,
                    ]
                ],
                'images' => [
                    'products/virtual-office-1.jpg',
                    'products/virtual-office-2.jpg',
                    'products/virtual-office-3.jpg',
                ],
            ]
        );

        // Variants
        $variants = [
            [
                'name' => 'Bronze 12 Bulan + PT Perorangan',
                'price' => 395000,
                'compare_price' => 450000,
                'sku' => '62638202',
                'attributes' => ['duration' => '12 months', 'package' => 'Bronze', 'legal' => 'PT Perorangan'],
            ],
            [
                'name' => 'Bronze 12 Bulan + PT Umum',
                'price' => 765000,
                'compare_price' => 850000,
                'sku' => '62638203',
                'attributes' => ['duration' => '12 months', 'package' => 'Bronze', 'legal' => 'PT Umum'],
            ],
            // dst...
        ];

        foreach ($variants as $variantData) {
            ProductVariant::updateOrCreate(
                ['sku' => $variantData['sku']], // cek SKU biar unik
                array_merge($variantData, [
                    'product_id' => $virtualOffice->id,
                    'stock_quantity' => 999,
                    'manage_stock' => false,
                    'is_active' => true,
                ])
            );
        }

        // Kasper AI Product
        $kasperAI = Product::updateOrCreate(
            ['slug' => 'kasper-ai-asisten-virtual-bisnis'],
            [
                'title' => 'Kasper AI - Asisten Virtual Bisnis',
                'subtitle' => 'Otomatisasi bisnis dengan AI terdepan',
                'description' => 'Kasper AI adalah solusi otomatisasi bisnis menggunakan artificial intelligence...',
                'promo_label' => 'HOT',
                'base_price' => 199000,
                'category_id' => $kasperCategory->id,
                'is_active' => true,
                'is_featured' => true,
                'custom_options' => [
                    [
                        'question' => 'Apakah Anda membutuhkan pelatihan khusus untuk tim?',
                        'type' => 'radio',
                        'options' => ['Ya, butuh pelatihan', 'Tidak, kami bisa mandiri'],
                        'required' => true,
                    ]
                ],
                'images' => [
                    'products/kasper-ai-1.jpg',
                    'products/kasper-ai-2.jpg',
                ],
            ]
        );

        ProductVariant::updateOrCreate(
            ['sku' => 'KASPER-BASIC-3M'],
            [
                'product_id' => $kasperAI->id,
                'name' => 'Kasper AI Basic - 3 Bulan',
                'price' => 199000,
                'compare_price' => 250000,
                'attributes' => ['duration' => '3 months', 'features' => 'basic'],
                'stock_quantity' => 999,
                'manage_stock' => false,
                'is_active' => true,
            ]
        );

        ProductVariant::updateOrCreate(
            ['sku' => 'KASPER-PRO-6M'],
            [
                'product_id' => $kasperAI->id,
                'name' => 'Kasper AI Pro - 6 Bulan',
                'price' => 399000,
                'compare_price' => 500000,
                'attributes' => ['duration' => '6 months', 'features' => 'pro'],
                'stock_quantity' => 999,
                'manage_stock' => false,
                'is_active' => true,
            ]
        );

        // Jasa Konsultasi Bisnis
        $konsultasiBisnis = Product::updateOrCreate(
            ['slug' => 'konsultasi-bisnis-premium'],
            [
                'title' => 'Konsultasi Bisnis Premium',
                'subtitle' => 'Konsultasi 1-on-1 dengan expert bisnis',
                'description' => 'Dapatkan insight mendalam tentang strategi bisnis Anda...',
                'base_price' => 500000,
                'category_id' => $jasaCategory->id,
                'is_active' => true,
                'is_featured' => false,
                'custom_options' => [
                    [
                        'question' => 'Pilih fokus konsultasi yang diinginkan',
                        'type' => 'select',
                        'options' => ['Strategi Marketing', 'Optimasi Operasional', 'Pengembangan Produk', 'Analisis Keuangan'],
                        'required' => true,
                    ]
                ],
                'images' => [
                    'products/konsultasi-1.jpg',
                    'products/konsultasi-2.jpg',
                ],
            ]
        );

        ProductVariant::updateOrCreate(
            ['sku' => 'KONSUL-2H'],
            [
                'product_id' => $konsultasiBisnis->id,
                'name' => 'Konsultasi 2 Jam',
                'price' => 500000,
                'attributes' => ['duration' => '2 hours'],
                'stock_quantity' => 50,
                'manage_stock' => true,
                'is_active' => true,
            ]
        );

        ProductVariant::updateOrCreate(
            ['sku' => 'KONSUL-4H-RPT'],
            [
                'product_id' => $konsultasiBisnis->id,
                'name' => 'Konsultasi 4 Jam + Report',
                'price' => 900000,
                'compare_price' => 1000000,
                'attributes' => ['duration' => '4 hours', 'includes' => 'detailed report'],
                'stock_quantity' => 30,
                'manage_stock' => true,
                'is_active' => true,
            ]
        );

        // Recommendations
        ProductRecommendation::updateOrCreate(
            ['product_id' => $virtualOffice->id, 'recommended_product_id' => $kasperAI->id],
            ['title' => 'Rekomendasi untuk Anda', 'sort_order' => 0]
        );

        ProductRecommendation::updateOrCreate(
            ['product_id' => $virtualOffice->id, 'recommended_product_id' => $konsultasiBisnis->id],
            ['title' => 'Rekomendasi untuk Anda', 'sort_order' => 1]
        );

        ProductRecommendation::updateOrCreate(
            ['product_id' => $kasperAI->id, 'recommended_product_id' => $virtualOffice->id],
            ['title' => 'Cocok Dipadukan Dengan', 'sort_order' => 0]
        );
    }
}
