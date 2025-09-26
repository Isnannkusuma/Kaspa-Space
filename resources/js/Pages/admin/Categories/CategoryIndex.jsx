import React, { useState } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";

const CategoriesIndex = ({ categories }) => {
    const [editingCategory, setEditingCategory] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        description: "",
        icon: "",
        is_active: true,
        sort_order: 0,
    });

    const handleCreate = (e) => {
        e.preventDefault();
        post(route("admin.categories.store"), {
            onSuccess: () => {
                reset();
                setShowCreateForm(false);
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("admin.categories.update", editingCategory.id), {
            onSuccess: () => {
                reset();
                setEditingCategory(null);
            },
        });
    };

    const handleEdit = (category) => {
        setData({
            name: category.name,
            description: category.description || "",
            icon: category.icon || "",
            is_active: category.is_active,
            sort_order: category.sort_order,
        });
        setEditingCategory(category);
        setShowCreateForm(false);
    };

    const handleDelete = (category) => {
        if (
            confirm(
                `Apakah Anda yakin ingin menghapus kategori "${category.name}"?`
            )
        ) {
            router.delete(route("admin.categories.destroy", category.id));
        }
    };

    const toggleStatus = (category) => {
        router.patch(
            route("admin.categories.update", category.id),
            {
                is_active: !category.is_active,
            },
            {
                preserveState: true,
                only: ["categories"],
            }
        );
    };

    const cancelEdit = () => {
        setEditingCategory(null);
        setShowCreateForm(false);
        reset();
    };

    const iconOptions = [
        { value: "building-office", label: "🏢 Building Office" },
        { value: "briefcase", label: "💼 Briefcase" },
        { value: "cpu-chip", label: "🖥️ CPU Chip" },
        { value: "key", label: "🔑 Key" },
        { value: "book-open", label: "📖 Book Open" },
        { value: "cake", label: "🎂 Cake" },
        { value: "tag", label: "🏷️ Tag" },
        { value: "cog", label: "⚙️ Cog" },
    ];

    return (
        <AdminLayout title="Kategori">
            <Head title="Kategori" />

            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Kategori
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola kategori produk untuk memudahkan pelanggan
                            menemukan produk
                        </p>
                    </div>

                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Tambah Kategori
                    </button>
                </div>

                {/* Create/Edit Form */}
                {(showCreateForm || editingCategory) && (
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editingCategory
                                    ? "Edit Kategori"
                                    : "Tambah Kategori"}
                            </h3>

                            <form
                                onSubmit={
                                    editingCategory
                                        ? handleUpdate
                                        : handleCreate
                                }
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Kategori{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="Nama kategori"
                                            className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Icon
                                        </label>
                                        <select
                                            value={data.icon}
                                            onChange={(e) =>
                                                setData("icon", e.target.value)
                                            }
                                            className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="">Pilih Icon</option>
                                            {iconOptions.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Deskripsi kategori"
                                        rows={3}
                                        className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.is_active}
                                                onChange={(e) =>
                                                    setData(
                                                        "is_active",
                                                        e.target.checked
                                                    )
                                                }
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label className="ml-2 text-sm text-gray-700">
                                                Aktif
                                            </label>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Urutan
                                            </label>
                                            <input
                                                type="number"
                                                value={data.sort_order}
                                                onChange={(e) =>
                                                    setData(
                                                        "sort_order",
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                                className="block w-20 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                                        >
                                            {processing
                                                ? "Menyimpan..."
                                                : editingCategory
                                                ? "Update"
                                                : "Simpan"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Categories List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Daftar Kategori ({categories.data.length})
                        </h3>
                    </div>

                    {categories.data.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-lg mb-4">
                                Belum ada kategori
                            </div>
                            <button
                                onClick={() => setShowCreateForm(true)}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Tambah Kategori Pertama
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <Bars3Icon className="h-4 w-4" />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Deskripsi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Produk
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Urutan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {categories.data.map((category) => (
                                        <tr
                                            key={category.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Bars3Icon className="h-4 w-4 text-gray-400 cursor-move" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {category.icon && (
                                                        <div className="flex-shrink-0 h-8 w-8 mr-3">
                                                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                                                <span className="text-sm text-indigo-600">
                                                                    {iconOptions
                                                                        .find(
                                                                            (
                                                                                opt
                                                                            ) =>
                                                                                opt.value ===
                                                                                category.icon
                                                                        )
                                                                        ?.label?.split(
                                                                            " "
                                                                        )[0] ||
                                                                        "📁"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {category.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {category.slug}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-xs truncate">
                                                    {category.description ||
                                                        "-"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {category.products_count || 0}{" "}
                                                produk
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        toggleStatus(category)
                                                    }
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        category.is_active
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {category.is_active ? (
                                                        <>
                                                            <EyeIcon className="h-3 w-3 mr-1" />
                                                            Aktif
                                                        </>
                                                    ) : (
                                                        <>
                                                            <EyeSlashIcon className="h-3 w-3 mr-1" />
                                                            Tidak Aktif
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {category.sort_order}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        href={route(
                                                            "admin.categories.show",
                                                            category.id
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                        title="Lihat Detail"
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(category)
                                                        }
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                        title="Edit"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                category
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Hapus"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {categories.links && categories.links.length > 3 && (
                        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Menampilkan {categories.from || 0} -{" "}
                                    {categories.to || 0} dari {categories.total}{" "}
                                    kategori
                                </div>

                                <div className="flex items-center space-x-1">
                                    {categories.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                link.url &&
                                                router.visit(link.url)
                                            }
                                            disabled={!link.url}
                                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                                link.active
                                                    ? "bg-indigo-600 text-white"
                                                    : link.url
                                                    ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                                    : "text-gray-300 cursor-not-allowed"
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default CategoriesIndex;
