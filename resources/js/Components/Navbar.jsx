import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown, Menu, X, ShoppingBag } from 'lucide-react';
import Logo from '../../images/logo.png';
import WorkspaceSection from '@/Pages/WorkSpaceSection';
 

const Navbar = () => {
  
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  
  return (
  <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-12 w-auto"
                src= {Logo}
                alt="Kaspa Space Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/" 
                className="text-gray-900 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              
              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="text-gray-900 hover:text-blue-500 px-3 py-2 text-sm font-medium flex items-center transition-colors duration-200"
                >
                  Products
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <Link 
                        href={route('workspace.section')} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200"
                      >
                        Coworking Space
                      </Link>
                      <Link 
                        href={route('jasa.profesional.section')} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200"
                      >
                        Jasa Profesional
                      </Link>
                      <Link 
                        href="/products/product-3" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200"
                      >
                        Kasper AI
                      </Link>
                      <Link 
                        href="/products/product-1" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200"
                      >
                        Microsoft Key
                      </Link>
                      <Link 
                        href="/products/product-2" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200"
                      >
                        Open Library
                      </Link>
                      <Link 
                        href={route('food.beverage')} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200"
                      >
                        Food & Beverage
                      </Link>
                      <Link 
                        href="../admin/ScheduleManagement" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200"
                      >
                        Dashboard
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <Link 
                href="/media" 
                className="text-gray-900 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Media
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-900 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center">
              <img src="/images/flag-id.png" alt="ID" className="w-6 h-4 rounded-sm mr-2 object-cover" />
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
            
            {/* Shopping Cart */}
            <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
              <ShoppingBag className="h-5 w-5" />
            </button>
            
            {/* AI App Button */}
            <Link 
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Login/Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link 
                href="/" 
                className="text-gray-900 hover:text-blue-500 block px-3 py-2 text-base font-medium transition-colors duration-200"
              >
                Home
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="text-gray-900 hover:text-blue-500 block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    Products
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                {isProductsOpen && (
                  <div className="pl-6 space-y-1">
                    <Link 
                      href="/products/product-1" 
                      className="text-gray-600 hover:text-blue-500 block px-3 py-2 text-sm transition-colors duration-200"
                    >
                      Product 1
                    </Link>
                    <Link 
                      href="/products/product-2" 
                      className="text-gray-600 hover:text-blue-500 block px-3 py-2 text-sm transition-colors duration-200"
                    >
                      Product 2
                    </Link>
                    <Link 
                      href="/products/product-3" 
                      className="text-gray-600 hover:text-blue-500 block px-3 py-2 text-sm transition-colors duration-200"
                    >
                      Product 3
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                href="/media" 
                className="text-gray-900 hover:text-blue-500 block px-3 py-2 text-base font-medium transition-colors duration-200"
              >
                Media
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-900 hover:text-blue-500 block px-3 py-2 text-base font-medium transition-colors duration-200"
              >
                Contact
              </Link>
              
              {/* Mobile right side items */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center">
                    <img src="/images/flag-id.png" alt="ID" className="w-6 h-4 rounded-sm mr-2 object-cover" />
                    <span className="text-sm text-gray-700">Language</span>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    <ShoppingBag className="h-5 w-5" />
                  </button>
                </div>
                <div className="px-3 py-2">
                  <Link 
                    href="/ai-app"
                    className="block text-center w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    AI App
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay untuk menutup dropdown ketika klik di luar */}
      {isProductsOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProductsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;