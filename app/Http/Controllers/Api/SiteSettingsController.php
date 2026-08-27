<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\SiteSettingsResource;
use App\Models\SiteSetting;
use App\Support\CamelCaseMapper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SiteSettingsController extends Controller
{
    private const NULLABLE_STRINGS = [
        'site_name',
        'site_tagline',
        'footer_tagline',
        'footer_legal_text',
        'footer_ruc',
        'logo_url',
        'favicon_url',
    ];

    public function show(): JsonResponse
    {
        $settings = SiteSetting::query()->find(1);
        if (! $settings) {
            throw new AppException(404, 'Configuración del sitio no encontrada');
        }

        return response()->json(new SiteSettingsResource($settings));
    }

    public function update(Request $request): JsonResponse
    {
        $settings = SiteSetting::query()->find(1);
        if (! $settings) {
            throw new AppException(404, 'Configuración del sitio no encontrada');
        }

        $data = CamelCaseMapper::extract($request->all(), [
            'logoUrl' => 'logo_url',
            'faviconUrl' => 'favicon_url',
            'siteName' => 'site_name',
            'siteTagline' => 'site_tagline',
            'browserTitle' => 'browser_title',
            'footerTagline' => 'footer_tagline',
            'footerDescription' => 'footer_description',
            'footerLegalText' => 'footer_legal_text',
            'footerRuc' => 'footer_ruc',
        ]);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        foreach (self::NULLABLE_STRINGS as $field) {
            if (array_key_exists($field, $data) && (is_string($data[$field]) && trim($data[$field]) === '')) {
                $data[$field] = null;
            }
        }

        $settings->update($data);

        return response()->json(new SiteSettingsResource($settings->fresh()));
    }
}
