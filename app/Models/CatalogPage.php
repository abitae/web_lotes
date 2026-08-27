<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CatalogPage extends Model
{
    protected $table = 'catalog_page';

    public $incrementing = false;

    protected $keyType = 'int';

    const CREATED_AT = null;

    protected $fillable = [
        'id',
        'eyebrow',
        'heading',
        'description',
    ];
}
