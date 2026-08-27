<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /** @var list<array{table: string, columns: list<string>}> */
    private const URL_COLUMNS = [
        ['table' => 'banners', 'columns' => ['image_url', 'frame_image_url', 'overlay_image_url']],
        ['table' => 'testimonials', 'columns' => ['avatar_url']],
        ['table' => 'site_settings', 'columns' => ['logo_url', 'favicon_url']],
        ['table' => 'guarantee_section', 'columns' => ['background_image_url']],
        ['table' => 'about_page', 'columns' => ['hero_background_image_url']],
        ['table' => 'home_alert_modal', 'columns' => ['image_url', 'video_url']],
        ['table' => 'expert_advisors', 'columns' => ['image_url']],
        ['table' => 'home_page', 'columns' => ['contact_background_image_url']],
    ];

    public function up(): void
    {
        foreach (self::URL_COLUMNS as $entry) {
            if (! Schema::hasTable($entry['table'])) {
                continue;
            }

            foreach ($entry['columns'] as $column) {
                if (! Schema::hasColumn($entry['table'], $column)) {
                    continue;
                }

                DB::table($entry['table'])
                    ->whereNotNull($column)
                    ->where($column, 'like', '%/uploads/%')
                    ->update([
                        $column => DB::raw("REPLACE({$column}, '/uploads/', '/storage/uploads/')"),
                    ]);
            }
        }
    }

    public function down(): void
    {
        foreach (self::URL_COLUMNS as $entry) {
            if (! Schema::hasTable($entry['table'])) {
                continue;
            }

            foreach ($entry['columns'] as $column) {
                if (! Schema::hasColumn($entry['table'], $column)) {
                    continue;
                }

                DB::table($entry['table'])
                    ->whereNotNull($column)
                    ->where($column, 'like', '%/storage/uploads/%')
                    ->update([
                        $column => DB::raw("REPLACE({$column}, '/storage/uploads/', '/uploads/')"),
                    ]);
            }
        }
    }
};
