import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../LandingAdmin';
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  StarIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const ProductsShow = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleStatus = () => {
    router.patch(route('admin.products.update-status', product.id), {
      is_active: !product.is_active
    });
  };

  const toggleFeatured = () => {
    router.patch(route('admin.products.toggle-featured', product.id));
  };

  return (
    <AdminLayout title={`Detail Produk: ${product.title}`}>
      <Head title={`Detail Produk: ${product.title}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Link
              href={route('admin.products.index')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Detail Produk</h1>
              <p className="text-sm text-gray-500 mt-1">{product.category.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleStatus}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                product.is_active 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              {product.is_active ? (
                <>
                  <EyeIcon className="h-4 w-4 mr-1" />
                  Aktif
                </>
              ) : (
                <>
                  <EyeSlashIcon className="h-4 w-4 mr-1" />
                  Draft
                </>
              )}
            </button>
            
            <Link
              href={route('admin.products.edit', product.id)}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Edit Produk
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Images */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Gambar Produk</h3>
              
              {product.images && product.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={`/storage/${image}`}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <PhotoIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>Belum ada gambar</p>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h2>
                  {product.subtitle && (
                    <p className="text-lg text-gray-600 mb-4">{product.subtitle}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-2xl font-bold text-indigo-600">
                      {formatPrice(product.base_price)}
                    </span>
                    
                    {product.promo_label && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        <TagIcon className="h-3 w-3 mr-1" />
                        {product.promo_label}
                      </span>
                    )}
                    
                    {product.is_featured && (
                      <button
                        onClick={toggleFeatured}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors"
                      >
                        <StarIcon className="h-3 w-3 mr-1" />
                        Featured
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {product.description && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Deskripsi</h4>
                  <div className="prose prose-sm max-w-none text-gray-600">
                    {product.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-2">{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Variasi Produk ({product.variants.length})
                </h3>
                
                <div className="space-y-4">
                  {product.variants.map((variant, index) => (
                    <div key={variant.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{variant.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-gray-900">
                            {formatPrice(variant.price)}
                          </span>
                          {variant.compare_price && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(variant.compare_price)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">SKU:</span>
                          <span className="ml-1 font-medium">{variant.sku}</span>
                        </div>
                        {variant.manage_stock && (
                          <div>
                            <span className="text-gray-500">Stok:</span>
                            <span className="ml-1 font-medium">{variant.stock_quantity}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <span className={`ml-1 font-medium ${variant.is_active ? 'text-green-600' : 'text-red-600'}`}>
                            {variant.is_active ? 'Aktif' : 'Tidak Aktif'}
                          </span>
                        </div>
                      </div>
                      
                      {variant.attributes && Object.keys(variant.attributes).length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(variant.attributes).map(([key, value]) => (
                              <span key={key} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Options */}
            {product.custom_options && product.custom_options.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Opsi Kustom ({product.custom_options.length})
                </h3>
                
                <div className="space-y-4">
                  {product.custom_options.map((option, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{option.question}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            option.required 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {option.required ? 'Wajib' : 'Opsional'}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {option.type}
                          </span>
                        </div>
                      </div>
                      
                      {option.options && option.options.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-2">Pilihan:</p>
                          <div className="flex flex-wrap gap-2">
                            {option.options.map((opt, optIndex) => (
                              <span key={optIndex} className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-gray-50 text-gray-700">
                                {opt}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Statistik</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={`text-sm font-medium ${product.is_active ? 'text-green-600' : 'text-red-600'}`}>
                    {product.is_active ? 'Aktif' : 'Draft'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Kategori</span>
                  <span className="text-sm font-medium">{product.category.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Varian</span>
                  <span className="text-sm font-medium">{product.variants.length}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Dibuat</span>
                  <span className="text-sm font-medium">
                    {new Date(product.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Diupdate</span>
                  <span className="text-sm font-medium">
                    {new Date(product.updated_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            {/* Recommended Products */}
            {product.recommended_products && product.recommended_products.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Produk Terkait ({product.recommended_products.length})
                </h3>
                
                <div className="space-y-3">
                  {product.recommended_products.map((recommendedProduct) => (
                    <div key={recommendedProduct.id} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
                        {recommendedProduct.images && recommendedProduct.images[0] ? (
                          <img
                            src={`/storage/${recommendedProduct.images[0]}`}
                            alt={recommendedProduct.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {recommendedProduct.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {recommendedProduct.category.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Aksi Cepat</h3>
              
              <div className="space-y-3">
                <Link
                  href={route('admin.products.edit', product.id)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Produk
                </Link>
                
                <Link
                  href={route('admin.products.duplicate', product.id)}
                  method="post"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Duplikasi Produk
                </Link>
                
                <button
                  onClick={() => {
                    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
                      router.delete(route('admin.products.destroy', product.id));
                    }
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Hapus Produk
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductsShow;