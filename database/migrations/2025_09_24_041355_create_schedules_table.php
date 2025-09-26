<?php
// database/migrations/xxxx_xx_xx_create_schedules_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->string('room');
            $table->string('date');
            $table->string('type');
            $table->string('sub_type')->nullable();
            $table->string('occupancy');
            $table->string('inv')->nullable();
            $table->string('check_in')->nullable();
            $table->string('check_out')->nullable();
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['room', 'date']);
            $table->index('occupancy');
        });
    }

    public function down()
    {
        Schema::dropIfExists('schedules');
    }
};