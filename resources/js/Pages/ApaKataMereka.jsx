import React, { useEffect } from 'react';

const ApaKataMereka = () => {
  useEffect(() => {
    // Load Elfsight script
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Banyak ulasan positif yang kami terima dari klien Kaspa Space
          </p>
        </div>

        {/* Google Reviews Widget Container */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <div className="elfsight-app-59e880af-6b30-4a5c-84da-b56eda05c7e5" data-elfsight-app-lazy></div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-blue-100 text-lg">
            Bergabunglah dengan ribuan klien yang telah merasakan manfaat Kaspa Space
          </p>
        </div>
      </div>
    </section>
  );
};

export default ApaKataMereka;