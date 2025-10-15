<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PaymentSettingsController extends Controller
{
    /**
     * Halaman pengaturan pembayaran
     */
    public function index()
    {
        $settings = PaymentSetting::first();
        
        if (!$settings) {
            $settings = PaymentSetting::create([
                'bank_name' => 'Bank BCA',
                'account_number' => '1234567890',
                'account_name' => 'PT Toko Kita',
            ]);
        }
        
        return Inertia::render('Admin/Orders/PaymentSettings', [
            'settings' => [
                'qris_image' => $settings->qris_image ? Storage::url($settings->qris_image) : null,
                'bank_name' => $settings->bank_name,
                'account_number' => $settings->account_number,
                'account_name' => $settings->account_name,
            ]
        ]);
    }

    /**
     * Update QR Code QRIS
     */
    public function updateQris(Request $request)
    {
        $request->validate([
            'qris_image' => 'required|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        try {
            $settings = PaymentSetting::first();
            
            if (!$settings) {
                $settings = PaymentSetting::create([]);
            }

            // Hapus gambar lama jika ada
            if ($settings->qris_image) {
                Storage::disk('public')->delete($settings->qris_image);
            }

            // Upload gambar baru
            $path = $request->file('qris_image')->store('qris', 'public');
            
            $settings->update(['qris_image' => $path]);

            return back()->with('success', 'QR Code QRIS berhasil diupdate');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal mengupload QR Code: ' . $e->getMessage()]);
        }
    }

    /**
     * Update pengaturan bank
     */
    public function updateBank(Request $request)
    {
        $validated = $request->validate([
            'bank_name' => 'required|string|max:100',
            'account_number' => 'required|string|max:50',
            'account_name' => 'required|string|max:100',
        ]);

        try {
            $settings = PaymentSetting::first();
            
            if (!$settings) {
                $settings = PaymentSetting::create($validated);
            } else {
                $settings->update($validated);
            }

            return back()->with('success', 'Pengaturan bank berhasil diupdate');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menyimpan pengaturan: ' . $e->getMessage()]);
        }
    }
}