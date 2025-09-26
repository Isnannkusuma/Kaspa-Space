<?php
// app/Http/Controllers/Admin/GoogleSheetsController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GoogleSheetsConfig;
use App\Services\GoogleSheetsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoogleSheetsController extends Controller
{
    protected $googleSheetsService;

    public function __construct(GoogleSheetsService $googleSheetsService)
    {
        $this->googleSheetsService = $googleSheetsService;
    }

    public function index()
    {
        $config = GoogleSheetsConfig::first();
        
        return Inertia::render('Admin/GoogleSheetsConfig', [
            'currentConfig' => $config,
            'auth' => auth()->user()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'spreadsheet_id' => 'required|string',
            'sheet_name' => 'required|string',
            'range' => 'required|string',
            'api_key' => 'required|string',
            'is_active' => 'boolean'
        ]);

        GoogleSheetsConfig::create($request->all());

        return redirect()->back()->with('success', 'Google Sheets configuration saved successfully!');
    }

    public function update(Request $request)
    {
        $request->validate([
            'spreadsheet_id' => 'required|string',
            'sheet_name' => 'required|string', 
            'range' => 'required|string',
            'api_key' => 'required|string',
            'is_active' => 'boolean'
        ]);

        $config = GoogleSheetsConfig::first();
        $config->update($request->all());

        return redirect()->back()->with('success', 'Configuration updated successfully!');
    }

    public function test(Request $request)
    {
        $result = $this->googleSheetsService->testConnection(
            $request->spreadsheet_id,
            $request->sheet_name,
            $request->range,
            $request->api_key
        );

        return response()->json($result);
    }

    public function sync()
    {
        $result = $this->googleSheetsService->syncData();
        
        if ($result['success']) {
            return redirect()->back()->with('success', $result['message']);
        } else {
            return redirect()->back()->with('error', $result['message']);
        }
    }

    public function delete()
    {
        GoogleSheetsConfig::truncate();
        
        return redirect()->back()->with('success', 'Google Sheets configuration deleted successfully!');
    }
}