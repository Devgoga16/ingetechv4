import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToId } from "@/lib/scroll";
import { CONTACT, WHATSAPP_URL } from "@/lib/contact";
import { solutions } from "@/data/solutions";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "INICIO", hash: "#inicio", id: "inicio" },
  { label: "PROYECTOS", hash: "#proyectos", id: "proyectos" },
  { label: "SOLUCIONES", hash: "#servicios", id: "servicios" },
  { label: "NOSOTROS", hash: "#nosotros", id: "nosotros" },
  { label: "CONTACTO", hash: "#contacto", id: "contacto" },
];

const socialLinks = [
  { icon: Linkedin, href: CONTACT.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: CONTACT.instagram, label: "Instagram" },
];

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);

  const activeSection = useActiveSection(
    navItems.map((item) => item.id),
    isHome,
  );

  /* Compact the header once the page has scrolled past the top band. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll while the mobile drawer is open. */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  /* Escape closes whatever is open. */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileMenuOpen(false);
      setSolutionsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* Click outside closes the desktop solutions dropdown. */
  useEffect(() => {
    if (!solutionsOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!solutionsRef.current?.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [solutionsOpen]);

  /**
   * Navigation works from any route: on the landing it scrolls, anywhere else
   * it returns home and lets the landing scroll to the hash on mount.
   */
  const goToSection = (hash: string) => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);

    if (isHome) {
      scrollToId(hash);
    } else {
      navigate(`/${hash}`);
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    e.preventDefault();
    goToSection(hash);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ================================ HEADER ============================ */}
      {/* Utility bar: ordinary in-flow content, so it scrolls away naturally.
          It is a sibling of <header> rather than a child — a sticky element
          only pins within its own parent's box, and sharing a wrapper would
          cap the pinning at the combined height of the two bars. */}
      <div className="hidden bg-ink-900 text-white/75 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2.5 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <MapPin size={13} className="shrink-0 text-primary" />
            <span>{CONTACT.address}</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone size={13} className="text-primary" />
              <span>{CONTACT.phone}</span>
            </a>
            <a
              href={CONTACT.emailHref}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail size={13} className="text-primary" />
              <span>{CONTACT.email}</span>
            </a>

            <div className="flex items-center gap-1 border-l border-white/15 pl-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Pinned bar — always the same height. Only the shadow changes on
          scroll, which costs no layout. */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-hairline bg-white/95 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-header",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                goToSection("#inicio");
              }
            }}
            className="flex shrink-0 items-center"
            aria-label="INGETECH ASCENSORES — Inicio"
          >
            <img
              src="/brands/logonuevo.png"
              alt="INGETECH ASCENSORES"
              className="h-14 w-auto py-1.5 object-contain md:h-16 md:py-2"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navItems.map((item) => {
              const isActive = isHome && activeSection === item.id;

              if (item.id !== "servicios") {
                return (
                  <a
                    key={item.hash}
                    href={item.hash}
                    onClick={(e) => handleNavClick(e, item.hash)}
                    className={cn(
                      "inline-flex h-16 items-center text-xs font-bold tracking-wide transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary",
                    )}
                  >
                    <span className="nav-link" data-active={isActive}>
                      {item.label}
                    </span>
                  </a>
                );
              }

              /* SOLUCIONES opens a menu of the six detail pages. */
              return (
                <div
                  key={item.hash}
                  className="relative flex items-center"
                  ref={solutionsRef}
                >
                  <button
                    type="button"
                    onClick={() => setSolutionsOpen((open) => !open)}
                    aria-expanded={solutionsOpen}
                    aria-haspopup="true"
                    className={cn(
                      "inline-flex h-16 items-center gap-1.5 text-xs font-bold tracking-wide transition-colors",
                      isActive || solutionsOpen
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary",
                    )}
                  >
                    <span
                      className="nav-link"
                      data-active={isActive || solutionsOpen}
                    >
                      {item.label}
                    </span>
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={cn(
                        "transition-transform duration-300",
                        solutionsOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {solutionsOpen && (
                    <div className="absolute left-1/2 top-full z-50 w-[30rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-hairline bg-white shadow-card-hover">
                      <ul className="grid grid-cols-2 gap-1 p-3">
                        {solutions.map((solution) => {
                          const Icon = solution.icon;
                          return (
                            <li key={solution.slug}>
                              <Link
                                to={`/soluciones/${solution.slug}`}
                                onClick={() => setSolutionsOpen(false)}
                                className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50"
                              >
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                  <Icon size={16} />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-xs font-bold text-foreground group-hover:text-primary">
                                    {solution.category}
                                  </span>
                                  <span className="mt-0.5 block text-[11px] leading-snug text-foreground/55">
                                    {solution.title}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      <a
                        href="#servicios"
                        onClick={(e) => handleNavClick(e, "#servicios")}
                        className="block border-t border-hairline bg-surface-subtle px-5 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-brand-50"
                      >
                        Ver todas las soluciones
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, "#contacto")}
            className="hidden shrink-0 rounded-xl bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all hover:bg-brand-600 hover:shadow-brand-glow lg:inline-block"
          >
            Cuéntanos tu proyecto
          </a>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={CONTACT.phoneHref}
              aria-label="Llamar"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-brand-50 hover:text-primary"
            >
              <Phone size={20} />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={mobileMenuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-brand-50 hover:text-primary"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ============================ MOBILE DRAWER ========================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <img
                src="/brands/logonuevo.png"
                alt="INGETECH ASCENSORES"
                className="h-11 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="flex h-11 w-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-brand-50 hover:text-primary"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.hash}>
                    <a
                      href={item.hash}
                      onClick={(e) => handleNavClick(e, item.hash)}
                      className="block rounded-xl px-4 py-3.5 text-sm font-bold tracking-wide text-foreground transition-colors hover:bg-brand-50 hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mb-2 mt-6 px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/40">
                Nuestras soluciones
              </p>
              <ul className="space-y-1">
                {solutions.map((solution) => {
                  const Icon = solution.icon;
                  return (
                    <li key={solution.slug}>
                      <Link
                        to={`/soluciones/${solution.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-foreground/75 transition-colors hover:bg-brand-50 hover:text-primary"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-primary">
                          <Icon size={16} />
                        </span>
                        {solution.category}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Contact actions pinned to the bottom of the drawer */}
            <div className="space-y-2 border-t border-hairline bg-surface-subtle px-5 py-4">
              <a
                href="#contacto"
                onClick={(e) => handleNavClick(e, "#contacto")}
                className="block rounded-xl bg-primary px-4 py-3.5 text-center text-xs font-bold uppercase tracking-wide text-white"
              >
                Cuéntanos tu proyecto
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-xl border border-hairline bg-white py-3 text-xs font-semibold text-foreground"
                >
                  <Phone size={15} className="text-primary" />
                  Llamar
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-hairline bg-white py-3 text-xs font-semibold text-foreground"
                >
                  <MessageCircle size={15} className="text-emerald-600" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================ MAIN ============================== */}
      <main className="flex-1">{children}</main>

      {/* WhatsApp floating action - expands to a label on hover/focus */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-6 right-4 z-40 flex items-center gap-0 overflow-hidden rounded-full bg-emerald-500 p-4 text-white shadow-card-hover transition-all duration-300 hover:gap-2 hover:bg-emerald-600 hover:pr-5 focus-visible:gap-2 focus-visible:pr-5 sm:bottom-8 sm:right-8"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Escríbenos por WhatsApp"
      >
        <MessageCircle size={24} className="shrink-0" />
        <span className="max-w-0 whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100 group-focus-visible:max-w-[10rem] group-focus-visible:opacity-100">
          WhatsApp
        </span>
      </a>

      <SiteFooter onNavigate={goToSection} />
    </div>
  );
}

/* ================================= FOOTER ============================== */

const certifications = [
  {
    code: "UNE",
    name: "Normalización Española",
    detail: "Para Posible Instalación y Seguridad del Usuario",
  },
  {
    code: "DIRECTIVA 2006/42/CE",
    name: "Para la Comercialización y Puesta en Servicio de Maquinarias",
  },
  { code: "ISO", name: "45001", detail: "Gestión de Calidad" },
  {
    code: "N.A.120",
    name: "del Documento Nacional de Edificaciones (RNE)",
  },
  {
    code: "UNE",
    name: "Normalización Española 61891",
    detail: "Seguridad en Escaleras Mecánicas y Pasillo Móviles",
  },
  {
    code: "ISO 14881",
    name: "Sistema de Gestión Ambiental",
    detail: "Transporte Mecanizado Número III a",
  },
];

function SiteFooter({ onNavigate }: { onNavigate: (hash: string) => void }) {
  return (
    <footer className="bg-ink-900 text-white">
      {/* Certifications */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h3 className="mb-8 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
            Suministramos equipos que cumplen con:
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <p className="mb-2 text-xs font-bold text-primary">
                  {cert.code}
                </p>
                <p className="text-xs text-white/80">{cert.name}</p>
                {cert.detail && (
                  <p className="mt-1 text-xs text-white/50">{cert.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex h-24 w-32 items-center justify-center rounded-xl bg-white p-3">
              <img
                src="/brands/ingetechlogo.jpg"
                alt="INGETECH ASCENSORES"
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/90">
              INGETECH ASCENSORES
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/80 transition-colors hover:bg-primary hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
              Soluciones
            </h4>
            <ul className="space-y-2.5 text-xs text-white/65">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    to={`/soluciones/${solution.slug}`}
                    className="inline-block py-0.5 transition-colors hover:text-primary"
                  >
                    {solution.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs text-white/65">
              {navItems.map((item) => (
                <li key={item.hash}>
                  <a
                    href={item.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.hash);
                    }}
                    className="inline-block py-0.5 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
              Contáctanos
            </h4>
            <ul className="space-y-3.5 text-xs text-white/65">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="mt-0.5 shrink-0 text-primary" />
                <a
                  href={CONTACT.phoneHref}
                  className="transition-colors hover:text-primary"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="mt-0.5 shrink-0 text-primary" />
                <a
                  href={CONTACT.emailHref}
                  className="transition-colors hover:text-primary"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          <p>&copy; 2025 INGETECH. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
