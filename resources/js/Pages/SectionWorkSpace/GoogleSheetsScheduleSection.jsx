import React, { useState, useEffect, useRef } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { 
  Eye, Calendar, Clock, Users, MapPin, RefreshCw, Wifi, WifiOff, 
  Link, CheckCircle, XCircle, AlertCircle, Settings, ExternalLink,
  Globe, Database, Trash2
} from 'lucide-react';

// Frontend Component (Public View)
const GoogleSheetsScheduleSection = ({ 
  initialData = [], 
  isAdmin = false, 
  apiEndpoint = '/api/schedule-data',
  googleSheetsConfig = null 
}) => {
  const [scheduleData, setScheduleData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('OKUPANSI');
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const [lastModified, setLastModified] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const intervalRef = useRef(null);

  // Sample data sebagai fallback
  const sampleScheduleData = [
    {
      room: 'Workspace',
      date: '24 Sep 2025',
      type: 'Coworking',
      subType: 'Shared Desk',
      occupancy: 'AVAILABLE',
      inv: '',
      checkIn: '',
      checkOut: ''
    },
    {
      room: 'Workspace',
      date: '26 Sep 2025',
      type: 'Coworking',
      subType: 'Private Working Space',
      occupancy: 'FULL',
      inv: '1558',
      checkIn: '8:00AM',
      checkOut: '5:00PM'
    },
    {
      room: 'Meeting Room',
      date: '24 Sep 2025',
      type: 'Coworking',
      subType: 'Meeting Room',
      occupancy: 'AVAILABLE',
      inv: '',
      checkIn: '',
      checkOut: ''
    }
  ];

  const [currentData, setCurrentData] = useState(
    scheduleData.length > 0 ? scheduleData : sampleScheduleData
  );

  // Auto-refresh functionality
  useEffect(() => {
    if (isAutoRefresh && !isAdmin) {
      intervalRef.current = setInterval(() => {
        fetchLatestData();
      }, refreshInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoRefresh, refreshInterval, isAdmin]);

  // Fetch latest data from Google Sheets via Laravel API
  const fetchLatestData = async () => {
    try {
      const response = await fetch(apiEndpoint);
      if (response.ok) {
        const data = await response.json();
        
        // Check if data has changed
        const dataChanged = JSON.stringify(data.scheduleData) !== JSON.stringify(currentData);
        
        if (dataChanged) {
          setCurrentData(data.scheduleData);
          setScheduleData(data.scheduleData);
          setLastModified(new Date());
          setIsConnected(true);
          showUpdateNotification();
        }
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsConnected(false);
    }
  };

  // Show update notification
  const showUpdateNotification = () => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse';
    notification.textContent = 'Data updated from Google Sheets!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  // Manual refresh function
  const handleManualRefresh = async () => {
    setIsLoading(true);
    await fetchLatestData();
    setIsLoading(false);
  };

  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    setIsAutoRefresh(!isAutoRefresh);
  };

  // Function to get occupancy badge style
  const getOccupancyBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'AVAILABLE':
        return 'bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold';
      case 'FULL':
        return 'bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold';
      case 'NOT AVAILABLE':
        return 'bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold';
      default:
        return 'bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-12">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full mb-6">
            <Calendar size={24} />
            <h1 className="text-2xl font-bold">Jadwal Sewa Ruangan</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lihat ketersediaan ruangan dan jadwal pemesanan secara real-time dari Google Spreadsheet
          </p>
          
          {/* Google Sheets Integration Status */}
          {googleSheetsConfig && (
            <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
              <Globe size={16} />
              Connected to Google Sheets
              <ExternalLink size={14} />
            </div>
          )}
        </div>

        {/* Real-time Controls - Only for frontend users */}
        {!isAdmin && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <RefreshCw className="text-blue-600" size={24} />
                Real-Time Google Sheets Monitoring
              </h2>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleAutoRefresh}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isAutoRefresh
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
                    {isAutoRefresh ? 'Auto-Sync ON' : 'Auto-Sync OFF'}
                  </button>
                  
                  <button
                    onClick={handleManualRefresh}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
                    disabled={isLoading}
                  >
                    <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                    Sync Now
                  </button>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Sync every:</span>
                    <select
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value={5000}>5s</option>
                      <option value={10000}>10s</option>
                      <option value={30000}>30s</option>
                      <option value={60000}>1m</option>
                      <option value={300000}>5m</option>
                    </select>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  {lastModified && (
                    <span>Last synced: {lastModified.toLocaleTimeString()}</span>
                  )}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-3 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {isConnected ? 'Connected to Google Sheets' : 'Connection error - Check spreadsheet access'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <Eye size={20} />
                Front Desk Panel - {selectedLocation}
              </h3>
              <div className="flex items-center gap-4">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-white/20 text-white border border-white/30 rounded px-3 py-1 text-sm"
                >
                  <option value="OKUPANSI">OKUPANSI</option>
                  <option value="LOCATION A">LOCATION A</option>
                  <option value="LOCATION B">LOCATION B</option>
                </select>
                <div className="text-white/80 text-sm flex items-center gap-2">
                  <span>Total: {currentData.length} entries</span>
                  {isAutoRefresh && !isAdmin && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs">Live</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">ROOM</th>
                  <th className="px-4 py-3 text-left font-semibold">DATE</th>
                  <th className="px-4 py-3 text-left font-semibold">TYPE</th>
                  <th className="px-4 py-3 text-left font-semibold">SUB TYPE</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <Users size={16} />
                      OCCUPANCY
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">INV</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <Clock size={16} />
                      CHECK-IN
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <Clock size={16} />
                      CHECK-OUT
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`${index % 2 === 0 ? 'bg-blue-50/30' : 'bg-white'} hover:bg-blue-100/50 transition-colors duration-200`}
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">{row.room || '-'}</td>
                    <td className="px-4 py-3 text-gray-700">{row.date || '-'}</td>
                    <td className="px-4 py-3 text-gray-700">{row.type || '-'}</td>
                    <td className="px-4 py-3 text-gray-700">{row.subType || '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={getOccupancyBadge(row.occupancy)}>
                        {row.occupancy || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">{row.inv || '-'}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{row.checkIn || '-'}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{row.checkOut || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-100 px-6 py-3 border-t">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Menampilkan {currentData.length} data dari Google Sheets</span>
              <div className="flex items-center gap-2">
                <Globe size={14} />
                <span>{selectedLocation}</span>
                {!isAdmin && isAutoRefresh && (
                  <span className="text-green-600 font-medium">• Live Sync Active</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Procedure Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Prosedur Pemesanan Ruang</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm flex-shrink-0 mt-0.5">
                1
              </div>
              <div className="text-gray-700">
                <p className="mb-2">Lihat ketersediaan ruang untuk mencegah pembatalan pesanan:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-600">
                  <li>Jika <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-medium">"available"</span> artinya ruangan tersedia,</li>
                  <li>Jika <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-medium">"full"</span> artinya ruangan penuh,</li>
                  <li>Jika <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-medium">"not available"</span> artinya ruangan tidak tersedia,</li>
                  <li>Data diperbarui secara otomatis dari Google Spreadsheet yang dikelola admin.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm flex-shrink-0 mt-0.5">
                2
              </div>
              <p className="text-gray-700">
                Kami merekomendasikan Anda untuk memastikan ulang ketersediaan ruang kepada resepsionis lewat WhatsApp.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm flex-shrink-0 mt-0.5">
                3
              </div>
              <p className="text-gray-700">
                Jika ruangan yang dicari tersedia Anda dapat melakukan pemesanan online mandiri atau meminta bantuan resepsionis.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="text-center">
              <h4 className="font-semibold text-slate-800 mb-2">Butuh Bantuan?</h4>
              <p className="text-gray-600 mb-4">Hubungi resepsionis kami untuk bantuan pemesanan</p>
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium">
                WhatsApp Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component untuk Google Sheets Configuration


export default GoogleSheetsScheduleSection;