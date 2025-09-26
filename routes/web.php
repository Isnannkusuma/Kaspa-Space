<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ScheduleController;
use App\Models\GoogleSheetsConfig;
use App\Http\Controllers\Admin\CategoryController;


Route::get('/', function () {
    return Inertia::render('LandingPage');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/workspace-section', function () {
    return Inertia::render('WorkSpaceSection');
})->name('workspace.section');

Route::get('/jasa-profesional-section', function () {
    return Inertia::render('JasaProfesionalSection');
})->name('jasa.profesional.section');

Route::get('/food-beverage', function () {
    return Inertia::render('FoodBeverage');
})->name('food.beverage');

Route::get('/ScheduleManagement', function () {
    return Inertia::render('admin/ScheduleManagement');
})->name('schedule.management');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard schedule page
    Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule.index');
    
    // Upload schedule data
    Route::post('/schedule/upload', [ScheduleController::class, 'upload'])->name('schedule.upload');
    
    // Clear all schedules
    Route::delete('/schedule/clear', [ScheduleController::class, 'clear'])->name('schedule.clear');
    
    // View current data
    Route::get('/schedule/view', [ScheduleController::class, 'view'])->name('schedule.view');
});

Route::get('/api/schedule-data', [ScheduleController::class, 'getPublicData']);

// Google API
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/google-sheets-config', function() {
        return Inertia::render('admin/GoogleSheetsConfig', [
            'currentConfig' => GoogleSheetsConfig::first(),
        ]);
    })->name('admin.google-sheets');
    
    // API routes untuk test dan save
    Route::post('/google-sheets/test', [GoogleSheetsController::class, 'test']);
    Route::post('/google-sheets/store', [GoogleSheetsController::class, 'store']);
});

// Public routes
Route::get('/jadwal-ruangan', function() {
    return Inertia::render('Schedule/Index', [
        'initialData' => Schedule::all(),
        'googleSheetsConfig' => GoogleSheetsConfig::where('is_active', true)->first(),
    ]);
})->name('schedule.index');

// API untuk real-time data
Route::get('/api/schedule-data', [ScheduleController::class, 'getPublicData']);



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/adminlogin', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Admin Routes - Protected by authentication
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    
    // Dashboard
    Route::get('/adminlogin', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Categories Management
    Route::resource('categories', CategoryController::class);
    Route::patch('categories/update-order', [CategoryController::class, 'updateOrder'])->name('categories.update-order');

    // Products Management
    Route::resource('products', ProductController::class);
    Route::post('products/{product}/duplicate', [ProductController::class, 'duplicate'])->name('products.duplicate');
    Route::patch('products/{product}/status', [ProductController::class, 'updateStatus'])->name('products.update-status');
    Route::delete('products/bulk-delete', [ProductController::class, 'bulkDelete'])->name('products.bulk-delete');
    
    // Product Image Management
    Route::post('products/upload-image', [ProductController::class, 'uploadImage'])->name('products.upload-image');
    Route::delete('products/delete-image', [ProductController::class, 'deleteImage'])->name('products.delete-image');

    // Settings
    Route::get('settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('settings');

    // Statistics
    Route::get('statistics', function () {
        return Inertia::render('Admin/Statistics');
    })->name('statistics');

    // Reservations (if needed)
    Route::get('reservations', function () {
        return Inertia::render('Admin/Reservations');
    })->name('reservations');

    // Discounts (if needed)
    Route::get('discounts', function () {
        return Inertia::render('Admin/Discounts');
    })->name('discounts');

    // Integrations (if needed)
    Route::get('integrations', function () {
        return Inertia::render('Admin/Integrations');
    })->name('integrations');
});

// Public Frontend Routes
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

require __DIR__.'/auth.php';
