import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { ChevronDown, Menu, X, ShoppingBag, Search, Library } from "lucide-react";
import OnlineBookingSection from "./OnlineBookingSection";
import GrowTogetherSection from "./GrowthTogetherSection";
import FeaturedProductsSection from "./FeaturedProduct";
import KasperAISection from "./kasperAi";
import Video from "../../images/background.mp4";
import ApaKataMereka from "./ApaKataMereka";
import ELibrarySection from "./Library";
import WhyChooseUsSection from "./MengapaKami";


const LandingPage = () => {
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <Navbar />
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-start justify-center pt-16 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 pb-20">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src= {Video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {/* overlay gelap biar teks tetap jelas */}
                    
                </div>

                {/* Content */}
                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-40">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Coworking Space
                    </h1>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-blue-400">
                        #GrowingWithUs
                    </h2>
                    <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Kerja lebih profesional, produktif, dan efisien dengan
                        <br />
                        kombinasi ruang kantor fleksibel dan dukungan bisnis
                        andal
                    </p>

                    {/* CTA Button */}
                    <div className="mb-16">
                        <a
                            href="/get-closer"
                            className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-gray-900 transition-all duration-300"
                        >
                            #KenalLebihDekat
                        </a>
                    </div>
                </div>

                {/* Bottom Section with Search */}
                <div className="absolute bottom-12 left-0 right-0 bg-blue-600 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Search Bar */}
                        <div className="max-w-4xl mx-auto mb-2">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari produk Anda di sini"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                                />
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="text-center">
                            <div className="inline-flex items-center text-white text-sm">
                                <span className="mr-2">💡</span>
                                <span className="font-medium">
                                    Rekomendasi:
                                </span>
                                <span className="ml-2">
                                    Coworking, Virtual Office, Workspace,
                                    Meeting Room, Pendiri PT, ISO, Pajak,
                                    Keuangan
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* BookingSection */}
            <OnlineBookingSection />
            {/* GrowTogetherSection */}
            <GrowTogetherSection />
            {/* FeaturedProduct */}
            <FeaturedProductsSection />
            {/* Kasper AI */}
            <KasperAISection />
            {/* Library */}
            <ELibrarySection />
            {/* WhyChooseUsSection */}
            <WhyChooseUsSection />
            {/* ApaKatamereka */}
            <ApaKataMereka />
            
            
        </div>
    );
};

export default LandingPage;
