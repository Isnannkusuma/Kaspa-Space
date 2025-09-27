import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../LandingAdmin';
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';

const ProductsIndex = ({ products, categories, filters }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get('search');
    
    router.get(route('admin.products.index'), {
      ...filters,
      search: search,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const handleFilterChange = (key, value) => {
    router.get(route('admin.products.index'), {
      ...filters,
      [key]: value,
      page: 1, // Reset to first page when filtering
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    
    if (confirm(`Apakah Anda yakin ingin menghapus ${selectedProducts.length} produk?`)) {
      router.delete(route('admin.products.bulk-delete'), {
        data: { product_ids: selectedProducts },
        onSuccess: () => {
          setSelectedProducts([]);
        }
      });
    }
  };

  const updateProductStatus = (productId, isActive) => {
    router.patch(route('admin.products.update-status', productId), {
      is_active: isActive
    }, {
      preserveState: true,
      only: ['products']
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AdminLayout title="Produk">
      <Head title="Produk" />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Produk</h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola produk dan layanan yang tersedia di toko Anda
            </p>
          </div>
          
          <Link
            href={route('admin.products.create')}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Tambah Produk
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Search */}
                <form onSubmit={handleSearch} className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="search"
                    defaultValue={filters.search || ''}
                    placeholder="Cari produk..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </form>

                {/* Category Filter */}
                <select
                  value={filters.category_id || ''}
                  onChange={(e) => handleFilterChange('category_id', e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={filters.status !== undefined ? filters.status : ''}
                  onChange={(e) => handleFilterChange('status', e.target.value === '' ? null : e.target.value === 'true')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Semua Status</option>
                  <option value="true">Aktif</option>
                  <option value="false">Tidak Aktif</option>
                </select>
              </div>

              {/* Bulk Actions */}
              {selectedProducts.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {selectedProducts.length} produk dipilih
                  </span>
                  <button
                    onClick={handleBulkDelete}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Products Table/Grid */}
          <div className="overflow-hidden">
            {products.data.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">Tidak ada produk</div>
                <Link
                  href={route('admin.products.create')}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Tambah Produk Pertama
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {products.data.map((product) => (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    {/* Product Image */}
                    <div className="relative aspect-video bg-gray-100">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={`/storage/${product.images[0]}`}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-sm">No Image</span>
                        </div>
                      )}
                      
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => updateProductStatus(product.id, !product.is_active)}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            product.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.is_active ? 'Aktif' : 'Tidak Aktif'}
                        </button>
                      </div>

                      {/* Promo Label */}
                      {product.promo_label && (
                        <div className="absolute bottom-2 left-2">
                          <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-medium rounded">
                            {product.promo_label}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1">
                          {product.title}
                        </h3>
                        
                        {/* Action Menu */}
                        <div className="relative ml-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <EllipsisVerticalIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      {product.subtitle && (
                        <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                          {product.subtitle}
                        </p>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatPrice(product.min_price)}
                            {product.max_price !== product.min_price && (
                              <span className="text-gray-500"> - {formatPrice(product.max_price)}</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.category.name}
                          </p>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          {product.variants_count || 0} varian
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={route('admin.products.show', product.id)}
                            className="text-gray-400 hover:text-indigo-600 transition-colors"
                            title="Lihat Detail"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Link>
                          <Link
                            href={route('admin.products.edit', product.id)}
                            className="text-gray-400 hover:text-indigo-600 transition-colors"
                            title="Edit"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => {
                              if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
                                router.delete(route('admin.products.destroy', product.id));
                              }
                            }}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            title="Hapus"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="text-xs text-gray-400">
                          {new Date(product.updated_at).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {products.links && products.links.length > 3 && (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Menampilkan {products.from || 0} - {products.to || 0} dari {products.total} produk
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {products.links.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => link.url && router.visit(link.url)}
                        disabled={!link.url}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          link.active 
                            ? 'bg-indigo-600 text-white' 
                            : link.url
                              ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                              : 'text-gray-300 cursor-not-allowed'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{products.total}</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Produk</p>
                <p className="text-lg font-semibold text-gray-900">{products.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {products.data.filter(p => p.is_active).length}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Produk Aktif</p>
                <p className="text-lg font-semibold text-gray-900">
                  {products.data.filter(p => p.is_active).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {products.data.filter(p => !p.is_active).length}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Produk Draft</p>
                <p className="text-lg font-semibold text-gray-900">
                  {products.data.filter(p => !p.is_active).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{categories.length}</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Kategori</p>
                <p className="text-lg font-semibold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductsIndex;