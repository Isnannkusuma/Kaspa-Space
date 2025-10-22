// resources/js/Components/ProductModal.jsx
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';

export default function ProductModal({ product, isOpen, onClose }) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [customOptions, setCustomOptions] = useState({});

    // Reset state when modal opens with new product
    useEffect(() => {
        if (isOpen && product) {
            setSelectedVariant(null);
            setQuantity(1);
            setCustomOptions({});
            
            // Auto-select first active variant if available
            if (product.variants && product.variants.length > 0) {
                const firstActiveVariant = product.variants.find(v => 
                    v.is_active && (!v.manage_stock || v.stock_quantity > 0)
                );
                if (firstActiveVariant) {
                    setSelectedVariant(firstActiveVariant);
                }
            }
        }
    }, [isOpen, product]);

    if (!isOpen || !product) return null;

    // Debug: Log product data
    console.log('Product data:', product);
    console.log('Variants:', product.variants);
    console.log('Custom Options:', product.custom_options);

    // Parse custom_options dari JSON jika ada
    let productCustomOptions = [];
    try {
        if (product.custom_options) {
            productCustomOptions = typeof product.custom_options === 'string' 
                ? JSON.parse(product.custom_options) 
                : product.custom_options;
        }
    } catch (error) {
        console.error('Error parsing custom_options:', error);
        productCustomOptions = [];
    }

    const handleVariantChange = (variant) => {
        setSelectedVariant(variant);
    };

    const handleCustomOptionChange = (optionName, value) => {
        setCustomOptions(prev => ({
            ...prev,
            [optionName]: value
        }));
    };

    const handleAddToCart = () => {
        if (!selectedVariant) {
            alert('Silakan pilih varian produk');
            return;
        }

        const data = {
            product_id: product.id,
            product_name: product.title,
            variant_id: selectedVariant.id,
            variant_name: selectedVariant.name,
            custom_options: customOptions,
            quantity: quantity,
            price: selectedVariant.price,
        };

        router.post('/cart/add', data, {
            onSuccess: () => {
                onClose();
            },
            onError: (errors) => {
                console.error('Error adding to cart:', errors);
                alert('Gagal menambahkan ke keranjang');
            }
        });
    };

    // Get product image
    const productImage = product.images && product.images.length > 0 
        ? `/storage/${product.images[0]}` 
        : '/images/placeholder.png';

    // Calculate display price
    const displayPrice = selectedVariant 
        ? Number(selectedVariant.price) 
        : (product.variants && product.variants.length > 0 
            ? Number(product.variants[0].price) 
            : Number(product.base_price || 0));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl z-10">
                    <div>
                        <h2 className="text-2xl font-bold">{product.title}</h2>
                        {product.subtitle && (
                            <p className="text-blue-100 text-sm mt-1">{product.subtitle}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column - Image & Description */}
                        <div>
                            <div className="relative rounded-xl overflow-hidden shadow-lg mb-4">
                                <img
                                    src={productImage}
                                    alt={product.title}
                                    className="w-full h-64 object-cover"
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder.png';
                                    }}
                                />
                                {product.promo_label && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {product.promo_label}
                                    </div>
                                )}
                                {product.category && (
                                    <div className="absolute top-3 right-3 bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {product.category.name}
                                    </div>
                                )}
                            </div>
                            
                            {product.description && (
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-900 mb-2">Deskripsi</h3>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Harga yang dipilih:</p>
                                <p className="text-3xl font-bold text-blue-900">
                                    Rp{displayPrice.toLocaleString('id-ID')}
                                </p>
                                {selectedVariant?.compare_price && selectedVariant.compare_price > selectedVariant.price && (
                                    <p className="text-lg text-gray-500 line-through mt-1">
                                        Rp{Number(selectedVariant.compare_price).toLocaleString('id-ID')}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Variants & Options */}
                        <div className="space-y-6">
                            {/* Debug Info - Remove in production */}
                            {process.env.NODE_ENV === 'development' && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-xs">
                                    <p>Variants: {product.variants?.length || 0}</p>
                                    <p>Custom Options: {productCustomOptions?.length || 0}</p>
                                </div>
                            )}

                            {/* Variants */}
                            {product.variants && Array.isArray(product.variants) && product.variants.length > 0 ? (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Pilih Paket <span className="text-red-500">*</span>
                                    </label>
                                    <div className="space-y-2">
                                        {product.variants.map((variant) => {
                                            const isDisabled = !variant.is_active || (variant.manage_stock && variant.stock_quantity <= 0);
                                            const isSelected = selectedVariant?.id === variant.id;
                                            
                                            return (
                                                <button
                                                    key={variant.id}
                                                    onClick={() => !isDisabled && handleVariantChange(variant)}
                                                    disabled={isDisabled}
                                                    className={`w-full text-left border-2 rounded-lg p-4 transition-all ${
                                                        isSelected
                                                            ? 'border-blue-600 bg-blue-50 shadow-md'
                                                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                                    } ${
                                                        isDisabled
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : 'cursor-pointer'
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex-1">
                                                            <p className="font-semibold text-gray-800">{variant.name}</p>
                                                            {variant.description && (
                                                                <p className="text-xs text-gray-500 mt-1">{variant.description}</p>
                                                            )}
                                                            {variant.manage_stock && (
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    Stok: {variant.stock_quantity}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="text-right ml-4">
                                                            <p className="font-bold text-blue-900">
                                                                Rp{Number(variant.price).toLocaleString('id-ID')}
                                                            </p>
                                                            {variant.compare_price && variant.compare_price > variant.price && (
                                                                <p className="text-xs text-gray-500 line-through">
                                                                    Rp{Number(variant.compare_price).toLocaleString('id-ID')}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-600">⚠️ Tidak ada paket tersedia untuk produk ini</p>
                                </div>
                            )}

                            {/* Custom Options */}
                            {productCustomOptions && Array.isArray(productCustomOptions) && productCustomOptions.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-700">Opsi Tambahan</h3>
                                    {productCustomOptions.map((option, index) => (
                                        <div key={index}>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                {option.label || option.name}
                                                {option.required && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                            
                                            {option.type === 'checkbox' && (
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={customOptions[option.name] === 'tidak'}
                                                        onChange={(e) => handleCustomOptionChange(option.name, e.target.checked ? 'tidak' : '')}
                                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="ml-3 text-sm text-gray-600">tidak</span>
                                                </div>
                                            )}
                                            
                                            {option.type === 'text' && (
                                                <input
                                                    type="text"
                                                    value={customOptions[option.name] || ''}
                                                    onChange={(e) => handleCustomOptionChange(option.name, e.target.value)}
                                                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                    placeholder={option.placeholder || `Masukkan ${option.name}`}
                                                />
                                            )}
                                            
                                            {option.type === 'select' && option.options && Array.isArray(option.options) && (
                                                <select
                                                    value={customOptions[option.name] || ''}
                                                    onChange={(e) => handleCustomOptionChange(option.name, e.target.value)}
                                                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                >
                                                    <option value="">Pilih {option.name}</option>
                                                    {option.options.map((opt, idx) => (
                                                        <option key={idx} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            )}

                                            {option.type === 'textarea' && (
                                                <textarea
                                                    value={customOptions[option.name] || ''}
                                                    onChange={(e) => handleCustomOptionChange(option.name, e.target.value)}
                                                    rows={3}
                                                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                    placeholder={option.placeholder || `Masukkan ${option.name}`}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quantity */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Jumlah</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-24 text-center border-2 border-gray-300 rounded-lg px-4 py-3 font-semibold text-lg"
                                        min="1"
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedVariant}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                            >
                                {selectedVariant ? 'Tambah ke Keranjang' : 'Pilih Paket Terlebih Dahulu'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}