<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_recommendations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('recommended_product_id')->constrained('products')->onDelete('cascade');
            $table->string('title')->default('Rekomendasi untuk Anda');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            
            // Prevent duplicate recommendations
            $table->unique(['product_id', 'recommended_product_id'], 'unique_product_recommendation');
            
            // Add indexes for better performance
            $table->index('product_id');
            $table->index('recommended_product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_recommendations');
    }
};