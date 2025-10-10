<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductVariant;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = session('cart', []);
        
        return Inertia::render('Cart/Index', [
            'cart' => $cart
        ]);
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_name' => 'required|string',
            'variant_id' => 'nullable|exists:product_variants,id',
            'variant_name' => 'nullable|string',
            'custom_options' => 'nullable|array',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        $cart = session('cart', []);
        
        
        if ($validated['variant_id']) {
            $variant = ProductVariant::find($validated['variant_id']);
            if ($variant->manage_stock && $variant->stock_quantity < $validated['quantity']) {
                return back()->withErrors(['stock' => 'Stok tidak mencukupi']);
            }
        }

        $cartItem = [
            'id' => uniqid(),
            'product_id' => $validated['product_id'],
            'product_name' => $validated['product_name'],
            'variant_id' => $validated['variant_id'] ?? null,
            'variant_name' => $validated['variant_name'] ?? null,
            'custom_options' => $validated['custom_options'] ?? [],
            'quantity' => $validated['quantity'],
            'price' => $validated['price'],
            'subtotal' => $validated['price'] * $validated['quantity'],
        ];

        $cart[] = $cartItem;
        session(['cart' => $cart]);

        return back()->with('success', 'Produk berhasil ditambahkan ke keranjang');
    }

    public function remove(Request $request)
    {
        $cart = session('cart', []);
        $itemId = $request->input('id');
        
        $cart = array_filter($cart, function($item) use ($itemId) {
            return $item['id'] !== $itemId;
        });
        
        session(['cart' => array_values($cart)]);

        return back()->with('success', 'Produk berhasil dihapus dari keranjang');
    }

    public function updateQuantity(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = session('cart', []);
        
        foreach ($cart as &$item) {
            if ($item['id'] === $validated['id']) {
                // Cek stok jika variant memiliki stock management
                if ($item['variant_id']) {
                    $variant = ProductVariant::find($item['variant_id']);
                    if ($variant->manage_stock && $variant->stock_quantity < $validated['quantity']) {
                        return back()->withErrors(['stock' => 'Stok tidak mencukupi']);
                    }
                }
                
                $item['quantity'] = $validated['quantity'];
                $item['subtotal'] = $item['price'] * $validated['quantity'];
                break;
            }
        }
        
        session(['cart' => $cart]);

        return back();
    }
}
