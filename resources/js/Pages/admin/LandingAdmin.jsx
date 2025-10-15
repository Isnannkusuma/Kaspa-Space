import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  HomeIcon,
  ShoppingBagIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  PuzzlePieceIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const AdminLayout = ({ children, title = 'Dashboard Admin' }) => {
  const { url } = usePage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(url.startsWith('/admin/products') || url.startsWith('/admin/categories'));

  const navigation = [
    {
      name: 'Ringkasan',
      href: '/admin',
      icon: HomeIcon,
      current: url === '/admin'
    },
    {
      name: 'Pesanan',
      href: '/admin/orders/payments',
      icon: ClipboardDocumentListIcon,
      current: url.startsWith('/admin/orders/payments') || url.startsWith('/admin/orders/payment')
    },
    {
      name: 'Produk',
      icon: ShoppingBagIcon,
      current: url.startsWith('/admin/products') || url.startsWith('/admin/categories'),
      children: [
        {
          name: 'Kategori',
          href: '/admin/categories',
          current: url.startsWith('/admin/categories')
        },
        {
          name: 'Ulasan produk',
          href: '/admin/products',
          current: url.startsWith('/admin/products')
        }
      ]
    },
    {
      name: 'Reservasi',
      href: '/admin/reservations',
      icon: ClipboardDocumentListIcon,
      current: url.startsWith('/admin/reservations')
    },
    {
      name: 'Diskon',
      href: '/admin/discounts',
      icon: TagIcon,
      current: url.startsWith('/admin/discounts')
    },
    {
      name: 'Statistik',
      href: '/admin/statistics',
      icon: ChartBarIcon,
      current: url.startsWith('/admin/statistics')
    },
    {
      name: 'Integrasi',
      href: '/admin/integrations',
      icon: PuzzlePieceIcon,
      current: url.startsWith('/admin/integrations')
    },
    {
      name: 'Pengaturan',
      href: '/admin/settings',
      icon: CogIcon,
      current: url.startsWith('/admin/settings')
    }
  ];

  const footerLinks = [
    {
      name: 'Saran',
      href: '/admin/suggestions',
      icon: null
    },
    {
      name: 'Bantuan dan informasi',
      href: '/admin/help',
      icon: null
    }
  ];

  const handleProductsToggle = () => {
    setProductsMenuOpen(!productsMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          {/* Store selector */}
          <div className="flex items-center flex-shrink-0 px-4">
            <select className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
              <option>Pengelola toko</option>
            </select>
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={item.name === 'Produk' ? handleProductsToggle : undefined}
                      className={`group w-full flex items-center justify-between pl-2 pr-1 py-2 text-sm font-medium rounded-md transition-colors ${
                        item.current
                          ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`mr-3 flex-shrink-0 h-5 w-5 ${
                            item.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                        />
                        {item.name}
                      </div>
                      {item.name === 'Produk' && (
                        productsMenuOpen ? (
                          <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                        )
                      )}
                    </button>
                    {item.name === 'Produk' && productsMenuOpen && (
                      <div className="mt-1 space-y-1">
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium rounded-md transition-colors ${
                              subItem.current
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.current
                        ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        item.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Footer links */}
          <div className="flex-shrink-0 px-2 space-y-1 border-t border-gray-200 pt-4">
            {footerLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            {/* Mobile navigation content - same as desktop */}
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <select className="block w-full text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Pengelola toko</option>
                </select>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={item.name === 'Produk' ? handleProductsToggle : undefined}
                          className={`group w-full flex items-center justify-between pl-2 pr-1 py-2 text-sm font-medium rounded-md transition-colors ${
                            item.current
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <div className="flex items-center">
                            <item.icon className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400" />
                            {item.name}
                          </div>
                          {item.name === 'Produk' && (
                            productsMenuOpen ? (
                              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                            ) : (
                              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                            )
                          )}
                        </button>
                        {item.name === 'Produk' && productsMenuOpen && (
                          <div className="mt-1 space-y-1">
                            {item.children.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium rounded-md transition-colors ${
                                  subItem.current
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                          item.current
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400" />
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top bar for mobile */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;