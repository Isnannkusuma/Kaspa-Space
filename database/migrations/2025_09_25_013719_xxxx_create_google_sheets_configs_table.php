<?php
// database/migrations/xxxx_create_google_sheets_configs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('google_sheets_configs', function (Blueprint $table) {
            $table->id();
            $table->string('spreadsheet_id');
            $table->string('sheet_name')->default('Sheet1');
            $table->string('range')->default('A1:H1000');
            $table->text('api_key');
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_synced')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('google_sheets_configs');
    }
};