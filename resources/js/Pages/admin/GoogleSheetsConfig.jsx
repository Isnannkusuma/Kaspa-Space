import React, { useState, useRef } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Upload, 
    Globe, 
    CheckCircle, 
    XCircle, 
    AlertCircle, 
    Settings, 
    Database, 
    Trash2 
} from 'lucide-react';

export const GoogleSheetsConfig = ({ auth, currentConfig = null, flash }) => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [previewData, setPreviewData] = useState([]);

  const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
    spreadsheet_id: currentConfig?.spreadsheet_id || '',
    sheet_name: currentConfig?.sheet_name || 'Sheet1',
    range: currentConfig?.range || 'A1:H1000',
    api_key: currentConfig?.api_key || '',
    is_active: currentConfig?.is_active || true,
  });

  // Test connection to Google Sheets
  const testConnection = async () => {
    if (!data.spreadsheet_id || !data.api_key) {
      alert('Please enter Spreadsheet ID and API Key');
      return;
    }

    setIsTestingConnection(true);
    setTestResults(null);

    try {
      const response = await fetch('/admin/google-sheets/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
        },
        body: JSON.stringify({
          spreadsheet_id: data.spreadsheet_id,
          sheet_name: data.sheet_name,
          range: data.range,
          api_key: data.api_key
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setTestResults({ success: true, message: 'Connection successful!', data: result.data });
        setPreviewData(result.data || []);
      } else {
        setTestResults({ success: false, message: result.message || 'Connection failed' });
      }
    } catch (error) {
      setTestResults({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setIsTestingConnection(false);
    }
  };

  // Save configuration
  const handleSubmit = () => {
    const endpoint = currentConfig ? '/admin/google-sheets/update' : '/admin/google-sheets/store';
    const method = currentConfig ? put : post;

    method(endpoint, {
      onSuccess: () => {
        setTestResults(null);
        setPreviewData([]);
      }
    });
  };

  // Delete configuration
  const deleteConfig = () => {
    if (confirm('Are you sure you want to delete Google Sheets configuration?')) {
      destroy('/admin/google-sheets/delete', {
        onSuccess: () => {
          reset();
          setTestResults(null);
          setPreviewData([]);
        }
      });
    }
  };

  return (
    <>
      <Head title="Google Sheets Configuration - Admin Dashboard" />
      
      <div className="min-h-screen bg-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Globe className="text-green-600" size={32} />
                  Google Sheets Integration
                </h1>
                <p className="text-gray-600 mt-1">Configure automatic data sync from Google Spreadsheet</p>
              </div>
              
              {currentConfig && (
                <button
                  onClick={deleteConfig}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete Config
                </button>
              )}
            </div>
          </div>

          {/* Flash Messages */}
          {flash?.success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <CheckCircle size={20} />
              {flash.success}
            </div>
          )}

          {flash?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <XCircle size={20} />
              {flash.error}
            </div>
          )}

          {/* Configuration Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings size={24} />
              Configuration Settings
            </h2>
            
            <div className="space-y-6">
              {/* Spreadsheet ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Spreadsheet ID
                </label>
                <input
                  type="text"
                  value={data.spreadsheet_id}
                  onChange={(e) => setData('spreadsheet_id', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                />
                {errors.spreadsheet_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.spreadsheet_id}</p>
                )}
                <p className="text-gray-600 text-sm mt-1">
                  Found in the spreadsheet URL: docs.google.com/spreadsheets/d/<strong>SPREADSHEET_ID</strong>/edit
                </p>
              </div>

              {/* Sheet Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sheet Name
                </label>
                <input
                  type="text"
                  value={data.sheet_name}
                  onChange={(e) => setData('sheet_name', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Sheet1"
                />
                {errors.sheet_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.sheet_name}</p>
                )}
              </div>

              {/* Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Range
                </label>
                <input
                  type="text"
                  value={data.range}
                  onChange={(e) => setData('range', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="A1:H1000"
                />
                {errors.range && (
                  <p className="text-red-500 text-sm mt-1">{errors.range}</p>
                )}
              </div>

              {/* API Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Sheets API Key
                </label>
                <input
                  type="password"
                  value={data.api_key}
                  onChange={(e) => setData('api_key', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="AIzaSyBnNAISIGQROF3QcqOaOsKEAQTAUWOcabc"
                />
                {errors.api_key && (
                  <p className="text-red-500 text-sm mt-1">{errors.api_key}</p>
                )}
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={data.is_active}
                  onChange={(e) => setData('is_active', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                  Enable automatic synchronization
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={testConnection}
                disabled={isTestingConnection}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isTestingConnection ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Testing...
                  </>
                ) : (
                  <>
                    <Database size={16} />
                    Test Connection
                  </>
                )}
              </button>

              <button
                onClick={handleSubmit}
                disabled={processing}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    {currentConfig ? 'Update Configuration' : 'Save Configuration'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Test Results */}
          {testResults && (
            <div className={`rounded-lg p-4 mb-6 ${
              testResults.success 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              <div className="flex items-center gap-2">
                {testResults.success ? <CheckCircle size={20} /> : <XCircle size={20} />}
                <span className="font-medium">{testResults.message}</span>
              </div>
            </div>
          )}

          {/* Preview Data */}
          {previewData.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Data Preview ({previewData.length} records)
              </h3>
              
              <div className="overflow-x-auto">
                <div className="max-h-96 overflow-y-auto border rounded-lg">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Room</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Date</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Type</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Sub Type</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Occupancy</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">INV</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Check-In</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Check-Out</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.slice(0, 20).map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 text-gray-900">{row.room || '-'}</td>
                          <td className="px-4 py-3 text-gray-700">{row.date || '-'}</td>
                          <td className="px-4 py-3 text-gray-700">{row.type || '-'}</td>
                          <td className="px-4 py-3 text-gray-700">{row.subType || '-'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              row.occupancy === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                              row.occupancy === 'FULL' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {row.occupancy || 'N/A'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{row.inv || '-'}</td>
                          <td className="px-4 py-3 text-gray-700">{row.checkIn || '-'}</td>
                          <td className="px-4 py-3 text-gray-700">{row.checkOut || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {previewData.length > 20 && (
                  <div className="p-4 text-center text-gray-600 bg-gray-50">
                    Showing first 20 of {previewData.length} records from Google Sheets
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Google Sheets Setup Instructions</h4>
                <div className="text-blue-700 text-sm space-y-3">
                  <div>
                    <strong>1. Get API Key:</strong>
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li>Go to <a href="https://console.developers.google.com/" className="underline" target="_blank">Google Cloud Console</a></li>
                      <li>Create a new project or select existing</li>
                      <li>Enable Google Sheets API</li>
                      <li>Create credentials (API Key)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <strong>2. Spreadsheet Setup:</strong>
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li>Make sure your spreadsheet is publicly readable (Anyone with link can view)</li>
                      <li>First row should contain headers: ROOM, DATE, TYPE, SUB TYPE, OCCUPANCY, INV, CHECK-IN, CHECK-OUT</li>
                      <li>Copy the Spreadsheet ID from the URL</li>
                    </ul>
                  </div>

                  <div>
                    <strong>3. Column Format:</strong>
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li><strong>ROOM:</strong> Room name (e.g., "Workspace", "Meeting Room")</li>
                      <li><strong>DATE:</strong> Date format (e.g., "24 Sep 2025")</li>
                      <li><strong>TYPE:</strong> Booking type (e.g., "Coworking", "Private Office")</li>
                      <li><strong>SUB TYPE:</strong> Sub category (e.g., "Shared Desk", "Room 1")</li>
                      <li><strong>OCCUPANCY:</strong> Status ("AVAILABLE", "FULL", "NOT AVAILABLE")</li>
                      <li><strong>INV:</strong> Invoice number (optional)</li>
                      <li><strong>CHECK-IN/CHECK-OUT:</strong> Time format (e.g., "8:00AM")</li>
                    </ul>
                  </div>
                  
                  <p className="mt-3 bg-blue-100 p-3 rounded">
                    <strong>Note:</strong> Data will be automatically synchronized from your Google Spreadsheet. 
                    Any changes made to the spreadsheet will reflect on the website within the refresh interval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleSheetsConfig;