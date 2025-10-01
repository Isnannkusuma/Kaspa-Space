import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../LandingAdmin';
import {
  PlusIcon,
  XMarkIcon,
  PhotoIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const ProductCreate = ({ categories, allProducts }) => {
  const { data, setData, post, processing, errors, progress } = useForm({
    title: '',
    subtitle: '',
    description: '',
    promo_label: '',
    base_price: '',
    category_id: '',
    is_active: true,
    is_featured: false,
    sort_order: 0,
    meta_description: '',
    meta_keywords: '',
    images: [],
    custom_options: [],
    variants: [],
    recommendations: [],
  });

  const [imagePreview, setImagePreview] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Add to existing images
    setData('images', [...data.images, ...files]);
    
    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImages = data.images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setData('images', newImages);
    setImagePreview(newPreviews);
  };

  const addCustomOption = () => {
    setData('custom_options', [...data.custom_options, {
      question: '',
      type: 'text',
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
      sku: '',
      attributes: {}
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
    
    // Create FormData for file uploads
    const formData = new FormData();
    
    // Add basic fields
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle || '');
    formData.append('description', data.description || '');
    formData.append('promo_label', data.promo_label || '');
    formData.append('base_price', data.base_price);
    formData.append('category_id', data.category_id);
    formData.append('is_active', data.is_active ? '1' : '0');
    formData.append('is_featured', data.is_featured ? '1' : '0');
    formData.append('sort_order', data.sort_order || '0');
    formData.append('meta_description', data.meta_description || '');
    formData.append('meta_keywords', data.meta_keywords || '');
    
    // Add images
    data.images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images[${index}]`, image);
      }
    });
    
    // Add custom options
    data.custom_options.forEach((option, index) => {
      formData.append(`custom_options[${index}][question]`, option.question);
      formData.append(`custom_options[${index}][type]`, option.type);
      formData.append(`custom_options[${index}][required]`, option.required ? '1' : '0');
      if (option.options && option.options.length > 0) {
        option.options.forEach((opt, optIndex) => {
          formData.append(`custom_options[${index}][options][${optIndex}]`, opt);
        });
      }
    });
    
    // Add variants
    data.variants.forEach((variant, index) => {
      formData.append(`variants[${index}][name]`, variant.name);
      formData.append(`variants[${index}][price]`, variant.price);
      formData.append(`variants[${index}][compare_price]`, variant.compare_price || '');
      formData.append(`variants[${index}][stock_quantity]`, variant.stock_quantity || '0');
      formData.append(`variants[${index}][manage_stock]`, variant.manage_stock ? '1' : '0');
      formData.append(`variants[${index}][sku]`, variant.sku || '');
    });
    
    // Add recommendations
    data.recommendations.forEach((rec, index) => {
      formData.append(`recommendations[${index}]`, rec);
    });

    console.log('Submitting form data:', data);
    
    // Try different route names based on your setup
    const routeName = route().has('admin.products.store') ? 'admin.products.store' : 'products.store';
    
    post(route(routeName), {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        console.log('Product created successfully');
      },
      onError: (errors) => {
        console.error('Validation errors:', errors);
      }
    });
  };

  return (
    <AdminLayout title="Tambah Produk">
      <Head title="Tambah Produk" />
      
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
            <h1 className="text-2xl font-semibold text-gray-900">Tambah Produk</h1>
          </div>
        </div>

        {/* Show validation errors */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <h3 className="text-sm font-medium text-red-800 mb-2">Terjadi kesalahan:</h3>
            <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
              {Object.keys(errors).map(key => (
                <li key={key}>{errors[key]}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Gambar Produk</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
              {imagePreview.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
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
                  <span className="mt-2 text-sm text-gray-500">Tambah Gambar</span>
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
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Nama produk"
                className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
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
                placeholder="Subjudul produk"
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
                placeholder="NEW, SALE, dll"
                className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Deskripsi produk"
                rows={6}
                className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Base Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Dasar <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={data.base_price}
                onChange={(e) => setData('base_price', e.target.value)}
                placeholder="100000"
                min="0"
                step="0.01"
                className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
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
                required
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

            {/* Status toggles */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.is_active}
                  onChange={(e) => setData('is_active', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Aktif</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.is_featured}
                  onChange={(e) => setData('is_featured', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Unggulan</label>
              </div>
            </div>
          </div>

          {/* Product Variants */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Variasi Produk</h3>
              <button
                type="button"
                onClick={addVariant}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Tambah Variasi
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
                        placeholder="Contoh: Ukuran L"
                        className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Harga</label>
                      <input
                        type="number"
                        value={variant.price}
                        onChange={(e) => updateVariant(index, 'price', e.target.value)}
                        placeholder="100000"
                        min="0"
                        step="0.01"
                        className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Harga Asal</label>
                      <input
                        type="number"
                        value={variant.compare_price}
                        onChange={(e) => updateVariant(index, 'compare_price', e.target.value)}
                        placeholder="120000"
                        min="0"
                        step="0.01"
                        className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">SKU</label>
                      <input
                        type="text"
                        value={variant.sku || ''}
                        onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                        placeholder="SKU123"
                        className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Options */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Opsi Kustom</h3>
              <button
                type="button"
                onClick={addCustomOption}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Tambah Opsi
              </button>
            </div>

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
                        placeholder="Pertanyaan untuk customer"
                        className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Tipe Input</label>
                      <select
                        value={option.type}
                        onChange={(e) => updateCustomOption(index, 'type', e.target.value)}
                        className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="text">Text</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio</option>
                        <option value="select">Select</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={option.required}
                        onChange={(e) => updateCustomOption(index, 'required', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700">Wajib diisi</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              {processing ? 'Menyimpan...' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductCreate;