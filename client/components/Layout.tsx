import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navItems = [
    { label: "INICIO", href: "/" },
    { label: "QUIENES SOMOS", href: "/about" },
    { label: "PRODUCTOS", href: "/products" },
    { label: "CATALOGO", href: "/catalog" },
    { label: "CLIENTES", href: "/clients" },
    { label: "CONTACTO", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar with contact info */}
          <div className="hidden md:flex justify-between items-center py-2 text-xs text-foreground/70 border-b border-muted">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>
                  Ubicación: Av. Prolongación Benavides 3583, Oficina 101,
                  Santiago de Surco, Lima
                </span>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>Llamanos: +51 981 311 694</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>tesoreria@epj.com.pe</span>
              </div>
            </div>
          </div>

          {/* Main header with logo and nav */}
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 bg-secondary text-white rounded flex items-center justify-center font-bold text-lg">
                EPJ
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button className="lg:hidden text-foreground">
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
            </button>
          </div>
        </div>
      </header>

      {/* Main content with sidebar */}
      <div className="flex flex-1">
        {/* Left sidebar with social icons */}
        <div className="hidden md:flex flex-col items-center gap-4 bg-secondary text-white px-4 py-8 fixed left-0 top-32">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <IconComponent size={20} />
              </a>
            );
          })}
        </div>

        {/* Main content */}
        <main className="flex-1 md:ml-20">
          {children}
        </main>
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/51981311694"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* Footer */}
      <footer className="bg-secondary text-white mt-12">
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
                <p className="text-xs mt-1">Para Posible Instalación y Seguridad del Usuario</p>
              </div>
              <div>
                <p className="text-xs font-bold mb-2">DIRECTIVA 2006/42/CE</p>
                <p className="text-xs">Para la Comercialización y Puesta en Servicio de Maquinarias</p>
              </div>
              <div>
                <p className="text-xs font-bold mb-2">ISO</p>
                <p className="text-xs">45001</p>
                <p className="text-xs mt-1">Gestión de Calidad</p>
              </div>
              <div>
                <p className="text-xs font-bold mb-2">N.A.120</p>
                <p className="text-xs">del Documento Nacional de Edificaciones (RNE)</p>
              </div>
              <div>
                <p className="text-xs font-bold mb-2">UNE</p>
                <p className="text-xs">Normalización Española 61891</p>
                <p className="text-xs mt-1">Seguridad en Escaleras Mecánicas y Pasillo Móviles</p>
              </div>
              <div>
                <p className="text-xs font-bold mb-2">ISO 14881</p>
                <p className="text-xs">Sistema de Gestión Ambiental</p>
                <p className="text-xs mt-1">Transporte Mecanizado Número III a</p>
              </div>
            </div>
          </div>

          {/* Services and contact */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo */}
            <div>
              <div className="w-16 h-16 bg-white text-secondary rounded flex items-center justify-center font-bold text-2xl mb-4">
                EPJ
              </div>
              <p className="text-xs text-white/80">
                Empresas Peruanas de Elevación y Equipos Verticales, S.A.C.
              </p>
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
                    Av. Prolongación Benavides 3583, Oficina 101, Santiago de
                    Surco, Lima
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-xs text-white/60">
            <p>&copy; 2024 EPJ. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
