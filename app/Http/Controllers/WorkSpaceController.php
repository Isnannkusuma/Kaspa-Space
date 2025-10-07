<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    public function index()
    {
        // Cari ID kategori Coworking Space terlebih dahulu
        $coworkingCategory = \App\Models\Category::where('name', 'Coworking Space')->first();
        
        if (!$coworkingCategory) {
            // Jika kategori tidak ditemukan
            return Inertia::render('WorkSpaceSection', [
                'products' => []
            ]);
        }
        
        // Filter produk berdasarkan category_id langsung
        $products = Product::with('category')
            ->where('category_id', $coworkingCategory->id)
            ->where('is_active', true)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'slug' => $product->slug,
                    'subtitle' => $product->subtitle,
                    'description' => $product->description,
                    'promo_label' => $product->promo_label,
                    'base_price' => $product->base_price,
                    'images' => $product->images ?? [],
                    'is_featured' => $product->is_featured,
                    'category' => [
                        'id' => $product->category->id,
                        'name' => $product->category->name,
                        'slug' => $product->category->slug,
                    ],
                ];
            })
            ->values()
            ->toArray();
        
        return Inertia::render('WorkSpaceSection', [
            'products' => $products
        ]);
    }
}