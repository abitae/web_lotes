CREATE TABLE IF NOT EXISTS banners (
  id                  VARCHAR(36) PRIMARY KEY,
  title               VARCHAR(255) NOT NULL,
  subtitle            TEXT NOT NULL,
  button_text         VARCHAR(100) NOT NULL,
  image_url           TEXT NOT NULL,
  frame_image_url     TEXT NULL,
  overlay_image_url   TEXT NULL,
  overlay_badge_text  VARCHAR(100) NULL,
  badge_text          VARCHAR(100) NULL,
  is_active           TINYINT(1) NOT NULL DEFAULT 1,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id                VARCHAR(36) PRIMARY KEY,
  name              VARCHAR(255) NOT NULL,
  role              VARCHAR(255) NOT NULL,
  stars             SMALLINT NOT NULL,
  quote             TEXT NOT NULL,
  project_purchased VARCHAR(255) NOT NULL,
  avatar_url        TEXT NOT NULL,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id               VARCHAR(36) PRIMARY KEY,
  full_name        VARCHAR(255) NOT NULL,
  phone            VARCHAR(20) NOT NULL,
  email            VARCHAR(255) NOT NULL,
  project_interest VARCHAR(255) NOT NULL,
  message          TEXT NOT NULL,
  status           VARCHAR(20) NOT NULL DEFAULT 'Pendiente',
  notes            TEXT NULL,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_inquiries_status CHECK (status IN ('Pendiente', 'Contactado', 'Archivado'))
);

CREATE TABLE IF NOT EXISTS admins (
  id            INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_settings (
  id                 SMALLINT PRIMARY KEY,
  logo_url           TEXT NULL,
  favicon_url        TEXT NULL,
  site_name          VARCHAR(255) NULL,
  site_tagline       VARCHAR(255) NULL,
  browser_title      VARCHAR(255) NOT NULL,
  footer_tagline     VARCHAR(255) NULL,
  footer_description TEXT NOT NULL,
  footer_legal_text  TEXT NULL,
  footer_ruc         VARCHAR(255) NULL,
  updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS guarantee_section (
  id                   SMALLINT PRIMARY KEY,
  eyebrow              VARCHAR(255) NOT NULL,
  heading              VARCHAR(255) NOT NULL,
  description          TEXT NOT NULL,
  background_image_url TEXT NOT NULL,
  updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS guarantee_items (
  id          VARCHAR(36) PRIMARY KEY,
  icon        VARCHAR(50) NOT NULL,
  title       VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   TINYINT(1) NOT NULL DEFAULT 1,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_forms (
  slug                     VARCHAR(50) PRIMARY KEY,
  form_title               VARCHAR(255) NOT NULL,
  form_subtitle            TEXT NOT NULL,
  submit_label             VARCHAR(255) NOT NULL,
  success_title            VARCHAR(255) NOT NULL,
  success_message          TEXT NOT NULL,
  default_message          TEXT NOT NULL,
  default_project_interest VARCHAR(255) NOT NULL,
  section_eyebrow          VARCHAR(255) NULL,
  section_heading          VARCHAR(255) NULL,
  section_description      TEXT NULL,
  bullets                  JSON NULL,
  page_eyebrow             VARCHAR(255) NULL,
  page_heading             VARCHAR(255) NULL,
  page_description         TEXT NULL,
  updated_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS home_page (
  id                           SMALLINT PRIMARY KEY,
  stat1_value                  VARCHAR(100) NOT NULL DEFAULT '98%',
  stat1_label                  VARCHAR(255) NOT NULL DEFAULT 'Clientes Satisfechos',
  stat2_value                  VARCHAR(100) NOT NULL DEFAULT 'S/. 50M+',
  stat2_label                  VARCHAR(255) NOT NULL DEFAULT 'Capitalizado en Lotes',
  stat3_value                  VARCHAR(100) NOT NULL DEFAULT '1,200+',
  stat3_label                  VARCHAR(255) NOT NULL DEFAULT 'Lotes Adjudicados',
  stat4_value                  VARCHAR(100) NOT NULL DEFAULT '30 hrs',
  stat4_label                  VARCHAR(255) NOT NULL DEFAULT 'Visitas Guiadas Semanales',
  catalog_eyebrow              VARCHAR(255) NOT NULL DEFAULT 'Catálogo',
  catalog_heading              VARCHAR(255) NOT NULL DEFAULT 'Conoce nuestros Proyectos',
  catalog_description          TEXT NOT NULL,
  catalog_cta_text             VARCHAR(255) NOT NULL DEFAULT 'Ver catálogo completo',
  testimonials_eyebrow         VARCHAR(255) NOT NULL DEFAULT 'Historias de Éxito',
  testimonials_heading         VARCHAR(255) NOT NULL DEFAULT 'Ellos ya confiaron en Lotesenremate.pe',
  testimonials_description     TEXT NOT NULL,
  contact_background_image_url TEXT NULL,
  hero_secondary_cta_text      VARCHAR(255) NOT NULL DEFAULT 'Solicitar Asesoría',
  hero_secondary_cta_link      VARCHAR(512) NOT NULL DEFAULT '/contact',
  updated_at                   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS catalog_page (
  id          SMALLINT PRIMARY KEY,
  eyebrow     VARCHAR(255) NOT NULL DEFAULT 'Catálogo de proyectos',
  heading     VARCHAR(255) NOT NULL DEFAULT 'Encuentra tu Próxima Inversión',
  description TEXT NOT NULL,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS corporate_channels (
  id           VARCHAR(36) PRIMARY KEY,
  channel_type VARCHAR(20) NOT NULL,
  label        VARCHAR(255) NOT NULL,
  value        TEXT NOT NULL,
  extra_info   TEXT NULL,
  sort_order   INT NOT NULL DEFAULT 0,
  is_active    TINYINT(1) NOT NULL DEFAULT 1,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_corporate_channels_type CHECK (channel_type IN ('address', 'phone', 'email', 'whatsapp'))
);

CREATE TABLE IF NOT EXISTS faqs (
  id         VARCHAR(36) PRIMARY KEY,
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active  TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS about_page (
  id                        SMALLINT PRIMARY KEY,
  hero_eyebrow              VARCHAR(255) NOT NULL,
  hero_heading              VARCHAR(255) NOT NULL,
  hero_description          TEXT NOT NULL,
  hero_background_image_url TEXT NOT NULL,
  mission_heading           VARCHAR(255) NOT NULL,
  mission_description       TEXT NOT NULL,
  vision_heading            VARCHAR(255) NOT NULL,
  vision_description        TEXT NOT NULL,
  values_eyebrow            VARCHAR(255) NOT NULL,
  values_heading            VARCHAR(255) NOT NULL,
  values_description        TEXT NOT NULL,
  advisors_eyebrow          VARCHAR(255) NOT NULL,
  advisors_heading          VARCHAR(255) NOT NULL,
  advisors_description      TEXT NOT NULL,
  updated_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS about_values (
  id          VARCHAR(36) PRIMARY KEY,
  icon        VARCHAR(50) NOT NULL,
  title       VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   TINYINT(1) NOT NULL DEFAULT 1,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expert_advisors (
  id          VARCHAR(36) PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  role        VARCHAR(255) NOT NULL,
  bio         TEXT NOT NULL,
  image_url   TEXT NOT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   TINYINT(1) NOT NULL DEFAULT 1,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS home_alert_modal (
  id          SMALLINT PRIMARY KEY,
  is_enabled  TINYINT(1) NOT NULL DEFAULT 0,
  title       VARCHAR(255) NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  image_url   TEXT NULL,
  video_url   TEXT NULL,
  button_text VARCHAR(255) NULL,
  button_link VARCHAR(512) NULL,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
