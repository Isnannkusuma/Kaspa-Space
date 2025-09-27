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
    images: [],
    custom_options: [],
    variants: [],
    recommendations: [],
  });

  const [imagePreview, setImagePreview] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
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
    post(route('admin.products.store'));
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
            <h1 className="text-2xl font-semibold text-gray-900">Edit layanan</h1>
          </div>
          <div className="flex items-center space-x-3">
            <select className="block text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
              <option>Ditampilkan</option>
              <option>Disembunyikan</option>
            </select>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Produk</h2>
            
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

            <button
              type="button"
              onClick={() => document.querySelector('input[type="file"]')?.click()}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Buat detail produk
            </button>
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
                placeholder="Virtual Office - Kaspa Space Sinarmas Surabaya"
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
                placeholder="Virtual Office untuk Startup dan UMKM Indonesia maju"
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
                placeholder="NEW"
                className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <div className="border border-gray-300 rounded-md">
                <div className="px-3 py-2 border-b border-gray-300 bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <button type="button" className="text-indigo-600 text-sm font-medium">AI Writer</button>
                    <span className="text-gray-400">|</span>
                    <button type="button" className="p-1 text-gray-400 hover:text-gray-600">H2</button>
                    <button type="button" className="p-1 text-gray-400 hover:text-gray-600">H3</button>
                    <button type="button" className="p-1 text-gray-400 hover:text-gray-600 font-bold">B</button>
                    <button type="button" className="p-1 text-gray-400 hover:text-gray-600 italic">I</button>
                  </div>
                </div>
                <textarea
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  placeholder="Apa itu Virtual Office?"
                  rows={8}
                  className="block w-full border-0 resize-none focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* Product Variants */}
          <div className="bg-white rounded-lg shadow p-6">
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
            
            <p className="text-sm text-gray-500 mb-6">
              Kelola opsi produk seperti ukuran, warna, atau berat. Setiap varian dibuat dan bisa diatur satu per satu.
            </p>

            <div className="space-y-4">
              {/* Package Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paket</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Bronze 12 Bulan', 'Platinum 12 Bulan', 'Gold 12 Bulan', 'PT/CV Bronze 12 Bulan', 'PT/CV Platinum 12 Bulan', 'PT/CV Gold 12 Bulan', 'Bronze 12 Bulan + PT Perorangan', 'Bronze 12 Bulan + PT Umum', 'Bronze 12 Bulan + CV', 'Platinum 12 Bulan + PT Perorangan PKP', 'Platinum 12 Bulan + PT Umum PKP', 'Platinum 12 Bulan + CV PKP'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Variant List */}
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
                        placeholder="Bronze 12 Bulan + PT Perorangan"
                        className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Harga</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">Rp</span>
                        <input
                          type="number"
                          value={variant.price}
                          onChange={(e) => updateVariant(index, 'price', e.target.value)}
                          placeholder="395000"
                          className="block w-full pl-8 text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Harga Asal</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">Rp</span>
                        <input
                          type="number"
                          value={variant.compare_price}
                          onChange={(e) => updateVariant(index, 'compare_price', e.target.value)}
                          placeholder="450000"
                          className="block w-full pl-8 text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">SKU</label>
                      <input
                        type="text"
                        value={variant.sku || ''}
                        onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                        placeholder="62638202"
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">Info kustom</h3>
            <p className="text-sm text-gray-500 mb-4">
              Pelanggan bisa menambahkan teks untuk mempersonalisasi produk.
            </p>

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
                        placeholder="Tidak sekalian: Kasper AI, coworking lainnya, legalitas usaha, atau Microsoft key? 😊"
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

          {/* Category and Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Kategori</h3>
            <p className="text-sm text-gray-500 mb-4">
              Buat kategori produk agar pelanggan mudah menemukan barang.
            </p>

            <div className="space-y-4">
              <div>
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

              {/* Product Recommendations */}
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-2">Produk terkait</h4>
                <p className="text-sm text-gray-500 mb-3">
                  Tingkatkan penjualan dengan menampilkan produk terkait di halaman ini, seperti "Rekomendasi untuk Anda", "Cocok Dipadukan dengan", atau "Produk Serupa".
                </p>
                
                <div className="flex items-center mb-4">
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

                {data.recommendations.length > 0 || allProducts.length > 0 ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Judul bagian</label>
                      <input
                        type="text"
                        defaultValue="Rekomendasi untuk Anda"
                        className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                      <select className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                        <option>Co-working Space</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : null}
              </div>
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
              {processing ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductCreate;