import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import LogoTransparent from "@/assets/img/logo-transparent.png";
import Logo from "@/assets/img/logo.png";

import Cart from "./cart/Cart";
import CartButton from "./cart/CartButton";

const links: { name: string; to: string }[] = [
  { name: "Inicio", to: "/" },
  { name: "Productos", to: "/products" },
  { name: "Sucursales", to: "/branches" },
  { name: "Nosotros", to: "/about" },
  { name: "Contacto", to: "/contacts" },
];

export default function Header() {
  const [isScrolledHeader, setIsScrolledHeader] = useState(false);
  const [showCart, setshowCart] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { pathname } = useLocation();

  /* ───────── Scroll / cambio de ruta ───────── */
  useEffect(() => {
    const onScroll = () => {
      setIsScrolledHeader(window.scrollY > 0 || pathname !== "/");
    };

    window.addEventListener("scroll", onScroll);
    // actualiza inmediatamente al cambiar de ruta
    onScroll();

    // cierra drawer móvil al cambiar de página
    setMobileOpen(false);
    setshowCart(false);

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  /* ────────────────────── Render ────────────────────── */
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-shadow ${
        isScrolledHeader
          ? "bg-white/80 backdrop-blur shadow-md text-black"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* LOGO */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={isScrolledHeader ? Logo : LogoTransparent}
            alt="logo"
            className="h-10"
          />
        </Link>

        {/* ENLACES DESKTOP */}
        <nav className="hidden md:flex gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`hover:text-primary ${
                pathname === l.to ? "text-primary" : ""
              }`}
            >
              {l.name}
            </Link>
          ))}
        </nav>

        {/* BOTÓN HAMBURGUESA (MÓVIL) */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* BOTÓN CARRITO */}
        <CartButton setshowCart={setshowCart} />
      </div>

      {/* MENÚ MÓVIL */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`block px-6 py-4 border-b ${
                    pathname === l.to ? "text-primary" : ""
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* CARRITO EMERGENTE */}
      {showCart && <Cart setshowCart={setshowCart} />}
    </header>
  );
}
