<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\HomePageResource;
use App\Models\HomePage;
use App\Support\CamelCaseMapper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    public function show(): JsonResponse
    {
        $page = HomePage::query()->find(1);
        if (! $page) {
            throw new AppException(404, 'Contenido de inicio no encontrado');
        }

        return response()->json(new HomePageResource($page));
    }

    public function update(Request $request): JsonResponse
    {
        $page = HomePage::query()->find(1);
        if (! $page) {
            throw new AppException(404, 'Contenido de inicio no encontrado');
        }

        $data = CamelCaseMapper::extract($request->all(), [
            'stat1Value' => 'stat1_value',
            'stat1Label' => 'stat1_label',
            'stat2Value' => 'stat2_value',
            'stat2Label' => 'stat2_label',
            'stat3Value' => 'stat3_value',
            'stat3Label' => 'stat3_label',
            'stat4Value' => 'stat4_value',
            'stat4Label' => 'stat4_label',
            'catalogEyebrow' => 'catalog_eyebrow',
            'catalogHeading' => 'catalog_heading',
            'catalogDescription' => 'catalog_description',
            'catalogCtaText' => 'catalog_cta_text',
            'testimonialsEyebrow' => 'testimonials_eyebrow',
            'testimonialsHeading' => 'testimonials_heading',
            'testimonialsDescription' => 'testimonials_description',
            'contactBackgroundImageUrl' => 'contact_background_image_url',
            'heroSecondaryCtaText' => 'hero_secondary_cta_text',
            'heroSecondaryCtaLink' => 'hero_secondary_cta_link',
        ]);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        if (array_key_exists('contact_background_image_url', $data)) {
            $value = $data['contact_background_image_url'];
            $data['contact_background_image_url'] = (is_string($value) && trim($value) !== '')
                ? trim($value)
                : null;
        }

        $page->update($data);

        return response()->json(new HomePageResource($page->fresh()));
    }
}
