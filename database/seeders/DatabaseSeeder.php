<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed user default (admin/test user)
        User::updateOrCreate(
            ['email' => 'test@example.com'], // cek berdasarkan email
            [
                'name' => 'Test User',
                'password' => bcrypt('password'), // password default
            ]
        );

        // Panggil seeder lain
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
    }
}
