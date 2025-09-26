import React from "react";

const KasperAISection = () => {
    const features = [
        "AI Pemasaran",
        "AI Gambar",
        "AI Video",
        "AI Agent",
        "AI Riset",
        "AI Suara",
        "AI Chatbots",
        "AI Situs web",
        "AI Percakapan",
        "AI Pembuat aplikasi",
        "AI Pembuat prediksi",
        "Aplikais video streaming",
        "CRM",
        "Pembuat invoice",
        "Task flow dan catatan",
        "Penyimpanan awan 5 TB",
        "Email dan telepon bisnis",
        "Basis pengetahuan pribadi",
        "Tambahkan tim",
        "Komunitas",
        "Program afiliiate",
        "White label / re-brand",
    ];

    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-8">
                        Kasper AI
                    </h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left side - Device Images */}
                    <div className="relative">
                        {/* Laptop */}
                        <div className="relative">
                            <div className="bg-gray-800 rounded-t-2xl p-1">
                                <div className="bg-gray-700 rounded-t-xl p-2">
                                    {/* Browser bar */}
                                    <div className="flex items-center space-x-2 mb-2">
                                        <div className="flex space-x-1">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    {/* Screen with colorful app icons */}
                                    <div className="bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-lg p-6 aspect-[4/3]">
                                        <div className="grid grid-cols-8 gap-3">
                                            {/* Row 1 */}
                                            <div className="w-8 h-8 bg-blue-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-green-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-red-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-yellow-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-purple-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-pink-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-indigo-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-orange-400 rounded-xl shadow-lg"></div>

                                            {/* Row 2 */}
                                            <div className="w-8 h-8 bg-teal-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-cyan-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-emerald-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-lime-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-amber-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-rose-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-violet-400 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-sky-400 rounded-xl shadow-lg"></div>

                                            {/* Row 3 */}
                                            <div className="w-8 h-8 bg-blue-300 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-green-300 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-red-300 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-yellow-300 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-purple-300 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-pink-300 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-indigo-300 rounded-xl shadow-lg"></div>
                                            <div className="w-8 h-8 bg-orange-300 rounded-xl shadow-lg"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Laptop base */}
                            <div className="bg-gray-600 h-4 rounded-b-2xl shadow-lg"></div>
                            <div className="bg-gray-700 h-2 rounded-b-3xl mx-8 shadow-inner"></div>
                        </div>

                        {/* Left side text content */}
                        <div className="mt-16">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                Poin utama kegunaan Kasper AI:
                            </h3>
                            <div>
                                <ul className="list-disc space-y-0 pl-5 text-gray-700">
                                    <li>
                                        <span className="font-semibold text-gray-900">
                                            Sales:{" "}
                                        </span>
                                        Layani pelanggan sampai terjadi
                                        penjualan dan{" "}
                                        <span className="font-medium italic">
                                            repeat order
                                        </span>
                                    </li>
                                    <li>
                                        <span className="font-semibold text-gray-900">
                                            Marketing:{" "}
                                        </span>
                                        Beri penawaran menarik dan tingkatkan
                                        ketertarikan pelanggan
                                    </li>
                                    <li>
                                        <span className="font-semibold text-gray-900">
                                            Produktivitas:{" "}
                                        </span>
                                        Buat pekerjaan lebih cepat dan
                                        berkualitas dengan efisien
                                    </li>
                                    <li>
                                        <span className="font-semibold text-gray-900">
                                            Web & Ecommerce:{" "}
                                        </span>
                                        Bangun website lebih mudah dengan fitur
                                        hosting dan buat toko online sendiri
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-2 p-0 bg-gray-50 rounded-lg">
                                <p className="text-gray-700 leading-relaxed">
                                    70+ aplikasi AI dalam satu platform!
                                    Aplikasi AI sederhana untuk pemasaran
                                    digital Anda. Tidak memerlukan keahlian
                                    khusus. Buat pekerjaan lebih cepat & mudah.
                                    Coba promo paket trial 15 hari!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="lg:pl-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            All In One AI Digital Marketing
                        </h2>

                        <div className="mb-8 text-gray-700 leading-relaxed space-y-4">
                            <p>
                                Cara cepat dan mudah untuk digital marketing
                                dengan Kasper AI. Buang kebiasaan lama yang
                                menyebabkan dis-efisiensi dan kurang efektif
                                dalam proses dan hasil pemasaran digital. Mulai
                                sekarang usaha Anda harus
                                <span className="font-bold text-blue-600">
                                    {" "}
                                    #Naikkelas!
                                </span>
                            </p>

                            <p>
                                Kasper AI adalah platform pemasaran digital.
                                Memiliki lebih dari 70+ aplikasi yang disematkan
                                teknologi kecerdasan buatan atau{" "}
                                <span className="font-italic">
                                    Artificial Intelligence
                                </span>
                                .
                            </p>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-6">
                            Aplikasi unggulan Kasper AI :
                        </h3>

                        {/* Features list */}
                        <div className="grid grid-cols-1 gap-1">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <span className="text-gray-700 font-medium mr-2">
                                        {index + 1}.
                                    </span>
                                    <span className="text-gray-700">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KasperAISection;
