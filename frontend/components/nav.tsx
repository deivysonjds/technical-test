"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  return (
    <nav className="flex flex-row justify-end items-center gap-10 pr-15 h-15 shadow">
      <Link
        href="/"
        className={`text-lg font-bold pb-1 border-b-2 transition-all
          ${
            isActive("/")
              ? "border-blue-500 text-blue-500"
              : "border-transparent hover:text-blue-400"
          }`}
      >
        Empresas
      </Link>

      <Link
        href="/fornecedores"
        className={`text-lg font-bold pb-1 border-b-2 transition-all
          ${
            isActive("/fornecedores")
              ? "border-blue-500 text-blue-500"
              : "border-transparent hover:text-blue-400"
          }`}
      >
        Fornecedores
      </Link>
    </nav>
  );
}
