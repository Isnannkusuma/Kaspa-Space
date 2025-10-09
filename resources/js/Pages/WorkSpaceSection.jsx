import React, { useState, useMemo } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import ProductModal from "@/Components/ProductModal";
import GoogleSheetsScheduleSection from "./SectionWorkSpace/GoogleSheetsScheduleSection";

const WorkspaceSection = ({ products = [], currentCategory, categories = [] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { props } = usePage();
    const cart = props.cart || [];

    // Debug logs
    console.log("=== WorkspaceSection Debug ===");
    console.log("Total products received:", products.length);
    console.log("Products:", products);
    console.log("Cart items:", cart.length);

    // Filter produk berdasarkan search term
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                searchTerm === "" ||
                (product.title &&
                    product.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()));

            return matchesSearch;
        });
    }, [products, searchTerm]);

    const handleOrderClick = (product) => {
        console.log("=== handleOrderClick Debug ===");
        console.log("Product clicked:", product);
        console.log("Product has variants:", product?.variants);
        console.log("Product has custom_options:", product?.custom_options);
        console.log("Product keys:", Object.keys(product));

        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

                <div className="relative container mx-auto px-4 py-24">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex-1">
                            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                                Coworking Space
                            </h1>
                            <p className="text-xl mb-8 max-w-2xl text-blue-100 leading-relaxed">
                                Tempat kerja modern dan fleksibel untuk
                                produktivitas maksimal
                            </p>
                        </div>

                        {/* Cart Button */}
                        <Link
                            href="/cart"
                            className="relative bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="font-semibold">Keranjang</span>
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-lg mx-auto relative mb-6">
                        <div className="relative">
                            <Search
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Cari coworking space..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-800 bg-white/95 backdrop-blur-sm border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-lg placeholder-blue-400"
                            />
                        </div>
                    </div>

                    {/* Info Link */}
                    <div className="mt-6 text-center">
                        <a
                            href="#schedule"
                            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm bg-blue-900/30 px-4 py-2 rounded-full backdrop-blur-sm border border-blue-400/30 hover:bg-blue-800/40 transition-all duration-200"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Lihat jadwal ketersediaan ruang di sini
                        </a>
                    </div>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="flex gap-4 mb-6">
                {categories.map(category => (
                    <Link
                        key={category.id}
                        href={route('workspace', category.slug)}
                        className={`px-4 py-2 rounded-lg ${
                            currentCategory?.id === category.id 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        {category.name}
                    </Link>
                ))}
            </div>

            {/* Products Section */}
            <div className="bg-gradient-to-b from-blue-50/50 to-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                    Coworking Space Tersedia
                                </h2>
                                <p className="text-blue-600 font-medium">
                                    {filteredProducts.length} ruang ditemukan
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-2 text-blue-600">
                                <div className="w-8 h-1 bg-blue-600 rounded"></div>
                                <div className="w-4 h-1 bg-blue-300 rounded"></div>
                                <div className="w-2 h-1 bg-blue-200 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                                >
                                    {/* Product Image */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={
                                                product.images &&
                                                product.images.length > 0
                                                    ? `/storage/${product.images[0]}`
                                                    : "/images/placeholder.png"
                                            }
                                            alt={product.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src =
                                                    "/images/placeholder.png";
                                            }}
                                        />
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-200/30 to-transparent"></div>

                                        {/* Promo Label */}
                                        {product.promo_label && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                                                {product.promo_label}
                                            </div>
                                        )}

                                        {/* Category Badge */}
                                        {product.category && (
                                            <div className="absolute top-2 right-2 bg-blue-600/90 text-white text-xs px-3 py-1 rounded-full font-medium">
                                                {product.category.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5">
                                        <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 text-base leading-tight min-h-[48px]">
                                            {product.title}
                                        </h3>

                                        {/* Subtitle if exists */}
                                        {product.subtitle && (
                                            <p className="text-sm text-slate-600 mb-3 line-clamp-1">
                                                {product.subtitle}
                                            </p>
                                        )}

                                        {/* Price */}
                                        <div className="mb-4">
                                            <div className="text-xs text-blue-600 font-medium mb-1">
                                                Mulai dari
                                            </div>
                                            <span className="text-lg font-bold text-blue-900">
                                                Rp{" "}
                                                {Number(
                                                    product.base_price
                                                ).toLocaleString("id-ID")}
                                            </span>
                                            {product.variants &&
                                                product.variants.length > 0 && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {
                                                            product.variants
                                                                .length
                                                        }{" "}
                                                        paket tersedia
                                                    </p>
                                                )}
                                        </div>

                                        {/* Order Button */}
                                        <button
                                            onClick={() =>
                                                handleOrderClick(product)
                                            }
                                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 px-4 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                Pesan Sekarang
                                                <svg
                                                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 5l7 7-7 7"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>

                                    {/* Bottom decoration */}
                                    <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search
                                        size={32}
                                        className="text-blue-500"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                                    Tidak ada coworking space yang ditemukan
                                </h3>
                                <p className="text-blue-600 mb-6">
                                    {searchTerm
                                        ? "Coba gunakan kata kunci yang berbeda"
                                        : "Belum ada coworking space yang tersedia"}
                                </p>
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
                                    >
                                        Tampilkan Semua
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Schedule Section */}
            <div
                id="schedule"
                className="flex justify-center items-center p-6 bg-slate-50"
            >
                <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3">
                        <h2 className="text-white text-lg font-semibold">
                            📊 Jadwal Sewa Ruangan
                        </h2>
                    </div>
                    <iframe
                        className="w-full h-[600px] border-0"
                        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSi4CNuxtDmtyXyIYCEEyToK9oTTYygNf7KnU1JdvqoNkjBCkWtTv8Rtgr8-_-g3WUamRjmTNQxDEQS/pubhtml?widget=true&amp;headers=false"
                        title="Jadwal Sewa Ruangan"
                    ></iframe>
                </div>
            </div>

            {/* Additional Schedule Component */}
            <GoogleSheetsScheduleSection />

            {/* Product Modal */}
            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default WorkspaceSection;
