/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DEFAULT_SITE_SETTINGS } from "../../config/siteDefaults";
import { BrandLogo } from "../../components/BrandLogo";
import { ImageUploadField } from "../../components/admin/ImageUploadField";
import type { SiteSettings } from "../../types";
import { Save, Eye } from "lucide-react";

function emptyToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export const SiteIdentityTab: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useApp();
  const s = siteSettings ?? DEFAULT_SITE_SETTINGS;

  const [siteName, setSiteName] = useState(s.siteName ?? "");
  const [siteTagline, setSiteTagline] = useState(s.siteTagline ?? "");
  const [browserTitle, setBrowserTitle] = useState(s.browserTitle);
  const [footerTagline, setFooterTagline] = useState(s.footerTagline ?? "");
  const [footerDescription, setFooterDescription] = useState(s.footerDescription);
  const [footerLegalText, setFooterLegalText] = useState(s.footerLegalText ?? "");
  const [footerRuc, setFooterRuc] = useState(s.footerRuc ?? "");
  const [logoUrl, setLogoUrl] = useState(s.logoUrl ?? "");
  const [faviconUrl, setFaviconUrl] = useState(s.faviconUrl ?? "");
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setSiteName(s.siteName ?? "");
    setSiteTagline(s.siteTagline ?? "");
    setBrowserTitle(s.browserTitle);
    setFooterTagline(s.footerTagline ?? "");
    setFooterDescription(s.footerDescription);
    setFooterLegalText(s.footerLegalText ?? "");
    setFooterRuc(s.footerRuc ?? "");
    setLogoUrl(s.logoUrl ?? "");
    setFaviconUrl(s.faviconUrl ?? "");
  }, [s]);

  const previewSettings: SiteSettings = {
    logoUrl: logoUrl.trim() || null,
    faviconUrl: faviconUrl.trim() || null,
    siteName: emptyToNull(siteName),
    siteTagline: emptyToNull(siteTagline),
    browserTitle: browserTitle.trim() || DEFAULT_SITE_SETTINGS.browserTitle,
    footerTagline: emptyToNull(footerTagline),
    footerDescription: footerDescription.trim(),
    footerLegalText: emptyToNull(footerLegalText),
    footerRuc: emptyToNull(footerRuc),
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteSettings({
        siteName: emptyToNull(siteName),
        siteTagline: emptyToNull(siteTagline),
        browserTitle: browserTitle.trim(),
        footerTagline: emptyToNull(footerTagline),
        footerDescription: footerDescription.trim(),
        footerLegalText: emptyToNull(footerLegalText),
        footerRuc: emptyToNull(footerRuc),
        logoUrl: logoUrl.trim() || null,
        faviconUrl: faviconUrl.trim() || null,
      });
    } catch {
      alert("No se pudo guardar la identidad del sitio.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="admin-card border p-6 rounded-xl space-y-6">
      <div>
        <h2 className="font-sans font-extrabold text-sm uppercase tracking-wider text-[var(--text-p)]">
          Identidad del sitio
        </h2>
        <p className="text-[10px] text-[var(--text-s)] mt-1 font-mono">
          Nombre y tagline del navbar son opcionales. Si van vacíos y hay logo, el logo ocupa todo el espacio de marca.
        </p>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 space-y-2">
        <span className="text-[10px] font-mono uppercase text-[var(--text-s)] flex items-center gap-1">
          <Eye className="w-3 h-3" /> Vista previa navbar
        </span>
        <div className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3">
          <BrandLogo settings={previewSettings} variant="navbar" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)]/50">
          <ImageUploadField
            label="Logo principal"
            value={logoUrl}
            onChange={setLogoUrl}
            uploadLabel="Subir logo"
            previewAlt="Vista previa logo"
            previewClassName="h-12 w-auto max-w-full object-contain"
          />
        </div>

        <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)]/50">
          <ImageUploadField
            label="Favicon"
            value={faviconUrl}
            onChange={setFaviconUrl}
            uploadLabel="Subir favicon"
            previewAlt="Vista previa favicon"
            previewClassName="h-8 w-8 object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Nombre del sitio (opcional)</label>
          <input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
            placeholder="Ej. Lotes en Remate"
          />
        </div>
        <div>
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Tagline navbar (opcional)</label>
          <input
            value={siteTagline}
            onChange={(e) => setSiteTagline(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
            placeholder="Ej. Inversión.pe"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Título del navegador</label>
          <input
            value={browserTitle}
            onChange={(e) => setBrowserTitle(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Tagline footer (opcional)</label>
          <input
            value={footerTagline}
            onChange={(e) => setFooterTagline(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
            placeholder="Ej. Inversión Segura"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Descripción footer</label>
          <textarea
            value={footerDescription}
            onChange={(e) => setFooterDescription(e.target.value)}
            rows={3}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Barra legal footer (opcional)</label>
          <input
            value={footerLegalText}
            onChange={(e) => setFooterLegalText(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
            placeholder="Ej. Todos nuestros lotes constan con Título de Propiedad inscrito en SUNARP."
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">RUC / texto legal corto (opcional)</label>
          <input
            value={footerRuc}
            onChange={(e) => setFooterRuc(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
            placeholder="Ej. R.U.C. N° 20608541291 | REMATE DIRECTO"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[#007a40] text-white text-xs font-bold px-5 py-2.5 rounded uppercase transition-colors"
      >
        <Save className="w-3.5 h-3.5" />
        {saving ? "Guardando..." : "Guardar identidad"}
      </button>
    </form>
  );
};
