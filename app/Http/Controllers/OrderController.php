<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PaymentSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    /**
     * Halaman pembayaran
     */
    public function showPayment(Order $order)
    {
        $order->load('items');
        
        // Ambil payment settings
        $paymentSettings = PaymentSetting::first();
        
        return Inertia::render('Orders/Payment', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->customer_name,
                'customer_email' => $order->customer_email,
                'customer_phone' => $order->customer_phone,
                'total' => $order->total,
                'payment_method' => $order->payment_method,
                'payment_status' => $order->payment_status,
                'payment_proof' => $order->payment_proof ? Storage::url($order->payment_proof) : null,
                'created_at' => $order->created_at,
                'paid_at' => $order->paid_at,
            ],
            'qrisImage' => $paymentSettings && $paymentSettings->qris_image 
                ? Storage::url($paymentSettings->qris_image) 
                : null,
            'bankAccount' => [
                'bank_name' => $paymentSettings->bank_name ?? 'Bank BCA',
                'account_number' => $paymentSettings->account_number ?? '1234567890',
                'account_name' => $paymentSettings->account_name ?? 'PT Toko Kita',
            ]
        ]);
    }

    /**
     * Upload bukti pembayaran
     */
    public function uploadPayment(Request $request, Order $order)
    {
        $request->validate([
            'payment_proof' => 'required|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        try {
            // Hapus bukti pembayaran lama jika ada
            if ($order->payment_proof) {
                Storage::disk('public')->delete($order->payment_proof);
            }

            // Upload bukti pembayaran baru
            $path = $request->file('payment_proof')->store('payment-proofs', 'public');
            
            $order->update([
                'payment_proof' => $path,
                'payment_status' => 'paid',
                'paid_at' => now(),
            ]);

            return back()->with('success', 'Bukti pembayaran berhasil diupload');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal mengupload bukti pembayaran: ' . $e->getMessage()]);
        }
    }

    /**
     * Halaman invoice
     */
    public function invoice(Order $order)
    {
        $order->load('items');
        
        // Pastikan pembayaran sudah terverifikasi
        if ($order->payment_status !== 'verified') {
            return redirect()->route('orders.payment', $order)
                ->with('error', 'Pembayaran belum terverifikasi');
        }
        
        return Inertia::render('Orders/Invoice', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->customer_name,
                'customer_email' => $order->customer_email,
                'customer_phone' => $order->customer_phone,
                'customer_address' => $order->customer_address ?? null,
                'created_at' => $order->created_at,
                'paid_at' => $order->paid_at,
                'payment_method' => $order->payment_method,
                'subtotal' => $order->subtotal,
                'tax' => $order->tax ?? 0,
                'total' => $order->total,
                'items' => $order->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_name' => $item->product_name,
                        'variant_name' => $item->variant_name,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'subtotal' => $item->subtotal,
                    ];
                }),
            ],
            'storeName' => config('app.name', 'Toko Kita'),
            'storeAddress' => 'Jl. Bisnis No. 456, Jakarta',
            'storePhone' => '(021) 1234-5678',
        ]);
    }
}