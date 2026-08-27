<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'banners';

    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'title',
        'subtitle',
        'button_text',
        'image_url',
        'frame_image_url',
        'overlay_image_url',
        'overlay_badge_text',
        'badge_text',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
