import React from 'react';
import { Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartIndex({ cart = [] }) {
    const handleUpdateQuantity = (itemId, newQuantity) => {
        router.post('/cart/update-quantity', {
            id: itemId,
            quantity: Math.max(1, newQuantity),
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleRemove = (itemId) => {
        if (confirm('Hapus produk dari keranjang?')) {
            router.post('/cart/remove', { 
                id: itemId 
            }, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        // Redirect ke halaman checkout
        router.get('/checkout');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/workspace-section"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali Belanja
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <ShoppingBag className="w-8 h-8 text-blue-600" />
                        Keranjang Belanja
                    </h1>
                    <p className="text-slate-600 mt-2">
                        {cart.length} item dalam keranjang
                    </p>
                </div>

                {cart.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag size={40} className="text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">
                                Keranjang Kosong
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Belum ada produk di keranjang Anda
                            </p>
                            <Link
                                href="/workspace-section"
                                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
                            >
                                Mulai Belanja
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex gap-4">
                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-800 text-lg mb-2">
                                                {item.product_name}
                                            </h3>
                                            {item.variant_name && (
                                                <p className="text-sm text-blue-600 mb-2">
                                                    Paket: {item.variant_name}
                                                </p>
                                            )}
                                            
                                            {/* Custom Options */}
                                            {item.custom_options && Object.keys(item.custom_options).length > 0 && (
                                                <div className="text-sm text-slate-600 mt-2 space-y-1">
                                                    {Object.entries(item.custom_options).map(([key, value]) => (
                                                        value && (
                                                            <div key={key}>
                                                                <span className="font-medium">{key}:</span> {value}
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            )}

                                            <div className="mt-4">
                                                <p className="text-2xl font-bold text-blue-900">
                                                    Rp{Number(item.price).toLocaleString('id-ID')}
                                                </p>
                                                <p className="text-sm text-slate-500">per item</p>
                                            </div>
                                        </div>

                                        {/* Quantity & Actions */}
                                        <div className="flex flex-col items-end justify-between">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-semibold">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Subtotal */}
                                            <div className="text-right">
                                                <p className="text-sm text-slate-600 mb-1">Subtotal</p>
                                                <p className="text-xl font-bold text-slate-800">
                                                    Rp{Number(item.subtotal).toLocaleString('id-ID')}
                                                </p>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                                                title="Hapus item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                                <h2 className="text-xl font-bold text-slate-800 mb-4">
                                    Ringkasan Pesanan
                                </h2>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Subtotal</span>
                                        <span>Rp{calculateTotal().toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between font-bold text-lg text-slate-800">
                                        <span>Total</span>
                                        <span className="text-blue-900">
                                            Rp{calculateTotal().toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                {/* Button Checkout - DIPERBAIKI */}
                                <button 
                                    onClick={handleCheckout}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                >
                                    Lanjutkan ke Pembayaran
                                </button>

                                <Link
                                    href="/workspace-section"
                                    className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Lanjut Belanja
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}