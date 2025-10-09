<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'subtitle',
        'description',
        'promo_label',
        'base_price',
        'images',
        'custom_options',
        'is_active',    
        'is_featured',
        'sort_order',
        'meta_description',
        'meta_keywords',
        'category_id',
    ];

    protected $casts = [
        'images' => 'array',
        'custom_options' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'base_price' => 'decimal:2',
        'sort_order' => 'integer', // TAMBAHKAN INI
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (!$product->slug) {
                $product->slug = Str::slug($product->title);
            }
        });

        static::updating(function ($product) {
            if ($product->isDirty('title') && !$product->isDirty('slug')) {
                $product->slug = Str::slug($product->title);
            }
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class)->orderBy('sort_order'); // TAMBAHKAN orderBy
    }

    public function activeVariants()
    {
        return $this->hasMany(ProductVariant::class)
            ->where('is_active', true)
            ->orderBy('sort_order');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function recommendations()
    {
        return $this->hasMany(ProductRecommendation::class);
    }

    public function recommendedProducts()
    {
        return $this->belongsToMany(Product::class, 'product_recommendations', 'product_id', 'recommended_product_id')
            ->withPivot('title', 'sort_order')
            ->orderByPivot('sort_order');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc')->orderBy('title', 'asc');
    }

    public function getFirstImageAttribute()
    {
        return $this->images && count($this->images) > 0 ? $this->images[0] : null;
    }

    public function getMinPriceAttribute()
    {
        $minVariantPrice = $this->variants()->min('price');
        return $minVariantPrice ?? $this->base_price;
    }

    public function getMaxPriceAttribute()
    {
        $maxVariantPrice = $this->variants()->max('price');
        return $maxVariantPrice ?? $this->base_price;
    }

    public function hasVariants()
    {
        return $this->variants()->exists();
    }
}