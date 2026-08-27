<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->ensureCmsSiteSettingsColumns();
        $this->ensureBannerImageColumns();
        $this->ensureContactFormPageColumns();
        $this->ensureHomePageTable();
        $this->ensureCatalogPageTable();
        $this->seedDefaults();
    }

    public function down(): void
    {
        Schema::dropIfExists('catalog_page');
        Schema::dropIfExists('home_page');

        if (Schema::hasColumn('contact_forms', 'page_eyebrow')) {
            Schema::table('contact_forms', function (Blueprint $table) {
                $table->dropColumn(['page_eyebrow', 'page_heading', 'page_description']);
            });
        }

        if (Schema::hasColumn('banners', 'frame_image_url')) {
            Schema::table('banners', function (Blueprint $table) {
                $table->dropColumn(['frame_image_url', 'overlay_image_url', 'overlay_badge_text']);
            });
        }

        if (Schema::hasColumn('site_settings', 'footer_legal_text')) {
            Schema::table('site_settings', function (Blueprint $table) {
                $table->dropColumn(['footer_legal_text', 'footer_ruc']);
            });
        }
    }

    private function ensureCmsSiteSettingsColumns(): void
    {
        $hasCmsShape = Schema::hasTable('site_settings')
            && Schema::hasColumn('site_settings', 'logo_url')
            && Schema::hasColumn('site_settings', 'site_name')
            && Schema::hasColumn('site_settings', 'browser_title');

        // Tabla legada con otro esquema (row size demasiado grande): renombrar y recrear CMS.
        if (Schema::hasTable('site_settings') && ! $hasCmsShape) {
            Schema::rename('site_settings', 'site_settings_legacy');
        }

        if (! Schema::hasTable('site_settings')) {
            Schema::create('site_settings', function (Blueprint $table) {
                $table->smallInteger('id')->primary();
                $table->text('logo_url')->nullable();
                $table->text('favicon_url')->nullable();
                $table->string('site_name', 255)->nullable();
                $table->string('site_tagline', 255)->nullable();
                $table->string('browser_title', 255);
                $table->string('footer_tagline', 255)->nullable();
                $table->text('footer_description');
                $table->text('footer_legal_text')->nullable();
                $table->string('footer_ruc', 255)->nullable();
                $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            });

            DB::table('site_settings')->insert([
                'id' => 1,
                'site_name' => 'Lotes en Remate',
                'site_tagline' => 'Inversión.pe',
                'browser_title' => 'Lotes en Remate | Inversión Segura en Terrenos',
                'footer_tagline' => 'Inversión Segura',
                'footer_description' => 'La plataforma líder en el Perú para la adquisición, inversión y adjudicación de terrenos.',
                'footer_legal_text' => 'Todos nuestros lotes constan con Título de Propiedad inscrito en SUNARP.',
                'footer_ruc' => 'R.U.C. N° 20608541291 | REMATE DIRECTO',
            ]);

            return;
        }

        Schema::table('site_settings', function (Blueprint $table) {
            if (! Schema::hasColumn('site_settings', 'footer_legal_text')) {
                $table->text('footer_legal_text')->nullable();
            }
            if (! Schema::hasColumn('site_settings', 'footer_ruc')) {
                $table->string('footer_ruc', 255)->nullable();
            }
        });

        try {
            DB::statement('ALTER TABLE site_settings MODIFY site_name VARCHAR(255) NULL');
        } catch (Throwable) {
            // ignore
        }
        try {
            DB::statement('ALTER TABLE site_settings MODIFY site_tagline VARCHAR(255) NULL');
        } catch (Throwable) {
            // ignore
        }
        try {
            DB::statement('ALTER TABLE site_settings MODIFY footer_tagline VARCHAR(255) NULL');
        } catch (Throwable) {
            // ignore
        }
    }

    private function ensureBannerImageColumns(): void
    {
        if (! Schema::hasTable('banners')) {
            return;
        }

        Schema::table('banners', function (Blueprint $table) {
            if (! Schema::hasColumn('banners', 'frame_image_url')) {
                $table->text('frame_image_url')->nullable()->after('image_url');
            }
            if (! Schema::hasColumn('banners', 'overlay_image_url')) {
                $table->text('overlay_image_url')->nullable()->after('frame_image_url');
            }
            if (! Schema::hasColumn('banners', 'overlay_badge_text')) {
                $table->string('overlay_badge_text', 100)->nullable()->after('overlay_image_url');
            }
        });
    }

    private function ensureContactFormPageColumns(): void
    {
        if (! Schema::hasTable('contact_forms')) {
            return;
        }

        Schema::table('contact_forms', function (Blueprint $table) {
            if (! Schema::hasColumn('contact_forms', 'page_eyebrow')) {
                $table->string('page_eyebrow', 255)->nullable();
            }
            if (! Schema::hasColumn('contact_forms', 'page_heading')) {
                $table->string('page_heading', 255)->nullable();
            }
            if (! Schema::hasColumn('contact_forms', 'page_description')) {
                $table->text('page_description')->nullable();
            }
        });
    }

    private function ensureHomePageTable(): void
    {
        if (Schema::hasTable('home_page')) {
            return;
        }

        Schema::create('home_page', function (Blueprint $table) {
            $table->smallInteger('id')->primary();
            $table->string('stat1_value', 100)->default('98%');
            $table->string('stat1_label', 255)->default('Clientes Satisfechos');
            $table->string('stat2_value', 100)->default('S/. 50M+');
            $table->string('stat2_label', 255)->default('Capitalizado en Lotes');
            $table->string('stat3_value', 100)->default('1,200+');
            $table->string('stat3_label', 255)->default('Lotes Adjudicados');
            $table->string('stat4_value', 100)->default('30 hrs');
            $table->string('stat4_label', 255)->default('Visitas Guiadas Semanales');
            $table->string('catalog_eyebrow', 255)->default('Catálogo');
            $table->string('catalog_heading', 255)->default('Conoce nuestros Proyectos');
            $table->text('catalog_description');
            $table->string('catalog_cta_text', 255)->default('Ver catálogo completo');
            $table->string('testimonials_eyebrow', 255)->default('Historias de Éxito');
            $table->string('testimonials_heading', 255)->default('Ellos ya confiaron en Lotesenremate.pe');
            $table->text('testimonials_description');
            $table->text('contact_background_image_url')->nullable();
            $table->string('hero_secondary_cta_text', 255)->default('Solicitar Asesoría');
            $table->string('hero_secondary_cta_link', 512)->default('/contact');
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

        DB::table('home_page')->insert([
            'id' => 1,
            'stat1_value' => '98%',
            'stat1_label' => 'Clientes Satisfechos',
            'stat2_value' => 'S/. 50M+',
            'stat2_label' => 'Capitalizado en Lotes',
            'stat3_value' => '1,200+',
            'stat3_label' => 'Lotes Adjudicados',
            'stat4_value' => '30 hrs',
            'stat4_label' => 'Visitas Guiadas Semanales',
            'catalog_eyebrow' => 'Catálogo',
            'catalog_heading' => 'Conoce nuestros Proyectos',
            'catalog_description' => 'Terrenos con título SUNARP, ubicaciones estratégicas y opciones de financiamiento directo. Elige el proyecto que mejor se adapte a tu inversión.',
            'catalog_cta_text' => 'Ver catálogo completo',
            'testimonials_eyebrow' => 'Historias de Éxito',
            'testimonials_heading' => 'Ellos ya confiaron en Lotesenremate.pe',
            'testimonials_description' => 'Inversionistas locales, profesionales independientes y familias peruanas expresan su recomendación sincera.',
            'contact_background_image_url' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920',
            'hero_secondary_cta_text' => 'Solicitar Asesoría',
            'hero_secondary_cta_link' => '/contact',
        ]);
    }

    private function ensureCatalogPageTable(): void
    {
        if (Schema::hasTable('catalog_page')) {
            return;
        }

        Schema::create('catalog_page', function (Blueprint $table) {
            $table->smallInteger('id')->primary();
            $table->string('eyebrow', 255)->default('Catálogo de proyectos');
            $table->string('heading', 255)->default('Encuentra tu Próxima Inversión');
            $table->text('description');
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

        DB::table('catalog_page')->insert([
            'id' => 1,
            'eyebrow' => 'Catálogo de proyectos',
            'heading' => 'Encuentra tu Próxima Inversión',
            'description' => 'Filtra por zona y región, compara precios y accede al detalle de cada proyecto con título SUNARP.',
        ]);
    }

    private function seedDefaults(): void
    {
        if (Schema::hasColumn('site_settings', 'footer_legal_text')) {
            $row = DB::table('site_settings')->where('id', 1)->first();
            if ($row) {
                $updates = [];
                if (empty($row->footer_legal_text ?? null)) {
                    $updates['footer_legal_text'] = 'Todos nuestros lotes constan con Título de Propiedad inscrito en SUNARP.';
                }
                if (empty($row->footer_ruc ?? null)) {
                    $updates['footer_ruc'] = 'R.U.C. N° 20608541291 | REMATE DIRECTO';
                }
                if (Schema::hasColumn('site_settings', 'browser_title') && empty($row->browser_title ?? null)) {
                    $updates['browser_title'] = 'Lotes en Remate | Inversión Segura en Terrenos';
                }
                if (Schema::hasColumn('site_settings', 'footer_description') && empty($row->footer_description ?? null)) {
                    $updates['footer_description'] = 'La plataforma líder en el Perú para la adquisición, inversión y adjudicación de terrenos.';
                }
                if ($updates !== []) {
                    DB::table('site_settings')->where('id', 1)->update($updates);
                }
            } elseif (Schema::hasColumn('site_settings', 'browser_title')) {
                DB::table('site_settings')->insert([
                    'id' => 1,
                    'site_name' => 'Lotes en Remate',
                    'site_tagline' => 'Inversión.pe',
                    'browser_title' => 'Lotes en Remate | Inversión Segura en Terrenos',
                    'footer_tagline' => 'Inversión Segura',
                    'footer_description' => 'La plataforma líder en el Perú para la adquisición, inversión y adjudicación de terrenos.',
                    'footer_legal_text' => 'Todos nuestros lotes constan con Título de Propiedad inscrito en SUNARP.',
                    'footer_ruc' => 'R.U.C. N° 20608541291 | REMATE DIRECTO',
                ]);
            }
        }

        if (Schema::hasTable('contact_forms') && Schema::hasColumn('contact_forms', 'page_eyebrow')) {
            DB::table('contact_forms')
                ->where('slug', 'contact_consulta')
                ->whereNull('page_eyebrow')
                ->update([
                    'page_eyebrow' => 'Canales de Atención 24/7',
                    'page_heading' => 'Contacta con Nuestros Expertos',
                    'page_description' => 'Solicita la programación gratuita de tu traslado ejecutivo privado de fin de semana para presenciar tu lote ideal.',
                ]);
        }

        if (Schema::hasTable('home_page') && DB::table('home_page')->where('id', 1)->doesntExist()) {
            DB::table('home_page')->insert([
                'id' => 1,
                'stat1_value' => '98%',
                'stat1_label' => 'Clientes Satisfechos',
                'stat2_value' => 'S/. 50M+',
                'stat2_label' => 'Capitalizado en Lotes',
                'stat3_value' => '1,200+',
                'stat3_label' => 'Lotes Adjudicados',
                'stat4_value' => '30 hrs',
                'stat4_label' => 'Visitas Guiadas Semanales',
                'catalog_eyebrow' => 'Catálogo',
                'catalog_heading' => 'Conoce nuestros Proyectos',
                'catalog_description' => 'Terrenos con título SUNARP, ubicaciones estratégicas y opciones de financiamiento directo.',
                'catalog_cta_text' => 'Ver catálogo completo',
                'testimonials_eyebrow' => 'Historias de Éxito',
                'testimonials_heading' => 'Ellos ya confiaron en Lotesenremate.pe',
                'testimonials_description' => 'Inversionistas locales, profesionales independientes y familias peruanas expresan su recomendación sincera.',
                'contact_background_image_url' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920',
                'hero_secondary_cta_text' => 'Solicitar Asesoría',
                'hero_secondary_cta_link' => '/contact',
            ]);
        }

        if (Schema::hasTable('catalog_page') && DB::table('catalog_page')->where('id', 1)->doesntExist()) {
            DB::table('catalog_page')->insert([
                'id' => 1,
                'eyebrow' => 'Catálogo de proyectos',
                'heading' => 'Encuentra tu Próxima Inversión',
                'description' => 'Filtra por zona y región, compara precios y accede al detalle de cada proyecto con título SUNARP.',
            ]);
        }
    }
};
