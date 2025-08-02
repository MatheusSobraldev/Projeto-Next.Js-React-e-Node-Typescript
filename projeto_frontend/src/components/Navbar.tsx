"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css"; // Importa o CSS

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <h1 className="navbar-title">🍽 Restaurante</h1>
      <div className="navbar-links">
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          Início
        </Link>
        <Link href="/alimentos" className={pathname === "/alimentos" ? "active" : ""}>
          Alimentos
        </Link>
        <Link href="/pratos" className={pathname === "/pratos" ? "active" : ""}>
          Pratos
        </Link>
        <Link href="/usuarios" className={pathname === "/usuarios" ? "active" : ""}>
          Usuários
        </Link>
      </div>
    </nav>
  );
}

