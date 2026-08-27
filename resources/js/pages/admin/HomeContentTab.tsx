/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DEFAULT_HOME_PAGE, DEFAULT_CATALOG_PAGE } from "../../config/siteDefaults";
import { ImageUploadField } from "../../components/admin/ImageUploadField";
import { Save } from "lucide-react";

export const HomeContentTab: React.FC = () => {
  const { homePage, catalogPage, updateHomePage, updateCatalogPage } = useApp();
  const h = homePage ?? DEFAULT_HOME_PAGE;
  const c = catalogPage ?? DEFAULT_CATALOG_PAGE;

  const [form, setForm] = useState({ ...h });
  const [catalogForm, setCatalogForm] = useState({ ...c });
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setForm({ ...h });
  }, [h]);

  React.useEffect(() => {
    setCatalogForm({ ...c });
  }, [c]);

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateHomePage({
        ...form,
        contactBackgroundImageUrl: form.contactBackgroundImageUrl?.trim() || null,
      });
      await updateCatalogPage(catalogForm);
    } catch {
      alert("No se pudo guardar el contenido de inicio/catálogo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="admin-card border p-6 rounded-xl space-y-8 max-w-4xl">
      <div>
        <h2 className="font-sans font-extrabold text-sm uppercase tracking-wider text-[var(--text-p)]">
          Contenido de la página de inicio
        </h2>
        <p className="text-[10px] text-[var(--text-s)] mt-1 font-mono">
          Stats, textos de secciones, CTA secundaria del hero y fondo del formulario de contacto.
        </p>
      </div>

      <section className="space-y-3">
        <p className="text-[10px] font-mono uppercase text-[var(--text-s)] font-bold">CTA secundaria del hero</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            value={form.heroSecondaryCtaText}
            onChange={(e) => setField("heroSecondaryCtaText", e.target.value)}
            placeholder="Texto del botón"
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
            required
          />
          <input
            value={form.heroSecondaryCtaLink}
            onChange={(e) => setField("heroSecondaryCtaLink", e.target.value)}
            placeholder="Ruta (ej. /contact)"
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
            required
          />
        </div>
      </section>

      <section className="space-y-3">
        <p className="text-[10px] font-mono uppercase text-[var(--text-s)] font-bold">Barra de estadísticas</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {([
            { valueKey: "stat1Value", labelKey: "stat1Label" },
            { valueKey: "stat2Value", labelKey: "stat2Label" },
            { valueKey: "stat3Value", labelKey: "stat3Label" },
            { valueKey: "stat4Value", labelKey: "stat4Label" },
          ] as const).map((stat, idx) => (
            <div key={stat.valueKey} className="grid grid-cols-2 gap-2">
              <input
                value={form[stat.valueKey]}
                onChange={(e) => setField(stat.valueKey, e.target.value)}
                placeholder={`Valor ${idx + 1}`}
                className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
                required
              />
              <input
                value={form[stat.labelKey]}
                onChange={(e) => setField(stat.labelKey, e.target.value)}
                placeholder={`Etiqueta ${idx + 1}`}
                className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
                required
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <p className="text-[10px] font-mono uppercase text-[var(--text-s)] font-bold">Sección catálogo (inicio)</p>
        <input
          value={form.catalogEyebrow}
          onChange={(e) => setField("catalogEyebrow", e.target.value)}
          placeholder="Eyebrow"
          className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
          required
        />
        <input
          value={form.catalogHeading}
          onChange={(e) => setField("catalogHeading", e.target.value)}
          placeholder="Título"
          className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
          required
        />
        <textarea
          value={form.catalogDescription}
          onChange={(e) => setField("catalogDescription", e.target.value)}
          placeholder="Descripción"
          rows={2}
          className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
          required
        />
        <input
          value={form.catalogCtaText}
          onChange={(e) => setField("catalogCtaText", e.target.value)}
          placeholder="Texto CTA"
          className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
          required
        />
      </section>

      <section className="space-y-3">
        <p className="text-[10px] font-mono uppercase text-[var(--text-s)] font-bold">Sección testimonios</p>
        <input
          value={form.testimonialsEyebrow}
          onChange={(e) => setField("testimonialsEyebrow", e.target.value)}
          placeholder="Eyebrow"
          className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
          required
        />
        <input
          value={form.testimonialsHeading}
          onChange={(e) => setField("testimonialsHeading", e.target.value)}
          placeholder="Título"
          className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
          required
        />
        <textarea
          value={form.testimonialsDescription}
          onChange={(e) => setField("testimonialsDescription", e.target.value)}
          placeholder="Descripción"
          rows={2}
          className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
          required
        />
      </section>

      <section className="space-y-3">
        <p className="text-[10px] font-mono uppercase text-[var(--text-s)] font-bold">Fondo sección contacto (inicio)</p>
        <ImageUploadField
          label="Imagen de fondo"
          value={form.contactBackgroundImageUrl ?? ""}
          onChange={(url) => setField("contactBackgroundImageUrl", url || null)}
          previewAlt="Fondo contacto"
        />
      </section>

      <section className="space-y-3 border-t border-[var(--border)] pt-6">
        <p className="text-[10px] font-mono uppercase text-[var(--text-s)] font-bold">Página Catálogo (/catalog)</p>
        <input
          value={catalogForm.eyebrow}
          onChange={(e) => setCatalogForm((prev) => ({ ...prev, eyebrow: e.target.value }))}
          placeholder="Eyebrow"
          className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
          required
        />
        <input
          value={catalogForm.heading}
          onChange={(e) => setCatalogForm((prev) => ({ ...prev, heading: e.target.value }))}
          placeholder="Título H1"
          className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
          required
        />
        <textarea
          value={catalogForm.description}
          onChange={(e) => setCatalogForm((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Descripción"
          rows={2}
          className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
          required
        />
      </section>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[#007a40] text-white text-xs font-bold px-5 py-2.5 rounded uppercase transition-colors"
      >
        <Save className="w-3.5 h-3.5" />
        {saving ? "Guardando..." : "Guardar contenido"}
      </button>
    </form>
  );
};
