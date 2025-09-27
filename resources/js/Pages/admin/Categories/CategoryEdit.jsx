import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '../LandingAdmin';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const CategoriesEdit = ({ category }) => {
  const { data, setData, put, processing, errors } = useForm({
    name: category.name || '',
    description: category.description || '',
    icon: category.icon || '',
    is_active: category.is_active || true,
    sort_order: category.sort_order || 0,
  });

  const iconOptions = [
    { value: 'building-office', label: '🏢 Building Office' },
    { value: 'briefcase', label: '💼 Briefcase' },
    { value: 'cpu-chip', label: '🖥️ CPU Chip' },
    { value: 'key', label: '🔑 Key' },
    { value: 'book-open', label: '📖 Book Open' },
    { value: 'cake', label: '🎂 Cake' },
    { value: 'tag', label: '🏷️ Tag' },
    { value: 'cog', label: '⚙️ Cog' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.categories.update', category.id));
  };

  return (
    <AdminLayout title={`Edit Kategori: ${category.name}`}>
      <Head title={`Edit Kategori: ${category.name}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link
            href={route('admin.categories.index')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors mr-3"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Edit Kategori</h1>
            <p className="text-sm text-gray-500 mt-1">{category.name}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kategori <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Masukkan nama kategori"
                  className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <select
                  value={data.icon}
                  onChange={(e) => setData('icon', e.target.value)}
                  className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Pilih Icon</option>
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
              <textarea
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Masukkan deskripsi kategori"
                rows={4}
                className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Category Stats */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Statistik Kategori</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Slug</p>
                  <p className="font-medium">{category.slug}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Produk</p>
                  <p className="font-medium">{category.products_count || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dibuat</p>
                  <p className="font-medium">
                    {new Date(category.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urutan</label>
                <input
                  type="number"
                  value={data.sort_order}
                  onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                  className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.is_active}
                  onChange={(e) => setData('is_active', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Kategori Aktif</label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
                    // Handle delete
                    window.location.href = route('admin.categories.destroy', category.id);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Hapus Kategori
              </button>
              
              <div className="flex items-center space-x-3">
                <Link
                  href={route('admin.categories.index')}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Batal
                </Link>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={processing}
                  className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                >
                  {processing ? 'Menyimpan...' : 'Update Kategori'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoriesEdit;