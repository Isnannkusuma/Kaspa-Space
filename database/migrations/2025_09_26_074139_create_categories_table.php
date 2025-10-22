<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
// Di migration create_products_table.php
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('slug')->unique();
        $table->string('subtitle')->nullable();
        $table->text('description')->nullable();
        $table->string('promo_label')->nullable();
        $table->decimal('base_price', 12, 2);
        $table->json('images')->nullable();
        $table->json('custom_options')->nullable();
        $table->boolean('is_active')->default(true);
        $table->boolean('is_featured')->default(false);
        $table->integer('sort_order')->default(0);
        $table->string('meta_description')->nullable();
        $table->string('meta_keywords')->nullable();
        $table->foreignId('category_id')->constrained();
        $table->timestamps();
    });
    }

    public function down()
    {
        Schema::dropIfExists('categories');
    }
};