<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\CartController;
use App\Models\GoogleSheetsConfig;
use App\Models\Product;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

Route::get('/workspace-section', function () {
    $products = Product::with(['category', 'variants']) // PENTING: Load variants
        ->where('is_active', 1)
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
                'category' => $product->category ? [
                    'id' => $product->category->id,
                    'name' => $product->category->name,
                    'slug' => $product->category->slug,
                ] : null,
                // TAMBAHKAN INI - Variants
                'variants' => $product->variants->map(function ($variant) {
                    return [
                        'id' => $variant->id,
                        'name' => $variant->name,
                        'description' => $variant->description ?? null,
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
                })->toArray(),
                // TAMBAHKAN INI - Custom Options
                'custom_options' => is_array($product->custom_options) 
                    ? array_map(function($option) {
                        return [
                            'name' => $option['question'] ?? $option['name'] ?? '',
                            'label' => $option['question'] ?? $option['label'] ?? $option['name'] ?? '',
                            'type' => $option['type'] ?? 'text',
                            'required' => $option['required'] ?? false,
                            'placeholder' => $option['placeholder'] ?? null,
                            'options' => $option['options'] ?? null,
                        ];
                    }, $product->custom_options)
                    : [],
            ];
        })->values()->toArray();
    
    return Inertia::render('WorkSpaceSection', [
        'products' => $products
    ]);

Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');
Route::post('/cart/update-quantity', [CartController::class, 'updateQuantity'])->name('cart.updateQuantity');

})->name('workspace.section');
Route::get('/jasa-profesional-section', function () {
    return Inertia::render('JasaProfesionalSection');
})->name('jasa.profesional.section');

Route::get('/food-beverage', function () {
    return Inertia::render('FoodBeverage');
})->name('food.beverage');

// Public Schedule Routes
Route::get('/jadwal-ruangan', function() {
    return Inertia::render('Schedule/Index', [
        'initialData' => \App\Models\Schedule::all(),
        'googleSheetsConfig' => GoogleSheetsConfig::where('is_active', true)->first(),
    ]);
})->name('schedule.index');

// API untuk real-time data
Route::get('/api/schedule-data', [ScheduleController::class, 'getPublicData']);

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::get('/admin/test', function () {
    return response()->json(['message' => 'Admin route works']);
})->name('admin.test');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    
    // Dashboard
    Route::get('/adminlayout', function () {
        return Inertia::render('Admin/LandingAdmin');
    })->name('LandingAdmin');

    // Schedule Management Routes
    Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule.index');
    Route::post('/schedule/upload', [ScheduleController::class, 'upload'])->name('schedule.upload');
    Route::delete('/schedule/clear', [ScheduleController::class, 'clear'])->name('schedule.clear');
    Route::get('/schedule/view', [ScheduleController::class, 'view'])->name('schedule.view');

    // Google Sheets Configuration
    Route::get('/google-sheets-config', function() {
        return Inertia::render('Admin/GoogleSheetsConfig', [
            'currentConfig' => GoogleSheetsConfig::first(),
        ]);
    })->name('google-sheets');
    
    // Google Sheets API routes (uncomment when controller is created)
    // Route::post('/google-sheets/test', [GoogleSheetsController::class, 'test']);
    // Route::post('/google-sheets/store', [GoogleSheetsController::class, 'store']);

    // Categories Management
    Route::resource('categories', CategoryController::class);
    Route::patch('categories/update-order', [CategoryController::class, 'updateOrder'])->name('categories.update-order');

    // Products Management
    Route::resource('products', ProductController::class);
    Route::post('products/{product}/duplicate', [ProductController::class, 'duplicate'])->name('products.duplicate');
    Route::patch('products/{product}/status', [ProductController::class, 'updateStatus'])->name('products.update-status');
    Route::patch('products/{product}/featured', [ProductController::class, 'toggleFeatured'])->name('products.toggle-featured');
    Route::delete('products/bulk-delete', [ProductController::class, 'bulkDelete'])->name('products.bulk-delete');
    
    // Product Image Management
    Route::post('products/upload-image', [ProductController::class, 'uploadImage'])->name('products.upload-image');
    Route::delete('products/delete-image', [ProductController::class, 'deleteImage'])->name('products.delete-image');
    
    // Product Export/Import
    Route::get('products/export', [ProductController::class, 'export'])->name('products.export');
    Route::post('products/import', [ProductController::class, 'import'])->name('products.import');

    // Other Admin Pages
    Route::get('settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('settings');

    Route::get('statistics', function () {
        return Inertia::render('Admin/Statistics');
    })->name('statistics');

    Route::get('reservations', function () {
        return Inertia::render('Admin/Reservations');
    })->name('reservations');

    Route::get('discounts', function () {
        return Inertia::render('Admin/Discounts');
    })->name('discounts');

    Route::get('integrations', function () {
        return Inertia::render('Admin/Integrations');
    })->name('integrations');
});

/*
|--------------------------------------------------------------------------
| Schedule Management Route (Legacy)
|--------------------------------------------------------------------------
*/

Route::get('/ScheduleManagement', function () {
    return Inertia::render('Admin/ScheduleManagement');
})->name('schedule.management');

/*
|--------------------------------------------------------------------------
| Public Frontend Routes (E-commerce)
|--------------------------------------------------------------------------
| Uncomment when controllers are created
*/


Route::middleware(['web'])->group(function () {
    // Product catalog
    Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index'])->name('products.index');
    Route::get('/products/{category:slug}', [\App\Http\Controllers\ProductController::class, 'category'])->name('products.category');
    Route::get('/product/{product:slug}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');
    
    // Cart and Checkout
    Route::post('/cart/add', [\App\Http\Controllers\CartController::class, 'add'])->name('cart.add');
    Route::get('/cart', [\App\Http\Controllers\CartController::class, 'index'])->name('cart.index');
    Route::post('/checkout', [\App\Http\Controllers\CheckoutController::class, 'process'])->name('checkout.process');
});


/*
|--------------------------------------------------------------------------
| Login Page Route
|--------------------------------------------------------------------------
*/

Route::get('/adminlogin', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('admin.login.page');


// checkout

// Cart routes
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::delete('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');
Route::patch('/cart/quantity', [CartController::class, 'updateQuantity'])->name('cart.quantity');

// Checkout routes
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/order/success/{order}', [CheckoutController::class, 'success'])->name('order.success');

// Admin routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.status');
});

Route::get('/test-product/{slug}', function ($slug) {
    $product = \App\Models\Product::with(['variants'])
        ->where('slug', $slug)
        ->firstOrFail();
    
    return response()->json([
        'id' => $product->id,
        'title' => $product->title,
        'variants_loaded' => $product->relationLoaded('variants'),
        'variants_count' => $product->variants->count(),
        'variants' => $product->variants->toArray(),
        'custom_options_type' => gettype($product->custom_options),
        'custom_options' => $product->custom_options,
        'images_type' => gettype($product->images),
        'images' => $product->images,
    ]);
});

Route::get('/workspace/{category?}', [WorkspaceController::class, 'index'])->name('workspace');

require __DIR__.'/auth.php';