import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '../LandingAdmin';
import { 
    Search, 
    CheckCircle, 
    XCircle, 
    Clock, 
    Eye,
    Filter,
    ChevronDown,
    Calendar,
    User,
    CreditCard,
    DollarSign
} from 'lucide-react';

export default function AdminPaymentVerification({ 
    orders = [
        {
            id: 1,
            order_number: 'ORD-20241015-001',
            customer_name: 'John Doe',
            customer_email: 'john@example.com',
            total: 250000,
            payment_method: 'qris',
            payment_status: 'paid',
            payment_proof: '/storage/payment-proofs/proof1.jpg',
            created_at: '2024-10-15 10:30:00',
            paid_at: '2024-10-15 11:00:00'
        },
        {
            id: 2,
            order_number: 'ORD-20241015-002',
            customer_name: 'Jane Smith',
            customer_email: 'jane@example.com',
            total: 175000,
            payment_method: 'bank_transfer',
            payment_status: 'paid',
            payment_proof: '/storage/payment-proofs/proof2.jpg',
            created_at: '2024-10-15 09:15:00',
            paid_at: '2024-10-15 10:45:00'
        },
        {
            id: 3,
            order_number: 'ORD-20241015-003',
            customer_name: 'Bob Johnson',
            customer_email: 'bob@example.com',
            total: 320000,
            payment_method: 'cash',
            payment_status: 'pending',
            payment_proof: null,
            created_at: '2024-10-15 08:00:00',
            paid_at: null
        }
    ]
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = 
            filterStatus === 'all' || 
            order.payment_status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const handleVerifyPayment = (orderId, status) => {
        setIsProcessing(true);
        router.post(`/admin/orders/${orderId}/verify-payment`, {
            status: status
        }, {
            onSuccess: () => {
                setIsProcessing(false);
                setIsModalOpen(false);
                setSelectedOrder(null);
            },
            onError: () => {
                setIsProcessing(false);
            }
        });
    };

    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const getStatusBadge = (status) => {
        const statuses = {
            pending: { 
                color: 'bg-yellow-100 text-yellow-800', 
                text: 'Menunggu', 
                icon: Clock 
            },
            paid: { 
                color: 'bg-blue-100 text-blue-800', 
                text: 'Perlu Verifikasi', 
                icon: Clock 
            },
            verified: { 
                color: 'bg-green-100 text-green-800', 
                text: 'Terverifikasi', 
                icon: CheckCircle 
            },
            rejected: { 
                color: 'bg-red-100 text-red-800', 
                text: 'Ditolak', 
                icon: XCircle 
            }
        };
        
        const status_info = statuses[status] || statuses.pending;
        const Icon = status_info.icon;
        
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${status_info.color}`}>
                <Icon className="w-3 h-3" />
                {status_info.text}
            </span>
        );
    };

    const getPaymentMethodLabel = (method) => {
        const methods = {
            qris: { text: 'QRIS', color: 'bg-purple-100 text-purple-700' },
            bank_transfer: { text: 'Transfer Bank', color: 'bg-blue-100 text-blue-700' },
            cash: { text: 'Tunai', color: 'bg-green-100 text-green-700' }
        };
        const methodInfo = methods[method] || { text: method, color: 'bg-gray-100 text-gray-700' };
        return (
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${methodInfo.color}`}>
                {methodInfo.text}
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const stats = {
        pending: orders.filter(o => o.payment_status === 'pending').length,
        paid: orders.filter(o => o.payment_status === 'paid').length,
        verified: orders.filter(o => o.payment_status === 'verified').length
    };

    return (
        <AdminLayout title="Verifikasi Pembayaran">
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifikasi Pembayaran</h1>
                <p className="text-gray-600">Kelola dan verifikasi pembayaran pesanan</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-yellow-600 text-sm font-medium">Menunggu Pembayaran</p>
                            <p className="text-2xl font-bold text-yellow-900 mt-1">{stats.pending}</p>
                        </div>
                        <Clock className="w-10 h-10 text-yellow-400" />
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-600 text-sm font-medium">Perlu Verifikasi</p>
                            <p className="text-2xl font-bold text-blue-900 mt-1">{stats.paid}</p>
                        </div>
                        <Clock className="w-10 h-10 text-blue-400" />
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-600 text-sm font-medium">Terverifikasi</p>
                            <p className="text-2xl font-bold text-green-900 mt-1">{stats.verified}</p>
                        </div>
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nomor pesanan atau nama..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        >
                            <option value="all">Semua Status</option>
                            <option value="pending">Menunggu</option>
                            <option value="paid">Perlu Verifikasi</option>
                            <option value="verified">Terverifikasi</option>
                            <option value="rejected">Ditolak</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Pesanan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Pelanggan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Metode
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        Tidak ada data pesanan
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">{order.order_number}</p>
                                                <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.customer_name}</p>
                                                <p className="text-sm text-gray-500">{order.customer_email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getPaymentMethodLabel(order.payment_method)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">
                                                Rp{Number(order.total).toLocaleString('id-ID')}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(order.payment_status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => openModal(order)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Detail & Verifikasi */}
            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Detail Pembayaran</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Order Info */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Informasi Pesanan</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">No. Pesanan:</span>
                                            <span className="font-semibold">{selectedOrder.order_number}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tanggal:</span>
                                            <span className="font-semibold">{formatDate(selectedOrder.created_at)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total:</span>
                                            <span className="font-semibold text-blue-600">
                                                Rp{Number(selectedOrder.total).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Metode:</span>
                                            {getPaymentMethodLabel(selectedOrder.payment_method)}
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Status:</span>
                                            {getStatusBadge(selectedOrder.payment_status)}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Informasi Pelanggan</h3>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <p className="text-gray-600">Nama:</p>
                                            <p className="font-semibold">{selectedOrder.customer_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Email:</p>
                                            <p className="font-semibold">{selectedOrder.customer_email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Proof */}
                            {selectedOrder.payment_proof && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Bukti Pembayaran</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <img
                                            src={selectedOrder.payment_proof}
                                            alt="Bukti Pembayaran"
                                            className="w-full max-h-96 object-contain rounded-lg"
                                        />
                                        <div className="mt-3 text-center">
                                            <a
                                                href={selectedOrder.payment_proof}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                            >
                                                Lihat ukuran penuh →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            {selectedOrder.payment_status === 'paid' && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleVerifyPayment(selectedOrder.id, 'verified')}
                                        disabled={isProcessing}
                                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                Verifikasi Pembayaran
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleVerifyPayment(selectedOrder.id, 'rejected')}
                                        disabled={isProcessing}
                                        className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        Tolak Pembayaran
                                    </button>
                                </div>
                            )}

                            {selectedOrder.payment_status === 'verified' && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <div>
                                        <p className="font-semibold text-green-900">Pembayaran Terverifikasi</p>
                                        <p className="text-sm text-green-700">
                                            Pembayaran telah diverifikasi pada {formatDate(selectedOrder.paid_at)}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {selectedOrder.payment_status === 'pending' && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
                                    <Clock className="w-6 h-6 text-yellow-600" />
                                    <div>
                                        <p className="font-semibold text-yellow-900">Menunggu Pembayaran</p>
                                        <p className="text-sm text-yellow-700">
                                            Pelanggan belum melakukan pembayaran atau upload bukti pembayaran
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
        </AdminLayout>
    );
}