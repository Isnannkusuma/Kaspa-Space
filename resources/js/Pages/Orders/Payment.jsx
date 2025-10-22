import { useState, useEffect } from 'react';
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import PaymentModal from '../Checkout/PaymentModal';
import { router } from '@inertiajs/react';

export default function Payment({ order, paymentSettings }) {
    const [showModal, setShowModal] = useState(
        order.payment_method === 'qris' || order.payment_method === 'bank_transfer'
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                {/* Success Banner */}
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-green-900 mb-2">
                                Pesanan Berhasil Dibuat! 🎉
                            </h1>
                            <p className="text-green-700">
                                Pesanan Anda telah berhasil dibuat dan sedang menunggu pembayaran.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                        Detail Pesanan
                    </h2>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Nomor Pesanan</span>
                            <span className="font-bold text-gray-900">#{order.id}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Nama Pemesan</span>
                            <span className="font-semibold text-gray-900">{order.customer_name}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Email</span>
                            <span className="font-semibold text-gray-900">{order.customer_email}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Telepon</span>
                            <span className="font-semibold text-gray-900">{order.customer_phone}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Metode Pembayaran</span>
                            <span className="font-semibold text-gray-900">
                                {order.payment_method === 'qris' ? 'QRIS' : 
                                 order.payment_method === 'bank_transfer' ? 'Transfer Bank' : 'Tunai'}
                            </span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-600">Status Pembayaran</span>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                Menunggu Pembayaran
                            </span>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t pt-4">
                        <h3 className="font-bold text-gray-900 mb-3">Item Pesanan</h3>
                        <div className="space-y-3">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-100">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{item.product_name}</p>
                                        {item.variant_name && (
                                            <p className="text-sm text-blue-600">{item.variant_name}</p>
                                        )}
                                        <p className="text-sm text-gray-500">
                                            {item.quantity} x Rp{Number(item.price).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                    <p className="font-bold text-gray-900">
                                        Rp{Number(item.subtotal).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="border-t mt-4 pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-900">Total Pembayaran</span>
                            <span className="text-2xl font-bold text-blue-600">
                                Rp{Number(order.total).toLocaleString('id-ID')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Payment Action */}
                {(order.payment_method === 'qris' || order.payment_method === 'bank_transfer') && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg mb-4"
                    >
                        Lihat Detail Pembayaran
                    </button>
                )}

                {order.payment_method === 'cash' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                        <p className="text-blue-800 text-center">
                            💰 Silakan siapkan uang tunai sebesar <span className="font-bold">Rp{Number(order.total).toLocaleString('id-ID')}</span> saat pengambilan pesanan.
                        </p>
                    </div>
                )}

                {/* Back Button */}
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Kembali ke Beranda
                </a>
            </div>

            {/* Payment Modal */}
            {(order.payment_method === 'qris' || order.payment_method === 'bank_transfer') && (
                <PaymentModal 
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    paymentMethod={order.payment_method}
                    paymentSettings={paymentSettings}
                    total={order.total}
                />
            )}
        </div>
    );
}