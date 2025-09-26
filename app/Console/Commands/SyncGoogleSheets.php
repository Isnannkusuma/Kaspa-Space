<?php
// app/Console/Commands/SyncGoogleSheets.php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\GoogleSheetsService;

class SyncGoogleSheets extends Command
{
    protected $signature = 'sheets:sync';
    protected $description = 'Sync data from Google Sheets';

    public function handle(GoogleSheetsService $service)
    {
        $result = $service->syncData();
        
        if ($result['success']) {
            $this->info($result['message']);
        } else {
            $this->error($result['message']);
        }
    }
}