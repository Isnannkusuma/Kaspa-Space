<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\PaymentSetting;

class CheckoutController extends Controller
{
   public function index()
{
    $cart = session('cart', []);
    
    if (empty($cart)) {
        return redirect('/'); // Ubah ke route home yang ada
    }

    $subtotal = array_sum(array_column($cart, 'subtotal'));
    
    // Ambil payment settings dari database
    $paymentSettings = PaymentSetting::first();

    // Pastikan qris_image menjadi URL publik
    if ($paymentSettings && $paymentSettings->qris_image) {
        $paymentSettings->qris_image = Storage::url($paymentSettings->qris_image);
    }

    return Inertia::render('Checkout/Index', [
        'cart' => $cart,
        'subtotal' => $subtotal,
        'tax' => 0,
        'total' => $subtotal,
        'paymentSettings' => [
            'qris_image' => $paymentSettings ? $paymentSettings->qris_image : '/storage/qris-default.png',
            'bank_name' => $paymentSettings ? $paymentSettings->bank_name : 'Bank BCA',
            'account_number' => $paymentSettings ? $paymentSettings->account_number : '1234567890',
            'account_name' => $paymentSettings ? $paymentSettings->account_name : 'PT Toko Kita'
        ]
    ]);
}

    public function store(Request $request)
{
    $validated = $request->validate([
        'customer_name' => 'required|string|max:255',
        'customer_email' => 'required|email|max:255',
        'customer_phone' => 'required|string|max:20',
        'notes' => 'nullable|string|max:1000',
        'payment_method' => 'required|in:qris,bank_transfer,cash',
    ]);

    $cart = session('cart', []);
    
    if (empty($cart)) {
        return back()->withErrors(['cart' => 'Keranjang kosong']);
    }

    $subtotal = array_sum(array_column($cart, 'subtotal'));

    try {
        DB::beginTransaction();

        $order = Order::create([
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'notes' => $validated['notes'] ?? null,
            'payment_method' => $validated['payment_method'],
            'payment_status' => 'pending',
            'subtotal' => $subtotal,
            'total' => $subtotal,
            'status' => 'pending',
        ]);

        foreach ($cart as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'product_variant_id' => $item['variant_id'] ?? null,
                'product_name' => $item['product_name'],
                'variant_name' => $item['variant_name'] ?? null,
                'custom_options' => $item['custom_options'] ?? [],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'subtotal' => $item['subtotal'],
            ]);
        }

        DB::commit();


       // session()->forget('cart');

        // UBAH INI: Return back dengan success (modal akan muncul otomatis)
        $paymentSettings = PaymentSetting::first();
        
        return Inertia::render('Orders/Payment', [
            'order' => $order->load('items'),
            'paymentSettings' => [
                'qris_image' => $paymentSettings ? $paymentSettings->qris_image : '/storage/qris-default.png',
                'bank_name' => $paymentSettings ? $paymentSettings->bank_name : 'Bank BCA',
                'account_number' => $paymentSettings ? $paymentSettings->account_number : '1234567890',
                'account_name' => $paymentSettings ? $paymentSettings->account_name : 'PT Toko Kita'
            ]
        ]);

    } catch (\Exception $e) {
        DB::rollBack();
        return back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
    }
}

    public function success(Order $order)
    {
        $order->load('items');
        
        return Inertia::render('Checkout/Success', [
            'order' => $order
        ]);
    }

    public function payment(Order $order)
{
    $order->load('items');
    
    // Clear cart setelah user melihat halaman payment
    session()->forget('cart');
    
    $paymentSettings = PaymentSetting::first();

    return Inertia::render('Orders/Payment', [
        'order' => $order,
        'paymentSettings' => [
            'qris_image' => $paymentSettings ? $paymentSettings->qris_image : '/storage/qris-default.png',
            'bank_name' => $paymentSettings ? $paymentSettings->bank_name : 'Bank BCA',
            'account_number' => $paymentSettings ? $paymentSettings->account_number : '1234567890',
            'account_name' => $paymentSettings ? $paymentSettings->account_name : 'PT Toko Kita'
        ]
    ]);
}
}