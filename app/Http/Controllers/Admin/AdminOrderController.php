<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminOrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items')->latest()->paginate(20);
        
        return Inertia::render('Admin/Orders/Payments', [
            'orders' => $orders
        ]);
    }

    public function show(Order $order)
    {
        $order->load('items.product', 'items.productVariant');
        
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,paid,cancelled'
        ]);

        $order->update(['status' => $validated['status']]);

        return back()->with('success', 'Status pesanan berhasil diupdate');
    }

    /**
     * Halaman verifikasi pembayaran
     */
    public function payments()
    {
        $orders = Order::whereIn('payment_method', ['qris', 'bank_transfer', 'cash'])
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'customer_name' => $order->customer_name,
                    'customer_email' => $order->customer_email,
                    'total' => $order->total,
                    'payment_method' => $order->payment_method,
                    'payment_status' => $order->payment_status,
                    'payment_proof' => $order->payment_proof ? Storage::url($order->payment_proof) : null,
                    'created_at' => $order->created_at,
                    'paid_at' => $order->paid_at,
                ];
            })
            ->values()
            ->toArray();


        
        return Inertia::render('Admin/Orders/Payments', [
            'orders' => $orders
        ]);
    }

    /**
     * Verifikasi pembayaran
     */
    public function verifyPayment(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:verified,rejected'
        ]);

        $order->update([
            'payment_status' => $validated['status'],
            'paid_at' => $validated['status'] === 'verified' ? ($order->paid_at ?? now()) : null,
        ]);

        return back()->with('success', 'Status pembayaran berhasil diupdate');
    }
}