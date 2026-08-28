/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { DEFAULT_SITE_SETTINGS } from "../../config/siteDefaults";
import { BrandLogo } from "../BrandLogo";
import type { CorporateChannel } from "../../types";
import { fadeUp, staggerContainer, viewportOnce } from "../../utils/motion";

function channelIcon(type: CorporateChannel["channelType"]) {
  if (type === "phone" || type === "whatsapp") return Phone;
  if (type === "email") return Mail;
  return MapPin;
}

function channelHref(ch: CorporateChannel): string | undefined {
  if (ch.channelType === "phone") return `tel:${ch.value.replace(/\s/g, "")}`;
  if (ch.channelType === "email") return `mailto:${ch.value}`;
  return undefined;
}

export const Footer: React.FC = () => {
  const { siteSettings, channels } = useApp();
  const settings = siteSettings ?? DEFAULT_SITE_SETTINGS;
  const activeChannels = channels.filter((c) => c.isActive && c.channelType !== "whatsapp");

  return (
    <footer id="public-footer" className="select-none font-sans">
      {(settings.footerLegalText?.trim() || settings.footerRuc?.trim()) && (
        <div className="footer-legal-bar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-medium tracking-wide">
            {(settings.footerLegalText?.trim()) && (
              <span className="footer-legal-text flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                {settings.footerLegalText}
              </span>
            )}
            {(settings.footerRuc?.trim()) && (
              <span className="footer-ruc font-mono text-[10px]">
                {settings.footerRuc}
              </span>
            )}
          </div>
        </div>
      )}

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div variants={fadeUp} className="space-y-3">
            <Link to="/" className="inline-flex group">
              <BrandLogo settings={settings} variant="footer" />
            </Link>
            {(settings.footerDescription?.trim()) && (
              <p className="footer-desc text-xs leading-relaxed font-light">
                {settings.footerDescription}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <h3 className="footer-heading font-sans font-bold text-sm uppercase tracking-widest">
              Explorar
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="footer-link">Inicio Portal</Link></li>
              <li><Link to="/catalog" className="footer-link">Buscar Terrenos</Link></li>
              <li><Link to="/about" className="footer-link">Quiénes Somos</Link></li>
              <li><Link to="/contact" className="footer-link">Trabaja con un Experto</Link></li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <h3 className="footer-heading font-sans font-bold text-sm uppercase tracking-widest">
              Lotes por Tipo
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/catalog?type=Playero" className="footer-link flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Proyectos Playeros
                </Link>
              </li>
              <li>
                <Link to="/catalog?type=Campestre" className="footer-link flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
                  Proyectos Campestres
                </Link>
              </li>
              <li>
                <Link to="/catalog?type=Urbano" className="footer-link flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Habilitación Urbana
                </Link>
              </li>
              <li>
                <Link to="/catalog?type=Industrial" className="footer-link flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa] shrink-0" />
                  Zonas Industriales
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4 text-xs">
            <h3 className="footer-heading font-sans font-bold text-sm uppercase tracking-widest">
              Oficina Principal
            </h3>
            <ul className="space-y-3">
              {activeChannels.length > 0 ? (
                activeChannels.map((ch) => {
                  const Icon = channelIcon(ch.channelType);
                  const href = channelHref(ch);
                  return (
                    <li key={ch.id} className="flex items-start gap-2.5">
                      <Icon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      {href ? (
                        <a href={href} className="footer-link">
                          {ch.value}
                          {ch.extraInfo ? ` (${ch.extraInfo})` : ""}
                        </a>
                      ) : (
                        <span className="footer-link">{ch.value}</span>
                      )}
                    </li>
                  );
                })
              ) : (
                <>
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="footer-link">Av. Javier Prado Este 488, San Isidro, Lima, Perú</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <a href="tel:+5116805120" className="footer-link">(01) 680-5120</a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <a href="mailto:informes@lotesenremate.pe" className="footer-link">informes@lotesenremate.pe</a>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="footer-bottom mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
        >
          <div className="footer-copyright text-center md:text-left">
            © {new Date().getFullYear()} {settings.siteName?.trim() || settings.browserTitle || "Lotes en Remate"}. Todos los derechos reservados.
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};
