import { useState } from 'react';
import { router } from '@inertiajs/react';
import { 
    QrCode, 
    Building2, 
    Wallet, 
    Upload, 
    CheckCircle, 
    Clock,
    Copy,
    Download,
    AlertCircle
} from 'lucide-react';

export default function PaymentPage({ 
    order = {
        id: 1,
        order_number: 'ORD-20241015-001',
        total: 250000,
        payment_method: 'qris',
        payment_status: 'pending',
        payment_proof: null
    },
    qrisImage = '/storage/qris-dummy.png',
    bankAccount = {
        bank_name: 'Bank BCA',
        account_number: '1234567890',
        account_name: 'PT Toko Kita'
    }
}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('payment_proof', selectedFile);
        formData.append('_method', 'POST');

        router.post(`/orders/${order.id}/upload-payment`, formData, {
            onSuccess: () => {
                setIsUploading(false);
                setSelectedFile(null);
                setPreviewUrl(null);
            },
            onError: () => {
                setIsUploading(false);
            }
        });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStatusBadge = () => {
        const statuses = {
            pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Menunggu Pembayaran', icon: Clock },
            paid: { color: 'bg-blue-100 text-blue-800', text: 'Menunggu Verifikasi', icon: Clock },
            verified: { color: 'bg-green-100 text-green-800', text: 'Lunas', icon: CheckCircle }
        };
        
        const status = statuses[order.payment_status] || statuses.pending;
        const Icon = status.icon;
        
        return (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${status.color} font-semibold`}>
                <Icon className="w-5 h-5" />
                {status.text}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Pembayaran Pesanan
                            </h1>
                            <p className="text-gray-600">
                                No. Pesanan: <span className="font-semibold">{order.order_number}</span>
                            </p>
                        </div>
                        {getStatusBadge()}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Pembayaran</span>
                            <span className="text-3xl font-bold text-blue-600">
                                Rp{Number(order.total).toLocaleString('id-ID')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Metode Pembayaran */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Informasi Pembayaran
                        </h2>

                        {/* QRIS */}
                        {order.payment_method === 'qris' && (
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6">
                                    <QrCode className="w-5 h-5" />
                                    <span className="font-semibold">Pembayaran QRIS</span>
                                </div>
                                
                                <div className="bg-gray-50 p-6 rounded-xl mb-4">
                                    <img 
                                        src={qrisImage} 
                                        alt="QRIS Code" 
                                        className="w-64 h-64 mx-auto object-contain"
                                    />
                                </div>
                                
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>📱 Scan QR Code menggunakan aplikasi:</p>
                                    <p className="font-semibold">GoPay, OVO, Dana, ShopeePay, LinkAja, atau Mobile Banking</p>
                                </div>

                                <button
                                    onClick={() => window.open(qrisImage, '_blank')}
                                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    <Download className="w-4 h-4" />
                                    Download QR Code
                                </button>
                            </div>
                        )}

                        {/* Transfer Bank */}
                        {order.payment_method === 'bank_transfer' && (
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
                                    <Building2 className="w-5 h-5" />
                                    <span className="font-semibold">Transfer Bank</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Nama Bank</p>
                                        <p className="text-lg font-bold text-gray-900">{bankAccount.bank_name}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Nomor Rekening</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-bold text-gray-900">{bankAccount.account_number}</p>
                                            <button
                                                onClick={() => copyToClipboard(bankAccount.account_number)}
                                                className="p-2 hover:bg-gray-200 rounded-lg transition"
                                            >
                                                {copied ? (
                                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                                ) : (
                                                    <Copy className="w-5 h-5 text-gray-600" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-1">Atas Nama</p>
                                        <p className="text-lg font-bold text-gray-900">{bankAccount.account_name}</p>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                                    <div className="flex gap-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-yellow-800">
                                            <p className="font-semibold mb-1">Penting:</p>
                                            <p>Transfer sesuai nominal dan upload bukti transfer dalam 24 jam</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tunai */}
                        {order.payment_method === 'cash' && (
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6">
                                    <Wallet className="w-5 h-5" />
                                    <span className="font-semibold">Pembayaran Tunai</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700">
                                            Pembayaran akan dilakukan saat pengambilan pesanan.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <div className="flex gap-3">
                                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm text-blue-800">
                                                <p className="font-semibold mb-1">Catatan:</p>
                                                <p>Siapkan uang tunai pas sebesar Rp{Number(order.total).toLocaleString('id-ID')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Upload Bukti Pembayaran */}
                    {(order.payment_method === 'qris' || order.payment_method === 'bank_transfer') && (
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Upload Bukti Pembayaran
                            </h2>

                            {order.payment_status === 'pending' && !order.payment_proof && (
                                <div>
                                    {!previewUrl ? (
                                        <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                                            <Upload className="w-12 h-12 text-gray-400 mb-4" />
                                            <p className="text-gray-600 font-medium mb-2">
                                                Klik untuk upload bukti pembayaran
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                PNG, JPG atau JPEG (Max. 2MB)
                                            </p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                        </label>
                                    ) : (
                                        <div>
                                            <div className="relative">
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="w-full h-64 object-contain bg-gray-50 rounded-xl"
                                                />
                                                <button
                                                    onClick={() => {
                                                        setSelectedFile(null);
                                                        setPreviewUrl(null);
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            
                                            <button
                                                onClick={handleUpload}
                                                disabled={isUploading}
                                                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {isUploading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Mengupload...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="w-5 h-5" />
                                                        Kirim Bukti Pembayaran
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {order.payment_proof && (
                                <div>
                                    <div className="bg-gray-50 p-4 rounded-xl mb-4">
                                        <img
                                            src={order.payment_proof}
                                            alt="Bukti Pembayaran"
                                            className="w-full h-64 object-contain"
                                        />
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <div className="flex gap-3">
                                            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm text-blue-800">
                                                <p className="font-semibold">Bukti pembayaran telah diterima</p>
                                                <p className="mt-1">Tim kami sedang memverifikasi pembayaran Anda</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {order.payment_status === 'verified' && (
                                <div className="p-6 bg-green-50 rounded-xl text-center">
                                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-green-900 mb-2">
                                        Pembayaran Terverifikasi
                                    </h3>
                                    <p className="text-green-700 mb-4">
                                        Pembayaran Anda telah diverifikasi. Terima kasih!
                                    </p>
                                    <a
                                        href={`/orders/${order.id}/invoice`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
                                    >
                                        <Download className="w-5 h-5" />
                                        Lihat Invoice
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Info untuk pembayaran tunai */}
                    {order.payment_method === 'cash' && (
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Status Pesanan
                            </h2>
                            
                            {order.payment_status === 'verified' ? (
                                <div className="p-6 bg-green-50 rounded-xl text-center">
                                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-green-900 mb-2">
                                        Pembayaran Lunas
                                    </h3>
                                    <p className="text-green-700 mb-4">
                                        Pembayaran tunai telah diterima. Terima kasih!
                                    </p>
                                    <a
                                        href={`/orders/${order.id}/invoice`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
                                    >
                                        <Download className="w-5 h-5" />
                                        Lihat Invoice
                                    </a>
                                </div>
                            ) : (
                                <div className="p-6 bg-blue-50 rounded-xl text-center">
                                    <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                                        Menunggu Pengambilan
                                    </h3>
                                    <p className="text-blue-700">
                                        Pesanan Anda siap diambil. Lakukan pembayaran tunai saat pengambilan.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}