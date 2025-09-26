import React from 'react';

const GrowTogetherSection = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-600 py-32">
        <div className="max-w-7xl mx-auto px-30 flex justify-between items-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Tabel Reservasi
          </h1>
          <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
            Lihat Jadwalnya
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Tumbuh Bersama Kami
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* About Us Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Tentang Kami
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Kaspa Space adalah ekosistem kerja profesional, produktif, 
                  dan efisien. Integrasi dilakukan dengan menggabungkan 
                  layanan ruang kerja fleksibel, perizinan usaha, sertifikasi ISO, 
                  hingga teknologi kecerdasan buatan seperti Kasper AI. 
                  Mendukung pekerjaan Anda dari aspek fisik hingga digital.
                </p>
              </div>

              {/* Why Kaspa Space Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Mengapa Kaspa Space?
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Karena inovasi lahir dari kolaborasi, dan kolaborasi tumbuh di 
                  tempat yang mempertemukan ide, bakat, dan peluang. 
                  Kaspa Space bukan sekadar tempat bekerja, tapi ekosistem 
                  yang mendukung pertumbuhan, koneksi, dan masa depan 
                  bersama.
                </p>
              </div>
            </div>

            {/* Right Content - Video */}
            <div className="relative">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
                {/* Video Container */}
                <div className="relative aspect-video bg-gray-900">
                  {/* Video Thumbnail */}
                  <img 
                    src="/api/placeholder/640/360" 
                    alt="Kaspa Space Video"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    {/* Play Button */}
                    <button className="bg-red-600 hover:bg-red-700 rounded-full p-4 transition-all duration-300 hover:scale-110">
                      <svg 
                        className="w-8 h-8 text-white ml-1" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l8-5-8-5z" />
                      </svg>
                    </button>
                  </div>

                  {/* Video Title Overlay */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex items-center space-x-2 text-white">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">KS</span>
                      </div>
                      <span className="text-sm">Apa Itu Coworking Space...</span>
                    </div>
                  </div>

                  {/* Video Controls Overlay */}
                  <div className="absolute top-4 right-4 flex items-center space-x-2 text-white">
                    <span className="text-sm">1/1</span>
                    <button className="hover:bg-white hover:bg-opacity-20 p-1 rounded">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  {/* KASPA SPACE Logo Overlay */}
                  <div className="absolute bottom-16 left-4">
                    <div className="text-white">
                      <div className="text-2xl font-bold">KASPA</div>
                      <div className="text-sm opacity-80">SPACE</div>
                    </div>
                  </div>
                </div>

                {/* Video Footer */}
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Tonton di</span>
                    <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="text-sm font-semibold">YouTube</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowTogetherSection;