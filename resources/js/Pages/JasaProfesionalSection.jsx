import React, { useState } from 'react';
import { Search, Star, MapPin, Clock } from 'lucide-react';
import Navbar from "@/Components/Navbar";


const JasaProfesionalSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - dalam implementasi nyata, ini akan dari props atau API
  const products = [
    {
      id: 1,
      name: 'Coworking Space Solo Kaspa Space',
      image: '/api/placeholder/300/200',
      rating: 4,
      reviewCount: 19,
      price: 'Rp10000.00',
      location: 'Solo',
    },
    {
      id: 2,
      name: 'Coworking Space Solo Kaspa Space',
      image: '/api/placeholder/300/200',
      rating: 4,
      reviewCount: 19,
      price: 'Rp10000.00',
      location: 'Solo',
    },
    {
      id: 3,
      name: 'Coworking Space Solo Kaspa Space',
      image: '/api/placeholder/300/200',
      rating: 4,
      reviewCount: 19,
      price: 'Rp10000.00',
      location: 'Solo',
    },
    {
      id: 4,
      name: 'Coworking Space Solo Kaspa Space',
      image: '/api/placeholder/300/200',
      rating: 4,
      reviewCount: 19,
      price: 'Rp10000.00',
      location: 'Solo',
    },
    {
      id: 5,
      name: 'Coworking Space Solo Kaspa Space',
      image: '/api/placeholder/300/200',
      rating: 4,
      reviewCount: 19,
      price: 'Rp10000.00',
      location: 'Solo',
    },
    {
      id: 6,
      name: 'Signage Solo Kaspa Space',
      image: '/api/placeholder/300/200',
      rating: 5,
      reviewCount: 0,
      price: 'Rp1625000.00',
      location: 'Solo',
    },
    {
      id: 7,
      name: 'Signage Solo Kaspa Space',
      image: '/api/placeholder/300/200',
      rating: 5,
      reviewCount: 0,
      price: 'Rp1625000.00',
      location: 'Solo',
    },
    {
      id: 8,
      name: 'Signage Solo Kaspa Space',
      image: '/api/placeholder/300/200',
      rating: 5,
      reviewCount: 0,
      price: 'Rp1625000.00',
      location: 'Solo',
    },
    {
      id: 9,
      name: 'Signage Solo Kaspa Space',
      image: '/api/placeholder/300/200',
      rating: 5,
      reviewCount: 0,
      price: 'Rp1625000.00',
      location: 'Solo',
    },
    {
      id: 10,
      name: 'Signage Solo Kaspa Space',
      image: '/api/placeholder/300/200',
      rating: 5,
      reviewCount: 0,
      price: 'Rp1625000.00',
      location: 'Solo',
    },
    {
      id: 11,
      name: 'Signage Solo Kaspa Space',
      image: '/api/placeholder/300/200',
      rating: 5,
      reviewCount: 0,
      price: 'Rp1625000.00',
      location: 'Solo',
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating, reviewCount) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            className={`${
              index < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({reviewCount})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
        <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-black bg-opacity-30"
          style={{
            backgroundImage: "url('/api/placeholder/1920/400')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Jasa Profesional
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100 leading-relaxed">
            Jasa profesional yang siap membantu Anda dalam pengurusan izin usaha, perpajakan, sertifikasi ISO, hingga cetak dokumen
          </p>
          
          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="text"
                placeholder="Cari produk Jasa Profesional..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-800 bg-white/95 backdrop-blur-sm border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-lg placeholder-blue-400"
              />
            </div>
          </div>
          
          {/* Info Link */}
          <div className="mt-6">
            <a href="#" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm bg-blue-900/30 px-4 py-2 rounded-full backdrop-blur-sm border border-blue-400/30 hover:bg-blue-800/40 transition-all duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Lihat jadwal ketersediaan ruang di sini.
            </a>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Produk Jasa Profesional Tersedia
                </h2>
                <p className="text-blue-600 font-medium">
                  {filteredProducts.length} produk ditemukan
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent z-10"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Label placeholder - akan diatur dari dashboard */}
                {/* <div className="absolute top-3 left-3 z-20">
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    Label
                  </span>
                </div> */}
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-200/30 to-transparent"></div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-semibold text-slate-800 mb-3 line-clamp-2 text-base leading-tight">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        className={`${
                          index < product.rating
                            ? 'fill-blue-400 text-blue-400'
                            : 'text-blue-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">
                    ({product.reviewCount}) review
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-xs text-blue-600 font-medium mb-1">Mulai dari</div>
                  <span className="text-lg font-bold text-blue-900 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                </div>

                {/* Order Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 px-4 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1">
                  <span className="flex items-center justify-center gap-2">
                    Pesan Sekarang
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </button>
              </div>

              {/* Bottom decoration */}
              <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Tidak ada produk yang ditemukan</h3>
              <p className="text-blue-600 mb-6">Coba gunakan kata kunci yang berbeda atau jelajahi semua produk kami</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
              >
                Lihat Semua Produk
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
      {/* RoomSchedule */}
    </div>
  );
};

export default JasaProfesionalSection;