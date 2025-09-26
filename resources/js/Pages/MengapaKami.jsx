import React from 'react';

const WhyChooseUsSection = () => {
  const benefits = [
    {
      id: 1,
      title: "Coworking Space Gratis",
      description: "Kami ajak Anda merasakan keseruan pengalaman kerja atau nugas di Coworking Kaspa Space."
    },
    {
      id: 2,
      title: "Microsoft Key Gratis",
      description: "Sering disepelekan! Aktivasi Microsoft secara resmi akan membantu melindungi data komputer Anda."
    },
    {
      id: 3,
      title: "Signage Gratis",
      description: "Papan nama usaha bukan sekedar formalitas semata. Anda dapat menggunakannya untuk promosi."
    },
    {
      id: 4,
      title: "Kasper AI Gratis",
      description: "Kasper AI adalah platform digital marketing memiliki lebih dari 70+ aplikasi berteknologi AI."
    },
    {
      id: 5,
      title: "PKP Gratis",
      description: "Tidak ingin ribet mengurus PKP? Jangan khawatir. Tim profesional kami siap membantu Anda."
    },
    {
      id: 6,
      title: "Rekening BRI Gratis",
      description: "Kaspa Space bekerjasama dengan BRI dalam rangka menyediakan kemudahan transaksi bisnis Anda."
    },
    {
      id: 7,
      title: "Ebook Gratis",
      description: "Akses eLibrary dengan koleksi eBook populer lebih dari 7.800. Berbahasa Indonesia dan Inggris."
    },
    {
      id: 8,
      title: "AI Chatbot Gratis",
      description: "Balas pesan pelanggan secara otomatis di website. Biarkan chatbot bekerja tanpa henti untuk Anda."
    },
    {
      id: 9,
      title: "Iklan Detik Gratis",
      description: "Promosikan usaha Anda secara gratis di Adsmart by Detikcom. Buat banyak orang tahu usaha Anda."
    }
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Pilihan ada di tangan Anda. Kami tidak sedang bercanda, benefit sebanyak ini kami berikan secara gratis untuk Anda
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id} 
              className="bg-gradient-to-br from-cyan-400 to-blue-500 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-white"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-gray-800 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;