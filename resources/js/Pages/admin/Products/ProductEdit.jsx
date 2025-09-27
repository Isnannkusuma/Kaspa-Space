import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../LandingAdmin';
import {
  PlusIcon,
  XMarkIcon,
  PhotoIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const ProductsEdit = ({ product, categories, allProducts }) => {
  const { data, setData, put, processing, errors } = useForm({
    title: product.title || '',
    subtitle: product.subtitle || '',
    description: product.description || '',
    promo_label: product.promo_label || '',
    base_price: product.base_price || '',
    category_id: product.category_id || '',
    is_active: product.is_active || true,
    is_featured: product.is_featured || false,
    existing_images: product.images || [],
    images: [],
    custom_options: product.custom_options || [],
    variants: product.variants || [],
    recommendations: product.recommended_products?.map(p => p.id) || [],
  });

  const [imagePreview, setImagePreview] = useState(product.images || []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setData('images', [...data.images, ...files]);
    
    // Create preview URLs for new images
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExistingImage = (index) => {
    const newExistingImages = data.existing_images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setData('existing_images', newExistingImages);
    setImagePreview(newPreviews);
  };

  const addCustomOption = () => {
    setData('custom_options', [...data.custom_options, {
      question: '',
      type: 'checkbox',
      options: [],
      required: false
    }]);
  };

  const updateCustomOption = (index, field, value) => {
    const newOptions = [...data.custom_options];
    newOptions[index][field] = value;
    setData('custom_options', newOptions);
  };

  const removeCustomOption = (index) => {
    const newOptions = data.custom_options.filter((_, i) => i !== index);
    setData('custom_options', newOptions);
  };

  const addVariant = () => {
    setData('variants', [...data.variants, {
      name: '',
      price: '',
      compare_price: '',
      stock_quantity: 0,
      manage_stock: false,
      attributes: {},
      sku: ''
    }]);
  };

  const updateVariant = (index, field, value) => {
    const newVariants = [...data.variants];
    newVariants[index][field] = value;
    setData('variants', newVariants);
  };

  const removeVariant = (index) => {
    const newVariants = data.variants.filter((_, i) => i !== index);
    setData('variants', newVariants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.products.update', product.id));
  };

  return (
    <AdminLayout title={`Edit Produk: ${product.title}`}>
      <Head title={`Edit Produk: ${product.title}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Edit Produk</h1>
              <p className="text-sm text-gray-500 mt-1">{product.title}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={data.is_active ? 'active' : 'draft'}
              onChange={(e) => setData('is_active', e.target.value === 'active')}
              className="block text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="active">Ditampilkan</option>
              <option value="draft">Disembunyikan</option>
            </select>
          </div>
        </div>

        {/* Product Images */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Produk</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
            {imagePreview.map((preview, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={typeof preview === 'string' && preview.startsWith('data:') 
                    ? preview 
                    : `/storage/${preview}`
                  }
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            {/* Add Image Button */}
            {imagePreview.length < 6 && (
              <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                <PhotoIcon className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Tambahkan Media</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subjudul</label>
            <input
              type="text"
              value={data.subtitle}
              onChange={(e) => setData('subtitle', e.target.value)}
              className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Promo Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label promosi</label>
            <input
              type="text"
              value={data.promo_label}
              onChange={(e) => setData('promo_label', e.target.value)}
              className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              rows={8}
              className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Base Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga Dasar <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
              <input
                type="number"
                value={data.base_price}
                onChange={(e) => setData('base_price', e.target.value)}
                className="block w-full pl-8 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {errors.base_price && <p className="mt-1 text-sm text-red-600">{errors.base_price}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              value={data.category_id}
              onChange={(e) => setData('category_id', e.target.value)}
              className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
          </div>
        </div>

        {/* Product Variants */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Variasi produk</h3>
            <button
              type="button"
              onClick={addVariant}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Tambahkan variasi produk
            </button>
          </div>

          <div className="space-y-4">
            {data.variants.map((variant, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Varian {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nama Varian</label>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) => updateVariant(index, 'name', e.target.value)}
                      className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Harga</label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateVariant(index, 'price', e.target.value)}
                      className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Harga Asal</label>
                    <input
                      type="number"
                      value={variant.compare_price}
                      onChange={(e) => updateVariant(index, 'compare_price', e.target.value)}
                      className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">SKU</label>
                    <input
                      type="text"
                      value={variant.sku || ''}
                      onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                      className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Options */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Info kustom</h3>
          
          <div className="space-y-4">
            {data.custom_options.map((option, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Pertanyaan {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeCustomOption(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Pertanyaan</label>
                    <input
                      type="text"
                      value={option.question}
                      onChange={(e) => updateCustomOption(index, 'question', e.target.value)}
                      className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={option.required}
                      onChange={(e) => updateCustomOption(index, 'required', e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">Wajib</label>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addCustomOption}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mx-auto mb-1" />
              Tambah Pertanyaan Kustom
            </button>
          </div>
        </div>

        {/* Product Recommendations */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Produk terkait</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={data.recommendations.length > 0}
                onChange={(e) => {
                  if (!e.target.checked) {
                    setData('recommendations', []);
                  }
                }}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">Tampilkan produk terkait</label>
            </div>

            {data.recommendations.length > 0 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pilih produk rekomendasi</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {allProducts.map((prod) => (
                      <div key={prod.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={data.recommendations.includes(prod.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setData('recommendations', [...data.recommendations, prod.id]);
                            } else {
                              setData('recommendations', data.recommendations.filter(id => id !== prod.id));
                            }
                          }}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {prod.title} ({prod.category.name})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-between pt-6">
          <button
            type="button"
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
                // Handle delete - you may want to use router.delete here
                window.location.href = route('admin.products.destroy', product.id);
              }
            }}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            Hapus Produk
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={processing}
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              {processing ? 'Menyimpan...' : 'Update Produk'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductsEdit;