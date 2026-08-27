<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\HomePage */
class HomePageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'stat1Value' => $this->stat1_value,
            'stat1Label' => $this->stat1_label,
            'stat2Value' => $this->stat2_value,
            'stat2Label' => $this->stat2_label,
            'stat3Value' => $this->stat3_value,
            'stat3Label' => $this->stat3_label,
            'stat4Value' => $this->stat4_value,
            'stat4Label' => $this->stat4_label,
            'catalogEyebrow' => $this->catalog_eyebrow,
            'catalogHeading' => $this->catalog_heading,
            'catalogDescription' => $this->catalog_description,
            'catalogCtaText' => $this->catalog_cta_text,
            'testimonialsEyebrow' => $this->testimonials_eyebrow,
            'testimonialsHeading' => $this->testimonials_heading,
            'testimonialsDescription' => $this->testimonials_description,
            'contactBackgroundImageUrl' => $this->contact_background_image_url,
            'heroSecondaryCtaText' => $this->hero_secondary_cta_text,
            'heroSecondaryCtaLink' => $this->hero_secondary_cta_link,
        ];
    }
}
