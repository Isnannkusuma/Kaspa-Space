<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    public function index()
    {
        $products = Product::where('is_active', 1)
            ->orderBy('sort_order')
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'slug' => $product->slug,
                    'subtitle' => $product->subtitle,
                    'description' => $product->description,
                    'promo_label' => $product->promo_label,
                    'base_price' => (string) $product->base_price,
                    'images' => is_array($product->images) ? $product->images : [],
                    'is_featured' => $product->is_featured,
                ];
            })->values()->toArray();
        
        return Inertia::render('WorkSpaceSection', [
            'products' => $products
        ]);
    }
}