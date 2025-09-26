import React, { useState, useRef } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Upload, FileSpreadsheet, CheckCircle, XCircle, AlertCircle, Eye, Trash2 } from 'lucide-react';

const AdminScheduleDashboard = ({ auth, schedules = [], flash }) => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        excel_file: null,
        schedule_data: []
    });

    // Process Excel file
    const processExcelFile = async (file) => {
        setIsProcessing(true);
        
        const reader = new FileReader();
        
        return new Promise((resolve, reject) => {
            reader.onload = async (e) => {
                try {
                    // Dynamic import to avoid bundle size issues
                    const XLSX = await import('xlsx');
                    
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    
                    // Transform data to match Laravel model structure
                    const transformedData = jsonData.map((row, index) => ({
                        id: index + 1,
                        room: row['ROOM'] || row['Room'] || '',
                        date: row['DATE'] || row['Date'] || '',
                        type: row['TYPE'] || row['Type'] || '',
                        sub_type: row['SUB TYPE'] || row['Sub Type'] || row['subType'] || '',
                        occupancy: row['OCCUPANCY'] || row['Occupancy'] || '',
                        inv: row['INV'] || row['Inv'] || '',
                        check_in: row['CHECK-IN'] || row['Check In'] || row['checkIn'] || '',
                        check_out: row['CHECK-OUT'] || row['Check Out'] || row['checkOut'] || ''
                    }));
                    
                    setPreviewData(transformedData);
                    setData('schedule_data', transformedData);
                    setShowPreview(true);
                    setIsProcessing(false);
                    resolve(transformedData);
                } catch (error) {
                    console.error('Error processing Excel file:', error);
                    setIsProcessing(false);
                    reject(error);
                }
            };
            
            reader.onerror = () => {
                setIsProcessing(false);
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsArrayBuffer(file);
        });
    };

    // Handle file selection
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel'
        ];
        
        if (!allowedTypes.includes(file.type)) {
            alert('Please select a valid Excel file (.xlsx or .xls)');
            return;
        }

        setUploadedFile(file);
        setData('excel_file', file);
        
        try {
            await processExcelFile(file);
        } catch (error) {
            alert('Error processing file. Please check the format and try again.');
            console.error(error);
        }
    };

    // Submit data to Laravel backend
    const handleSubmit = () => {
        if (!previewData.length) {
            alert('Please upload and process an Excel file first');
            return;
        }

        post('/admin/schedule/upload', {
            onSuccess: () => {
                reset();
                setUploadedFile(null);
                setPreviewData([]);
                setShowPreview(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
            onError: (errors) => {
                console.error('Upload errors:', errors);
            }
        });
    };

    // Clear current schedules
    const clearSchedules = () => {
        if (confirm('Are you sure you want to delete all current schedule data?')) {
            router.delete('/admin/schedule/clear', {
                onSuccess: () => {
                    // Success handled by flash message
                }
            });
        }
    };

    // View current data
    const viewCurrentData = () => {
        router.get('/admin/schedule/view');
    };

    return (
        <>
            <Head title="Schedule Management - Admin Dashboard" />
            
            <div className="min-h-screen bg-gray-100 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                    <FileSpreadsheet className="text-blue-600" size={32} />
                                    Schedule Management
                                </h1>
                                <p className="text-gray-600 mt-1">Upload and manage room scheduling data</p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={viewCurrentData}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                                >
                                    <Eye size={16} />
                                    View Current Data ({schedules.length})
                                </button>
                                
                                {schedules.length > 0 && (
                                    <button
                                        onClick={clearSchedules}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <Trash2 size={16} />
                                        Clear All Data
                                    </button>
                                )}
                            </div>
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

                    {/* Upload Form */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Excel File</h2>
                        
                        <div>
                            {/* File Upload Area */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center hover:border-blue-400 transition-colors duration-200">
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="excel-upload"
                                    ref={fileInputRef}
                                />
                                
                                <div className="space-y-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                        <Upload className="text-blue-600" size={32} />
                                    </div>
                                    
                                    <div>
                                        <label
                                            htmlFor="excel-upload"
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer inline-flex items-center gap-2 font-medium"
                                        >
                                            <Upload size={20} />
                                            Choose Excel File
                                        </label>
                                        <p className="text-gray-500 mt-2 text-sm">
                                            Upload .xlsx or .xls file with schedule data
                                        </p>
                                        
                                        {errors.excel_file && (
                                            <p className="text-red-500 text-sm mt-2">{errors.excel_file}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* File Info */}
                            {uploadedFile && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">📄 {uploadedFile.name}</p>
                                            <p className="text-sm text-gray-600">
                                                Size: {(uploadedFile.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                        
                                        {isProcessing ? (
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                Processing...
                                            </div>
                                        ) : previewData.length > 0 ? (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <CheckCircle size={16} />
                                                {previewData.length} records processed
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            {previewData.length > 0 && (
                                <div className="flex justify-center">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={processing}
                                        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={16} />
                                                Upload to Database ({previewData.length} records)
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Preview Data */}
                    {showPreview && previewData.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Data Preview ({previewData.length} records)
                                </h3>
                                
                                <button
                                    onClick={() => setShowPreview(!showPreview)}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                                </button>
                            </div>
                            
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
                                            {previewData.slice(0, 50).map((row, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-4 py-3 text-gray-900">{row.room}</td>
                                                    <td className="px-4 py-3 text-gray-700">{row.date}</td>
                                                    <td className="px-4 py-3 text-gray-700">{row.type}</td>
                                                    <td className="px-4 py-3 text-gray-700">{row.sub_type}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            row.occupancy === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                                                            row.occupancy === 'FULL' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {row.occupancy}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">{row.inv}</td>
                                                    <td className="px-4 py-3 text-gray-700">{row.check_in}</td>
                                                    <td className="px-4 py-3 text-gray-700">{row.check_out}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {previewData.length > 50 && (
                                    <div className="p-4 text-center text-gray-600 bg-gray-50">
                                        Showing first 50 of {previewData.length} records. All records will be uploaded.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
                            <div>
                                <h4 className="font-semibold text-yellow-800 mb-2">Excel File Format Instructions</h4>
                                <div className="text-yellow-700 text-sm space-y-2">
                                    <p>Make sure your Excel file has the following columns (case-insensitive):</p>
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        <li><strong>ROOM</strong> - Room name (e.g., "Workspace", "Meeting Room")</li>
                                        <li><strong>DATE</strong> - Date (e.g., "24 Sep 2025")</li>
                                        <li><strong>TYPE</strong> - Type of booking (e.g., "Coworking", "Private Office")</li>
                                        <li><strong>SUB TYPE</strong> - Sub type (e.g., "Shared Desk", "Room 1")</li>
                                        <li><strong>OCCUPANCY</strong> - Status ("AVAILABLE", "FULL", "NOT AVAILABLE")</li>
                                        <li><strong>INV</strong> - Invoice number (optional)</li>
                                        <li><strong>CHECK-IN</strong> - Check-in time (optional)</li>
                                        <li><strong>CHECK-OUT</strong> - Check-out time (optional)</li>
                                    </ul>
                                    <p className="mt-3"><strong>Note:</strong> Uploading new data will replace all existing schedule data.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminScheduleDashboard;