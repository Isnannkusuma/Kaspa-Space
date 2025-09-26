import React from 'react';
import gambar1 from '../../images/1.jpg'; // Ganti dengan path gambar yang sesuai
import gambar2 from '../../images/2.jpg'; // Ganti dengan path gambar yang sesuai
import gambar3 from '../../images/3.jpg'; // Ganti dengan path gambar yang sesuai

const OnlineBookingSection = () => {
  const services = [
    {
      id: 1,
      title: "Coworking Space",
      image: gambar1, // Ganti dengan path gambar yang sesuai
      features: [
        "Sewa harian, mingguan, bulanan",
        "Fleksibel dan lebih efisien"
      ],
      bgColor: "bg-sky-500"
    },
    {
      id: 2,
      title: "Virtual Office",
      image: gambar2, // Ganti dengan path gambar yang sesuai
      features: [
        "Lebih hemat sewa alamat kantor",
        "Resepsionis, meeting room, PKP"
      ],
      bgColor: "bg-sky-500"
    },
    {
      id: 3,
      title: "Dukungan Bisnis",
      image: gambar3, // Ganti dengan path gambar yang sesuai
      features: [
        "Legalitas, ISO, pajak, dan lainnya",
        "Tidak perlu ribet kami yang urus"
      ],
      bgColor: "bg-sky-500"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Pemesanan Online
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Pesan sekarang lebih mudah, cepat, aman, dan transparan. Nikmati 
            pelayanan dengan lebih menyenangkan
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image Container */}
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                {/* KASPA SPACE Logo Overlay */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white bg-opacity-90 px-3 py-1 rounded-lg">
                    <span className="text-sm font-semibold text-gray-800">KASPA</span>
                    <div className="text-xs text-gray-600">SPACE</div>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className={`${service.bgColor} p-6 text-white`}>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                
                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-white mr-2 mt-1">•</span>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-8 rounded-full border border-white border-opacity-30 transition-all duration-300 hover:scale-105">
                  Selengkapnya
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnlineBookingSection;