<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\CatalogPageResource;
use App\Models\CatalogPage;
use App\Support\CamelCaseMapper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CatalogPageController extends Controller
{
    public function show(): JsonResponse
    {
        $page = CatalogPage::query()->find(1);
        if (! $page) {
            throw new AppException(404, 'Contenido de catálogo no encontrado');
        }

        return response()->json(new CatalogPageResource($page));
    }

    public function update(Request $request): JsonResponse
    {
        $page = CatalogPage::query()->find(1);
        if (! $page) {
            throw new AppException(404, 'Contenido de catálogo no encontrado');
        }

        $data = CamelCaseMapper::extract($request->all(), [
            'eyebrow' => 'eyebrow',
            'heading' => 'heading',
            'description' => 'description',
        ]);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $page->update($data);

        return response()->json(new CatalogPageResource($page->fresh()));
    }
}
