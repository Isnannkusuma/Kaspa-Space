<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'name',
        'sku',
        'price',
        'compare_price',
        'stock_quantity',
        'manage_stock',
        'attributes',
        'image',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'attributes' => 'json',
        'is_active' => 'boolean',
        'manage_stock' => 'boolean',
        'price' => 'decimal:2',
        'compare_price' => 'decimal:2',
        'sort_order' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($variant) {
            if (!$variant->sku) {
                $variant->sku = 'VAR-' . strtoupper(uniqid());
            }
        });
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeInStock($query)
    {
        return $query->where(function ($q) {
            $q->where('manage_stock', false)
              ->orWhere('stock_quantity', '>', 0);
        });
    }

    public function orderItems()
    {
    return $this->hasMany(OrderItem::class);
    }

    public function isInStock()
    {
        return !$this->manage_stock || $this->stock_quantity > 0;
    }

    public function hasDiscount()
    {
        return $this->compare_price && $this->compare_price > $this->price;
    }

    public function getDiscountPercentageAttribute()
    {
        if (!$this->hasDiscount()) {
            return 0;
        }
        
        return round((($this->compare_price - $this->price) / $this->compare_price) * 100);
    }

    public function getAttribute($key)
    {
        return $this->attributes[$key] ?? null;
    }
}