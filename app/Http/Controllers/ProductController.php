<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of products
     */
    public function index()
    {
        $products = Product::with(['category', 'variants'])
            ->active()
            ->ordered()
            ->get()
            ->map(function ($product) {
                return $this->formatProductForInertia($product);
            });
        
        // Debug: Log first product
        if ($products->isNotEmpty()) {
            \Log::info('First product from index:', $products->first());
        }
        
        return Inertia::render('Products/Index', [
            'products' => $products->values()->all(), // PENTING: Convert ke plain array
        ]);
    }

    /**
     * Display the specified product
     */
    public function show($slug)
    {
        $product = Product::with(['category', 'variants', 'recommendedProducts.category', 'recommendedProducts.variants'])
            ->where('slug', $slug)
            ->firstOrFail();
        
        $formattedProduct = $this->formatProductForInertia($product);
        
        // PENTING: Force to array untuk Inertia
        return Inertia::render('Products/Show', [
            'product' => $formattedProduct,
        ]);
    }
    
    /**
     * Format product untuk Inertia.js
     */
    private function formatProductForInertia($product)
    {
        // Pastikan variants ter-load
        if (!$product->relationLoaded('variants')) {
            $product->load('variants');
        }
        
        $data = [
            'id' => $product->id,
            'title' => $product->title ?? '',
            'subtitle' => $product->subtitle ?? '',
            'slug' => $product->slug ?? '',
            'description' => $product->description ?? '',
            'base_price' => $product->base_price ?? 0,
            'promo_label' => $product->promo_label ?? null,
            'images' => $this->parseImages($product->images),
            'is_active' => $product->is_active ?? true,
            'category' => null,
            'variants' => [],
            'custom_options' => [],
            'recommendedProducts' => [],
        ];
        
        // Format category
        if ($product->relationLoaded('category') && $product->category) {
            $data['category'] = [
                'id' => $product->category->id,
                'name' => $product->category->name,
                'slug' => $product->category->slug ?? '',
            ];
        }
        
        // Format variants
        if ($product->relationLoaded('variants') && $product->variants) {
            $data['variants'] = $product->variants->map(function ($variant) {
                return [
                    'id' => $variant->id,
                    'name' => $variant->name ?? '',
                    'description' => $variant->description ?? null,
                    'sku' => $variant->sku ?? null,
                    'price' => (float) ($variant->price ?? 0),
                    'compare_price' => $variant->compare_price ? (float) $variant->compare_price : null,
                    'is_active' => (bool) ($variant->is_active ?? true),
                    'manage_stock' => (bool) ($variant->manage_stock ?? false),
                    'stock_quantity' => (int) ($variant->stock_quantity ?? 0),
                    'sort_order' => (int) ($variant->sort_order ?? 0),
                    'attributes' => $variant->attributes ?? null,
                    'image' => $variant->image ?? null,
                ];
            })->toArray();
        }
        
        // Parse custom options
        $data['custom_options'] = $this->parseCustomOptions($product->custom_options);
        
        // Format recommended products
        if ($product->relationLoaded('recommendedProducts') && $product->recommendedProducts) {
            $data['recommendedProducts'] = $product->recommendedProducts->map(function ($p) {
                return $this->formatProductForInertia($p);
            })->toArray();
        }
        
        return $data;
    }
    
    /**
     * Parse images dari JSON/array
     */
    private function parseImages($images)
    {
        if (empty($images)) {
            return [];
        }
        
        // Jika sudah array, return langsung
        if (is_array($images)) {
            return $images;
        }
        
        // Jika string JSON, decode
        if (is_string($images)) {
            $decoded = json_decode($images, true);
            return is_array($decoded) ? $decoded : [];
        }
        
        return [];
    }
    
    /**
     * Parse custom options dari JSON/array
     */
    private function parseCustomOptions($customOptions)
    {
        if (empty($customOptions)) {
            return [];
        }
        
        // Jika sudah array, return langsung
        if (is_array($customOptions)) {
            // PENTING: Map ulang untuk memastikan struktur konsisten
            return array_map(function($option) {
                return [
                    'name' => $option['question'] ?? $option['name'] ?? '',
                    'label' => $option['question'] ?? $option['label'] ?? $option['name'] ?? '',
                    'type' => $option['type'] ?? 'text',
                    'required' => $option['required'] ?? false,
                    'placeholder' => $option['placeholder'] ?? null,
                    'options' => $option['options'] ?? null,
                ];
            }, $customOptions);
        }
        
        // Jika string JSON, decode
        if (is_string($customOptions)) {
            $decoded = json_decode($customOptions, true);
            if (is_array($decoded)) {
                return array_map(function($option) {
                    return [
                        'name' => $option['question'] ?? $option['name'] ?? '',
                        'label' => $option['question'] ?? $option['label'] ?? $option['name'] ?? '',
                        'type' => $option['type'] ?? 'text',
                        'required' => $option['required'] ?? false,
                        'placeholder' => $option['placeholder'] ?? null,
                        'options' => $option['options'] ?? null,
                    ];
                }, $decoded);
            }
        }
        
        return [];
    }
}