<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'subtitle' => $this->subtitle,
            'description' => $this->description,
            'base_price' => (float) $this->base_price,
            'promo_label' => $this->promo_label,
            'images' => $this->images ?? [],
            'custom_options' => $this->custom_options ?? [],
            'is_active' => (bool) $this->is_active,
            'is_featured' => (bool) $this->is_featured,
            'sort_order' => (int) $this->sort_order,
            
            // Relations
            'category' => $this->when($this->relationLoaded('category'), function () {
                return [
                    'id' => $this->category->id,
                    'name' => $this->category->name,
                    'slug' => $this->category->slug,
                ];
            }),
            
            'variants' => $this->when($this->relationLoaded('variants'), function () {
                return $this->variants->map(function ($variant) {
                    return [
                        'id' => $variant->id,
                        'name' => $variant->name,
                        'description' => $variant->description,
                        'sku' => $variant->sku,
                        'price' => (float) $variant->price,
                        'compare_price' => $variant->compare_price ? (float) $variant->compare_price : null,
                        'is_active' => (bool) $variant->is_active,
                        'manage_stock' => (bool) $variant->manage_stock,
                        'stock_quantity' => (int) $variant->stock_quantity,
                        'sort_order' => (int) $variant->sort_order,
                        'attributes' => $variant->attributes,
                        'image' => $variant->image,
                    ];
                });
            }),
            
            'recommendedProducts' => $this->when($this->relationLoaded('recommendedProducts'), function () {
                return ProductResource::collection($this->recommendedProducts);
            }),
        ];
    }
}