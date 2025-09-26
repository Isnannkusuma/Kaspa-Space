<?php
// app/Services/GoogleSheetsService.php

namespace App\Services;

use Google\Client;
use Google\Service\Sheets;
use App\Models\GoogleSheetsConfig;
use App\Models\Schedule;
use Illuminate\Support\Facades\Log;

class GoogleSheetsService
{
    protected $client;
    protected $service;

    public function __construct()
    {
        $this->client = new Client();
        $this->client->setApplicationName('Kaspa Space Schedule');
    }

    public function testConnection($spreadsheetId, $sheetName, $range, $apiKey)
    {
        try {
            $this->client->setDeveloperKey($apiKey);
            $this->service = new Sheets($this->client);
            
            $response = $this->service->spreadsheets_values->get($spreadsheetId, $sheetName . '!' . $range);
            $values = $response->getValues();
            
            if (empty($values)) {
                return ['success' => false, 'message' => 'No data found in spreadsheet'];
            }

            // Transform data
            $transformedData = $this->transformSheetData($values);
            
            return [
                'success' => true, 
                'message' => 'Connection successful!',
                'data' => $transformedData
            ];
            
        } catch (\Exception $e) {
            Log::error('Google Sheets connection error: ' . $e->getMessage());
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function syncData()
    {
        $config = GoogleSheetsConfig::where('is_active', true)->first();
        
        if (!$config) {
            return ['success' => false, 'message' => 'No active Google Sheets configuration'];
        }

        try {
            $this->client->setDeveloperKey($config->api_key);
            $this->service = new Sheets($this->client);
            
            $response = $this->service->spreadsheets_values->get(
                $config->spreadsheet_id, 
                $config->sheet_name . '!' . $config->range
            );
            
            $values = $response->getValues();
            
            if (empty($values)) {
                return ['success' => false, 'message' => 'No data found'];
            }

            // Transform and save data
            $transformedData = $this->transformSheetData($values);
            $this->saveToDatabase($transformedData);
            
            // Update last synced time
            $config->update(['last_synced' => now()]);
            
            return [
                'success' => true, 
                'message' => 'Data synced successfully',
                'count' => count($transformedData)
            ];
            
        } catch (\Exception $e) {
            Log::error('Google Sheets sync error: ' . $e->getMessage());
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    private function transformSheetData($values)
    {
        if (empty($values)) return [];
        
        $headers = array_shift($values); // Remove header row
        $transformedData = [];
        
        foreach ($values as $row) {
            // Pad row to match header count
            $row = array_pad($row, count($headers), '');
            
            $item = [];
            foreach ($headers as $index => $header) {
                $key = $this->mapHeaderToKey($header);
                $item[$key] = $row[$index] ?? '';
            }
            
            // Only add rows with room data
            if (!empty($item['room'])) {
                $transformedData[] = $item;
            }
        }
        
        return $transformedData;
    }

    private function mapHeaderToKey($header)
    {
        $header = strtoupper(trim($header));
        
        switch ($header) {
            case 'ROOM':
                return 'room';
            case 'DATE':
                return 'date';
            case 'TYPE':
                return 'type';
            case 'SUB TYPE':
            case 'SUBTYPE':
                return 'subType';
            case 'OCCUPANCY':
                return 'occupancy';
            case 'INV':
                return 'inv';
            case 'CHECK-IN':
            case 'CHECKIN':
                return 'checkIn';
            case 'CHECK-OUT':
            case 'CHECKOUT':
                return 'checkOut';
            default:
                return strtolower($header);
        }
    }

    private function saveToDatabase($data)
    {
        // Clear existing data
        Schedule::truncate();
        
        // Insert new data
        $scheduleData = collect($data)->map(function ($item) {
            return [
                'room' => $item['room'],
                'date' => $item['date'],
                'type' => $item['type'],
                'sub_type' => $item['subType'] ?? '',
                'occupancy' => $item['occupancy'],
                'inv' => $item['inv'] ?? '',
                'check_in' => $item['checkIn'] ?? '',
                'check_out' => $item['checkOut'] ?? '',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        });

        // Insert in chunks
        $scheduleData->chunk(500)->each(function ($chunk) {
            Schedule::insert($chunk->toArray());
        });
    }
}