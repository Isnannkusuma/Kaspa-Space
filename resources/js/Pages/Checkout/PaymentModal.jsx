import { QrCode, Building2, X } from 'lucide-react';

export default function PaymentModal({ 
    isOpen, 
    onClose, 
    paymentMethod, 
    paymentSettings, 
    total 
}) {
    if (!isOpen) return null;

    const handleCopyAccountNumber = () => {
        navigator.clipboard.writeText(paymentSettings.account_number);
        alert('Nomor rekening berhasil disalin!');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        {paymentMethod === 'qris' ? (
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
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {paymentMethod === 'qris' ? (
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
                                            onClick={handleCopyAccountNumber}
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
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                    >
                        Saya Sudah Membayar
                    </button>
                </div>
            </div>
        </div>
    );
}