import React from "react";

const ELibrarySection = () => {
    return (
        <div className="bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 px-4 py-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-white text-4xl font-bold">
                        Bertindak Cepat
                    </h1>
                    <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-colors duration-300 font-medium">
                        Ambil Promonya
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Text Content */}
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                            Gratis Akses E-Library
                        </h2>

                        <blockquote className="text-gray-700 text-base lg:text-lg leading-relaxed mb-4 italic font-light">
                            "Saya membaca buku dan berbicara dengan orang lain.
                            Maksud saya, itulah cara seseorang belajar sesuatu.
                            Ada banyak buku bagus di luar sana dan ada banyak
                            orang pintar."
                        </blockquote>

                        <p className="text-gray-800 font-semibold text-base lg:text-lg">
                            Elon Musk
                        </p>
                    </div>

                    {/* Right Side - Image */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            <img
                                src="https://picsum.photos/400/300?random=1"
                                alt="E-Library Illustration"
                                className="rounded-lg shadow-2xl w-full max-w-md"
                            />
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400 rounded-full opacity-80"></div>
                            <div className="absolute -top-2 -right-6 w-6 h-6 bg-yellow-400 rounded-full opacity-80"></div>
                            <div className="absolute -bottom-6 -left-2 w-10 h-10 bg-green-400 rounded-full opacity-60"></div>
                            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-pink-400 rounded-full opacity-70"></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Header */}
            <div className="bg-blue-600 px-4 py-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-white text-4xl font-bold">
                        Baca Sekarang
                    </h1>
                    <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-colors duration-300 font-medium">
                        Masuk E-Library
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ELibrarySection;
// import React from "react";

// const ELibrarySection = () => {
//     return (
//         <section>
//             <div className="min-h-screen bg-gray-50">
//                 {/* Header */}
//                 <div className="bg-blue-600 px-4 py-8">
//                     <div className="max-w-7xl mx-auto flex justify-between items-center">
//                         <h1 className="text-white text-4xl font-bold">
//                             Bertindak Cepat
//                         </h1>
//                         <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-colors duration-300 font-medium">
//                             Ambil Promonya
//                         </button>
//                     </div>
//                 </div>

//                 {/* Main Content */}
//                 <div className="max-w-7xl mx-auto px-4 py-20">
//                     <div className="grid lg:grid-cols-2 gap-12 items-center">
//                         {/* Left Side - Text Content */}
//                         <div>
//                             <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-8 leading-tight">
//                                 Gratis Akses E-Library
//                             </h2>

//                             <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic font-light">
//                                 "Saya membaca buku dan berbicara dengan orang
//                                 lain. Maksud saya, itulah cara seseorang belajar
//                                 sesuatu. Ada banyak buku bagus di luar sana dan
//                                 ada banyak orang pintar."
//                             </blockquote>

//                             <p className="text-gray-800 font-semibold text-lg">
//                                 Elon Musk
//                             </p>
//                         </div>

//                         {/* Right Side - Image */}
//                         <div className="flex justify-center lg:justify-end">
//                             <div className="relative">
//                                 <img
//                                     src="https://picsum.photos/500/400?random=1"
//                                     alt="E-Library Illustration"
//                                     className="rounded-lg shadow-2xl w-full max-w-lg"
//                                 />
//                                 {/* Decorative elements */}
//                                 <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400 rounded-full opacity-80"></div>
//                                 <div className="absolute -top-2 -right-6 w-6 h-6 bg-yellow-400 rounded-full opacity-80"></div>
//                                 <div className="absolute -bottom-6 -left-2 w-10 h-10 bg-green-400 rounded-full opacity-60"></div>
//                                 <div className="absolute top-1/2 -right-8 w-4 h-4 bg-pink-400 rounded-full opacity-70"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//             </div>
//         </section>
//     );
// };

// export default ELibrarySection;
