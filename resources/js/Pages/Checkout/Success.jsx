import { CheckCircle, Package, User, Mail, Phone, Calendar, FileText } from 'lucide-react';

export default function CheckoutSuccess({ order }) {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                {/* Success Message */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Pesanan Berhasil Dibuat! 🎉
                        </h1>
                        <p className="text-gray-600">
                            Terima kasih telah memesan. Kami akan segera memproses pesanan Anda.
                        </p>
                    </div>

                    {/* Order Number */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Nomor Pesanan</p>
                                <p className="text-2xl font-bold text-blue-900">
                                    {order.order_number}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600 mb-1">Status</p>
                                <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                    {order.status === 'pending' ? 'Menunggu' : order.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="border-t pt-6 mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            Informasi Pemesan
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-700">
                                <User className="w-5 h-5 text-gray-400" />
                                <span>{order.customer_name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <span>{order.customer_email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Phone className="w-5 h-5 text-gray-400" />
                                <span>{order.customer_phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <span>{new Date(order.created_at).toLocaleString('id-ID', {
                                    dateStyle: 'long',
                                    timeStyle: 'short'
                                })}</span>
                            </div>
                            {order.notes && (
                                <div className="flex items-start gap-3 text-gray-700 bg-gray-50 rounded-lg p-3">
                                    <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 mb-1">Catatan:</p>
                                        <p className="text-sm">{order.notes}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t pt-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-blue-600" />
                            Detail Pesanan
                        </h2>
                        <div className="space-y-4">
                            {order.items && order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">
                                            {item.product_name}
                                        </h3>
                                        {item.variant_name && (
                                            <p className="text-sm text-blue-600 mt-1">
                                                Paket: {item.variant_name}
                                            </p>
                                        )}
                                        {item.custom_options && Object.keys(item.custom_options).length > 0 && (
                                            <div className="mt-2 text-xs text-gray-600">
                                                {Object.entries(item.custom_options).map(([key, value]) => (
                                                    value && (
                                                        <p key={key}>• {key}: {value}</p>
                                                    )
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-600 mt-2">
                                            {item.quantity} x Rp{Number(item.price).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                    <div className="text-right ml-4">
                                        <p className="font-bold text-gray-900">
                                            Rp{Number(item.subtotal).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="mt-6 pt-6 border-t">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold text-gray-900">
                                    Rp{Number(order.subtotal).toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span className="text-gray-900">Total</span>
                                <span className="text-blue-600">
                                    Rp{Number(order.total).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="/"
                        className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold text-center hover:bg-blue-700 transition shadow-lg"
                    >
                        Kembali ke Beranda
                    </a>
                    <button
                        onClick={() => window.print()}
                        className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition"
                    >
                        Cetak Pesanan
                    </button>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-900 mb-2">
                        Langkah Selanjutnya
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>✓ Kami telah mengirim email konfirmasi ke {order.customer_email}</li>
                        <li>✓ Tim kami akan segera menghubungi Anda untuk konfirmasi pembayaran</li>
                        <li>✓ Simpan nomor pesanan Anda untuk referensi</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}