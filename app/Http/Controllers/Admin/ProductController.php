<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductVariant;
use App\Models\ProductRecommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'variants'])
            ->when($request->category_id, function ($q, $categoryId) {
                return $q->where('category_id', $categoryId);
            })
            ->when($request->search, function ($q, $search) {
                return $q->where('title', 'like', "%{$search}%")
                         ->orWhere('subtitle', 'like', "%{$search}%");
            })
            ->when($request->status !== null, function ($q) use ($request) {
                return $q->where('is_active', $request->status);
            })
            ->latest();

        $products = $query->paginate(12)->withQueryString();
        
        // Add calculated fields for each product
        $products->getCollection()->transform(function ($product) {
            $product->min_price = $product->getMinPriceAttribute();
            $product->max_price = $product->getMaxPriceAttribute();
            $product->variants_count = $product->variants->count();
            return $product;
        });

        $categories = Category::ordered()->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['category_id', 'search', 'status']),
        ]);
    }

    public function create()
    {
        $categories = Category::active()->ordered()->get();
        $allProducts = Product::active()->with('category')->get();

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
            'allProducts' => $allProducts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug',
            'description' => 'nullable|string',
            'promo_label' => 'nullable|string|max:100',
            'base_price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'sort_order' => 'integer|min:0',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => 'nullable|string|max:255',
            
            // Images
            'images' => 'nullable|array|max:6',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            
            // Custom options
            'custom_options' => 'nullable|array',
            'custom_options.*.question' => 'required|string',
            'custom_options.*.type' => 'required|in:checkbox,radio,select,text',
            'custom_options.*.options' => 'nullable|array',
            'custom_options.*.required' => 'boolean',
            
            // Variants
            'variants' => 'nullable|array',
            'variants.*.name' => 'required|string|max:255',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.compare_price' => 'nullable|numeric|min:0',
            'variants.*.attributes' => 'nullable|array',
            'variants.*.stock_quantity' => 'integer|min:0',
            'variants.*.manage_stock' => 'boolean',
            
            // Recommendations
            'recommendations' => 'nullable|array',
            'recommendations.*' => 'exists:products,id',
        ]);

        DB::beginTransaction();

        try {
            // Handle image uploads
            $imagePaths = [];
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('products', 'public');
                    $imagePaths[] = $path;
                }
            }
            $validated['images'] = $imagePaths;

            // Create product
            $product = Product::create($validated);

            // Create variants if provided
            if (!empty($validated['variants'])) {
                foreach ($validated['variants'] as $variantData) {
                    $variant = new ProductVariant($variantData);
                    $variant->product_id = $product->id;
                    $variant->save();
                }
            }

            // Create recommendations if provided
            if (!empty($validated['recommendations'])) {
                foreach ($validated['recommendations'] as $index => $recommendedProductId) {
                    ProductRecommendation::create([
                        'product_id' => $product->id,
                        'recommended_product_id' => $recommendedProductId,
                        'sort_order' => $index,
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('admin.products.index')
                ->with('success', 'Produk berhasil ditambahkan.');

        } catch (\Exception $e) {
            DB::rollback();
            
            // Delete uploaded images if transaction fails
            foreach ($imagePaths as $path) {
                Storage::disk('public')->delete($path);
            }

            return back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan produk.']);
        }
    }

    public function show(Product $product)
    {
        $product->load([
            'category',
            'variants' => function ($query) {
                $query->orderBy('sort_order')->orderBy('name');
            },
            'recommendedProducts.category'
        ]);

        return Inertia::render('Admin/Products/Show', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product)
    {
        $product->load([
            'variants' => function ($query) {
                $query->orderBy('sort_order')->orderBy('name');
            },
            'recommendedProducts'
        ]);

        $categories = Category::active()->ordered()->get();
        $allProducts = Product::where('id', '!=', $product->id)
            ->active()
            ->with('category')
            ->get();

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'allProducts' => $allProducts,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug,' . $product->id,
            'description' => 'nullable|string',
            'promo_label' => 'nullable|string|max:100',
            'base_price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'sort_order' => 'integer|min:0',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => 'nullable|string|max:255',
            
            // Images
            'images' => 'nullable|array|max:6',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'existing_images' => 'nullable|array',
            
            // Custom options
            'custom_options' => 'nullable|array',
            'custom_options.*.question' => 'required|string',
            'custom_options.*.type' => 'required|in:checkbox,radio,select,text',
            'custom_options.*.options' => 'nullable|array',
            'custom_options.*.required' => 'boolean',
            
            // Variants
            'variants' => 'nullable|array',
            'variants.*.id' => 'nullable|exists:product_variants,id',
            'variants.*.name' => 'required|string|max:255',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.compare_price' => 'nullable|numeric|min:0',
            'variants.*.attributes' => 'nullable|array',
            'variants.*.stock_quantity' => 'integer|min:0',
            'variants.*.manage_stock' => 'boolean',
            'variants.*.sku' => 'nullable|string|max:100',
            
            // Recommendations
            'recommendations' => 'nullable|array',
            'recommendations.*' => 'exists:products,id',
        ]);

        DB::beginTransaction();

        try {
            // Handle images
            $imagePaths = $validated['existing_images'] ?? [];
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('products', 'public');
                    $imagePaths[] = $path;
                }
            }
            $validated['images'] = $imagePaths;

            // Remove existing_images from validated data
            unset($validated['existing_images']);

            // Update product
            $product->update($validated);

            // Update variants
            if (isset($validated['variants'])) {
                $existingVariantIds = $product->variants()->pluck('id')->toArray();
                $updatedVariantIds = [];

                foreach ($validated['variants'] as $variantData) {
                    if (isset($variantData['id']) && $variantData['id']) {
                        // Update existing variant
                        $variant = ProductVariant::find($variantData['id']);
                        if ($variant && $variant->product_id === $product->id) {
                            $variant->update($variantData);
                            $updatedVariantIds[] = $variant->id;
                        }
                    } else {
                        // Create new variant
                        $variant = new ProductVariant($variantData);
                        $variant->product_id = $product->id;
                        $variant->save();
                        $updatedVariantIds[] = $variant->id;
                    }
                }

                // Delete variants that are no longer present
                $variantsToDelete = array_diff($existingVariantIds, $updatedVariantIds);
                ProductVariant::whereIn('id', $variantsToDelete)->delete();
            }

            // Update recommendations
            if (isset($validated['recommendations'])) {
                // Delete existing recommendations
                $product->recommendations()->delete();

                // Create new recommendations
                foreach ($validated['recommendations'] as $index => $recommendedProductId) {
                    ProductRecommendation::create([
                        'product_id' => $product->id,
                        'recommended_product_id' => $recommendedProductId,
                        'sort_order' => $index,
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('admin.products.index')
                ->with('success', 'Produk berhasil diperbarui.');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui produk.']);
        }
    }

    public function destroy(Product $product)
    {
        DB::beginTransaction();

        try {
            // Delete product images
            if ($product->images) {
                foreach ($product->images as $imagePath) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            // Delete product (variants and recommendations will be deleted via cascade)
            $product->delete();

            DB::commit();

            return redirect()->route('admin.products.index')
                ->with('success', 'Produk berhasil dihapus.');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menghapus produk.']);
        }
    }

    public function duplicate(Product $product)
    {
        DB::beginTransaction();

        try {
            $newProduct = $product->replicate();
            $newProduct->title = $product->title . ' - Copy';
            $newProduct->slug = null; // Will be auto-generated
            $newProduct->is_active = false; // Set as draft
            $newProduct->save();

            // Duplicate variants
            foreach ($product->variants as $variant) {
                $newVariant = $variant->replicate();
                $newVariant->product_id = $newProduct->id;
                $newVariant->sku = null; // Will be auto-generated
                $newVariant->save();
            }

            // Duplicate recommendations
            foreach ($product->recommendations as $recommendation) {
                ProductRecommendation::create([
                    'product_id' => $newProduct->id,
                    'recommended_product_id' => $recommendation->recommended_product_id,
                    'title' => $recommendation->title,
                    'sort_order' => $recommendation->sort_order,
                ]);
            }

            DB::commit();

            return redirect()->route('admin.products.edit', $newProduct)
                ->with('success', 'Produk berhasil diduplikasi.');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menduplikasi produk.']);
        }
    }

    public function updateStatus(Request $request, Product $product)
    {
        $validated = $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $product->update($validated);

        return response()->json([
            'message' => 'Status produk berhasil diperbarui.',
            'product' => $product->fresh(),
        ]);
    }

    public function bulkDelete(Request $request)
    {
        $validated = $request->validate([
            'product_ids' => 'required|array',
            'product_ids.*' => 'exists:products,id',
        ]);

        DB::beginTransaction();

        try {
            $products = Product::whereIn('id', $validated['product_ids'])->get();

            foreach ($products as $product) {
                // Delete product images
                if ($product->images) {
                    foreach ($product->images as $imagePath) {
                        Storage::disk('public')->delete($imagePath);
                    }
                }
            }

            // Delete products
            Product::whereIn('id', $validated['product_ids'])->delete();

            DB::commit();

            return response()->json([
                'message' => count($validated['product_ids']) . ' produk berhasil dihapus.',
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Terjadi kesalahan saat menghapus produk.',
            ], 500);
        }
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $path = $request->file('image')->store('products', 'public');

        return response()->json([
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
        ]);
    }

    public function deleteImage(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        Storage::disk('public')->delete($request->path);

        return response()->json(['message' => 'Gambar berhasil dihapus.']);
    }

    public function toggleFeatured(Product $product)
    {
        $product->update([
            'is_featured' => !$product->is_featured
        ]);

        return response()->json([
            'message' => 'Status featured berhasil diperbarui.',
            'product' => $product->fresh(),
        ]);
    }

    public function export(Request $request)
    {
        // Export products to CSV/Excel
        $products = Product::with(['category', 'variants'])
            ->when($request->category_id, function ($q, $categoryId) {
                return $q->where('category_id', $categoryId);
            })
            ->get();

        $filename = 'products_export_' . date('Y-m-d_H-i-s') . '.csv';
        $headers = array(
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );

        $callback = function() use($products) {
            $file = fopen('php://output', 'w');
            
            // CSV headers
            fputcsv($file, ['ID', 'Title', 'Category', 'Base Price', 'Status', 'Variants Count', 'Created At']);
            
            foreach ($products as $product) {
                fputcsv($file, [
                    $product->id,
                    $product->title,
                    $product->category->name,
                    $product->base_price,
                    $product->is_active ? 'Active' : 'Inactive',
                    $product->variants->count(),
                    $product->created_at->format('Y-m-d H:i:s'),
                ]);
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt',
        ]);

        $file = $request->file('file');
        $csvData = file_get_contents($file);
        $rows = array_map('str_getcsv', explode("\n", $csvData));
        $header = array_shift($rows);

        DB::beginTransaction();
        
        try {
            foreach ($rows as $row) {
                if (count($row) === count($header)) {
                    $data = array_combine($header, $row);
                    
                    // Create product from CSV data
                    if (!empty($data['title'])) {
                        Product::create([
                            'title' => $data['title'],
                            'subtitle' => $data['subtitle'] ?? null,
                            'description' => $data['description'] ?? null,
                            'base_price' => $data['base_price'] ?? 0,
                            'category_id' => Category::where('name', $data['category'])->first()?->id ?? 1,
                            'is_active' => ($data['status'] ?? 'active') === 'active',
                        ]);
                    }
                }
            }

            DB::commit();
            
            return redirect()->route('admin.products.index')
                ->with('success', 'Produk berhasil diimpor.');
                
        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Terjadi kesalahan saat mengimpor produk: ' . $e->getMessage()]);
        }
    }
}