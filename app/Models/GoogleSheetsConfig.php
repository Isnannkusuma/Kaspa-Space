<?php
// app/Models/GoogleSheetsConfig.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoogleSheetsConfig extends Model
{
    protected $fillable = [
        'spreadsheet_id',
        'sheet_name', 
        'range',
        'api_key',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'last_synced' => 'datetime'
    ];
}