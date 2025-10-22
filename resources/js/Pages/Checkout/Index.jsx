import { useState } from 'react';
import { router } from '@inertiajs/react';
import { ShoppingBag, User, Mail, Phone, FileText, ArrowLeft, CheckCircle, CreditCard, Building2, Wallet, QrCode } from 'lucide-react';
import PaymentModal from './PaymentModal';

export default function CheckoutIndex({ 
    cart = [], 
    subtotal = 0, 
    tax = 0, 
    total = 0,
    paymentSettings = {
        qris_image: '/storage/qris-default.png',
        bank_name: 'Bank BCA',
        account_number: '1234567890',
        account_name: 'PT Toko Kita'
    }
}) {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        notes: '',
        payment_method: 'qris',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const paymentMethods = [
        {
            id: 'qris',
            name: 'QRIS',
            icon: QrCode,
            description: 'Bayar dengan scan QR Code',
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 'bank_transfer',
            name: 'Transfer Bank',
            icon: Building2,
            description: 'Transfer ke rekening bank',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'cash',
            name: 'Tunai',
            icon: Wallet,
            description: 'Bayar tunai saat pengambilan',
            color: 'from-green-500 to-emerald-500'
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handlePaymentMethodChange = (methodId) => {
        setFormData(prev => ({
            ...prev,
            payment_method: methodId
        }));
        if (errors.payment_method) {
            setErrors(prev => ({
                ...prev,
                payment_method: null
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/checkout', formData, {
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
            onSuccess: () => {
                setIsSubmitting(false);
                // Tampilkan modal pembayaran setelah berhasil checkout
                if (formData.payment_method === 'qris' || formData.payment_method === 'bank_transfer') {
                    setShowPaymentModal(true);
                }
            }
        });
    };

    const PaymentModal = () => {
        if (!showPaymentModal) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                        <div className="flex items-center gap-3">
                            {formData.payment_method === 'qris' ? (
                                <>
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                        <QrCode className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Pembayaran QRIS</h2>
                                        <p className="text-sm text-gray-600">Scan QR Code di bawah ini</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Transfer Bank</h2>
                                        <p className="text-sm text-gray-600">Detail rekening tujuan</p>
                                    </div>
                                </>
                            )}
                        </div>
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {formData.payment_method === 'qris' ? (
                            <>
                                {/* QR Code Display */}
                                <div className="mb-6">
                                    <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                                        {paymentSettings.qris_image ? (
                                            <img
                                                src={paymentSettings.qris_image}
                                                alt="QRIS Code"
                                                className="w-full max-w-xs mx-auto object-contain"
                                            />
                                        ) : (
                                            <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                                                <div className="text-center">
                                                    <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                                    <p className="text-gray-500 text-sm">QR Code tidak tersedia</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-purple-900 mb-2">Cara Pembayaran:</h3>
                                    <ol className="list-decimal list-inside space-y-1 text-sm text-purple-800">
                                        <li>Buka aplikasi e-wallet atau mobile banking</li>
                                        <li>Pilih menu Scan QR atau QRIS</li>
                                        <li>Scan QR Code di atas</li>
                                        <li>Masukkan nominal: <span className="font-bold">Rp{Number(total).toLocaleString('id-ID')}</span></li>
                                        <li>Konfirmasi pembayaran</li>
                                    </ol>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Bank Account Details */}
                                <div className="space-y-4 mb-6">
                                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                                        <p className="text-xs text-blue-600 font-semibold mb-1">Nama Bank</p>
                                        <p className="text-lg font-bold text-gray-900">{paymentSettings.bank_name}</p>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                                        <p className="text-xs text-blue-600 font-semibold mb-1">Nomor Rekening</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-bold text-gray-900 font-mono">
                                                {paymentSettings.account_number}
                                            </p>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(paymentSettings.account_number);
                                                    alert('Nomor rekening berhasil disalin!');
                                                }}
                                                className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                            >
                                                Salin
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                                        <p className="text-xs text-blue-600 font-semibold mb-1">Atas Nama</p>
                                        <p className="text-lg font-bold text-gray-900">{paymentSettings.account_name}</p>
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                                        <p className="text-xs text-yellow-700 font-semibold mb-1">Jumlah Transfer</p>
                                        <p className="text-2xl font-bold text-yellow-900">
                                            Rp{Number(total).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-blue-900 mb-2">Cara Pembayaran:</h3>
                                    <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                                        <li>Transfer ke rekening bank di atas</li>
                                        <li>Pastikan nominal sesuai: <span className="font-bold">Rp{Number(total).toLocaleString('id-ID')}</span></li>
                                        <li>Simpan bukti transfer</li>
                                        <li>Konfirmasi pembayaran maksimal 24 jam</li>
                                    </ol>
                                </div>
                            </>
                        )}

                        {/* Total Payment */}
                        <div className="bg-gray-100 rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-semibold">Total Pembayaran</span>
                                <span className="text-2xl font-bold text-blue-600">
                                    Rp{Number(total).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                            <p className="text-xs text-red-700">
                                ⚠️ Harap transfer sesuai nominal yang tertera untuk mempermudah verifikasi pembayaran
                            </p>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                        >
                            Saya Sudah Membayar
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <a
                        href="/cart"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Kembali ke Keranjang
                    </a>
                    <h1 className="text-3xl font-bold text-gray-900">
                        💳 Checkout
                    </h1>
                    <p className="text-gray-600 mt-1">Lengkapi informasi untuk menyelesaikan pesanan</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Informasi Pemesan */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-600" />
                                Informasi Pemesan
                            </h2>

                            <div className="space-y-5">
                                {/* Nama */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="customer_name"
                                            value={formData.customer_name}
                                            onChange={handleChange}
                                            className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                                                errors.customer_name ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>
                                    {errors.customer_name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="customer_email"
                                            value={formData.customer_email}
                                            onChange={handleChange}
                                            className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                                                errors.customer_email ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    {errors.customer_email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>
                                    )}
                                </div>

                                {/* Telepon */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nomor Telepon <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="customer_phone"
                                            value={formData.customer_phone}
                                            onChange={handleChange}
                                            className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                                                errors.customer_phone ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                            placeholder="08123456789"
                                        />
                                    </div>
                                    {errors.customer_phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>
                                    )}
                                </div>

                                {/* Catatan */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Catatan (Opsional)
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                                            placeholder="Tambahkan catatan khusus untuk pesanan Anda..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metode Pembayaran */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-blue-600" />
                                Metode Pembayaran
                            </h2>

                            <div className="grid md:grid-cols-3 gap-4">
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon;
                                    const isSelected = formData.payment_method === method.id;
                                    
                                    return (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => handlePaymentMethodChange(method.id)}
                                            className={`relative p-4 rounded-xl border-2 transition-all ${
                                                isSelected
                                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                            }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-2 right-2">
                                                    <CheckCircle className="w-5 h-5 text-blue-600" />
                                                </div>
                                            )}
                                            
                                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center mb-3`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            
                                            <h3 className="font-bold text-gray-900 text-left mb-1">
                                                {method.name}
                                            </h3>
                                            <p className="text-xs text-gray-600 text-left">
                                                {method.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>

                            {errors.payment_method && (
                                <p className="text-red-500 text-sm mt-3">{errors.payment_method}</p>
                            )}

                            {/* Info tambahan berdasarkan metode pembayaran */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                {formData.payment_method === 'qris' && (
                                    <p className="text-sm text-gray-700">
                                        💡 Setelah checkout, Anda akan menerima kode QR untuk pembayaran melalui aplikasi e-wallet atau mobile banking Anda.
                                    </p>
                                )}
                                {formData.payment_method === 'bank_transfer' && (
                                    <p className="text-sm text-gray-700">
                                        💡 Setelah checkout, Anda akan menerima detail rekening bank untuk transfer. Konfirmasi pembayaran dalam 24 jam.
                                    </p>
                                )}
                                {formData.payment_method === 'cash' && (
                                    <p className="text-sm text-gray-700">
                                        💡 Siapkan uang tunai sesuai total pembayaran saat pengambilan pesanan.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Selesaikan Pesanan
                                </>
                            )}
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-blue-600" />
                                Ringkasan Pesanan
                            </h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-100">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 text-sm">
                                                {item.product_name}
                                            </h3>
                                            {item.variant_name && (
                                                <p className="text-xs text-blue-600 mt-1">
                                                    {item.variant_name}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500 mt-1">
                                                {item.quantity} x Rp{Number(item.price).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">
                                                Rp{Number(item.subtotal).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">
                                        Rp{Number(subtotal).toLocaleString('id-ID')}
                                    </span>
                                </div>
                                {tax > 0 && (
                                    <div className="flex justify-between text-gray-600">
                                        <span>Pajak</span>
                                        <span className="font-semibold">
                                            Rp{Number(tax).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                )}
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span className="text-blue-600">
                                            Rp{Number(total).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-4">
                                <p className="text-xs text-gray-600 text-center">
                                    🔒 Pembayaran aman dan terenkripsi
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal />
        </div>
    );
}