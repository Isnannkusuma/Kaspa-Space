<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    public function index($categorySlug = 'coworking-space')
    {
        // Cari kategori berdasarkan slug
        $category = Category::where('slug', $categorySlug)->first();
        
        if (!$category) {
            return Inertia::render('WorkSpaceSection', [
                'products' => [],
                'currentCategory' => null,
                'categories' => Category::select('id', 'name', 'slug')->get()
            ]);
        }
        
        $products = Product::with(['category', 'variants', 'custom_options'])
            ->where('category_id', $category->id)
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
                    'variants' => $product->variants,
                    'custom_options' => $product->custom_options,
                    'category' => [
                        'id' => $product->category->id,
                        'name' => $product->category->name,
                        'slug' => $product->category->slug,
                    ],
                ];
            });
        
        return Inertia::render('WorkSpaceSection', [
            'products' => $products,
            'currentCategory' => $category->only(['id', 'name', 'slug']),
            'categories' => Category::select('id', 'name', 'slug')->get()
        ]);
    }
}