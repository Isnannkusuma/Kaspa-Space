<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;  // ← Tambahkan ini
use App\Models\Order;  // ← Tambahkan ini
use App\Models\OrderItem;  // ← Tambahkan ini
use Illuminate\Support\Facades\DB;  // ← Tambahkan ini

class CheckoutController extends Controller
{
    public function index()
    {
        $cart = session('cart', []);
        
        if (empty($cart)) {
            return redirect()->route('products.index');
        }

        $subtotal = array_sum(array_column($cart, 'subtotal'));

        return Inertia::render('Checkout/Index', [
            'cart' => $cart,
            'subtotal' => $subtotal,
            'tax' => 0,  // ← Tambahkan ini
            'total' => $subtotal  // ← Tambahkan ini
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'notes' => 'nullable|string|max:1000',
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

            session()->forget('cart');

            return redirect()->route('order.success', $order)
                ->with('success', 'Pesanan berhasil dibuat');

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
}