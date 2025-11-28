import { ReactNode, useState } from "react";
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  X,
} from "lucide-react";
import { useSticky } from "@/hooks/useSticky";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { elementRef, isSticky } = useSticky();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "INICIO", href: "#inicio" },
    { label: "SERVICIOS", href: "#servicios" },
    { label: "CATÁLOGO", href: "#catalogo" },
    { label: "NOSOTROS", href: "#nosotros" },
    { label: "CONTACTO", href: "#contacto" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 100; // Adjust for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sentinel element for sticky detection */}
      <div ref={elementRef} className="h-0" />

      {/* Header and Navigation - Sticky Container */}
      <div
        className="fixed top-0 left-0 right-0 z-40 shadow-lg transition-all duration-300"
      >
        {/* Contact Info Bar - Shown at top when sticky */}
        {isSticky && (
          <div className="hidden md:flex justify-between items-center py-2 px-4 sm:px-6 lg:px-8 bg-white border-b border-muted text-xs text-foreground/70">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>
                  Ubicación: Urb. Las Delicias de Villa, Mz. G9, Lt.6, Chorrillos, Lima
                </span>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>Llamanos: +51 929 970 920</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>ventas@ingetech-elevators.com</span>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="bg-white border-b border-primary/10">
          <div
            className={`${isSticky
              ? "px-4 sm:px-6 lg:px-8"
              : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              }`}
          >
            {/* Main header with logo and contact info */}
            <div
              className={`flex justify-between items-center ${isSticky ? "py-2" : "py-3"
                }`}
            >
              <a
                href="#inicio"
                onClick={(e) => handleNavClick(e, "#inicio")}
                className={`flex items-center gap-2 flex-shrink-0 transition-all duration-300 ${isSticky ? "h-12" : "h-20"
                  }`}
              >
                <img
                  src="/brands/ingetechlogo.jpg"
                  alt="INGETECH ASCENSORES"
                  className={`transition-all duration-300 ${isSticky ? "h-12" : "h-20"
                    } w-auto object-contain`}
                />
              </a>

              {/* Contact info when not sticky */}
              {!isSticky && (
                <div className="hidden md:flex gap-6 text-xs text-foreground/70">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>
                      Ubicación: Urb. Las Delicias de Villa, Mz. G9, Lt.6, Chorrillos, Lima.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>Llamanos: +51 929 970 920</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <span>ventas@ingetech-elevators.com</span>
                  </div>
                </div>
              )}

              {/* Navigation in header when sticky */}
              {isSticky && (
                <nav className="hidden lg:flex items-center gap-6">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="nav-link font-semibold text-foreground hover:text-primary text-xs"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              )}

              {/* Mobile menu button - Always visible on mobile */}
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`${isSticky ? 'text-foreground hover:text-primary' : 'text-foreground hover:text-primary'} transition-colors`}
                  aria-label="Toggle menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu dropdown - Always on top level */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-primary border-t border-white/20 max-h-96 overflow-y-auto">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-link-white font-semibold text-white text-sm px-4 sm:px-6 lg:px-8 py-3 border-b border-white/10 hover:bg-primary/80 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Red Navigation Bar - Hidden when sticky, Desktop only */}
        {!isSticky && (
          <nav className="bg-primary text-white hidden lg:block">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-8 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="nav-link-white font-semibold text-white text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Main content with sidebar */}
      <div className="flex flex-1">
        {/* Left sidebar with social icons - Floating */}
        <div className="hidden md:flex flex-col items-center gap-4 bg-primary text-white px-4 py-8 fixed left-6 top-1/2 -translate-y-1/2 rounded-lg shadow-lg z-30 animate-float">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
              >
                <IconComponent size={20} />
              </a>
            );
          })}
        </div>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/51929970920"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* Footer */}
      <footer className="bg-foreground text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Certifications section */}
          <div className="mb-12 border-b border-white/20 pb-8">
            <h3 className="text-center text-sm font-bold mb-8 text-white">
              SUMINISTRAMOS EQUIPOS QUE CUMPLEN CON:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
              <div>
                <p className="text-xs font-bold mb-2">UNE</p>
                <p className="text-xs">Normalización Española</p>
                <p className="text-xs mt-1">
                  Para Posible Instalación y Seguridad del Usuario
                </p>
              </div>
              <div>
                <p className="text-xs font-bold mb-2">DIRECTIVA 2006/42/CE</p>
                <p className="text-xs">
                  Para la Comercialización y Puesta en Servicio de Maquinarias
                </p>
              </div>
              <div>
                <p className="text-xs font-bold mb-2">ISO</p>
                <p className="text-xs">45001</p>
                <p className="text-xs mt-1">Gestión de Calidad</p>
              </div>
              <div>
                <p className="text-xs font-bold mb-2">N.A.120</p>
                <p className="text-xs">
                  del Documento Nacional de Edificaciones (RNE)
                </p>
              </div>
              <div>
                <p className="text-xs font-bold mb-2">UNE</p>
                <p className="text-xs">Normalización Española 61891</p>
                <p className="text-xs mt-1">
                  Seguridad en Escaleras Mecánicas y Pasillo Móviles
                </p>
              </div>
              <div>
                <p className="text-xs font-bold mb-2">ISO 14881</p>
                <p className="text-xs">Sistema de Gestión Ambiental</p>
                <p className="text-xs mt-1">
                  Transporte Mecanizado Número III a
                </p>
              </div>
            </div>
          </div>

          {/* Services and contact */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo */}
            <div>
              <div className="w-32 h-24 bg-white rounded flex items-center justify-center mb-4 p-3">
                <img
                  src="/brands/ingetechlogo.jpg"
                  alt="INGETECH ASCENSORES"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-xs text-white/80">INGETECH ASCENSORES</p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-white mb-4">SERVICIOS</h4>
              <ul className="text-xs text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Ascensores Equipos Nuevos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Modernización de Ascensores</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-4">CONTACTANOS</h4>
              <ul className="text-xs text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Urb. Las Delicias de Villa, Mz. G9, Lt.6, Chorrillos, Lima
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-xs text-white/60">
            <p>&copy; 2025 INGETECH. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
