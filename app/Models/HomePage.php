<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomePage extends Model
{
    protected $table = 'home_page';

    public $incrementing = false;

    protected $keyType = 'int';

    const CREATED_AT = null;

    protected $fillable = [
        'id',
        'stat1_value',
        'stat1_label',
        'stat2_value',
        'stat2_label',
        'stat3_value',
        'stat3_label',
        'stat4_value',
        'stat4_label',
        'catalog_eyebrow',
        'catalog_heading',
        'catalog_description',
        'catalog_cta_text',
        'testimonials_eyebrow',
        'testimonials_heading',
        'testimonials_description',
        'contact_background_image_url',
        'hero_secondary_cta_text',
        'hero_secondary_cta_link',
    ];
}
