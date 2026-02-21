'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import AcmeLogo from "@/app/ui/acme-logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // get current path

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Customers", href: "/customers" },
    { name: "Membership", href: "/membership" },
    { name: "Contact", href: "/contact" },
  ];

  const getLinkClasses = (href: string) =>
    `px-3 py-2 rounded transition-all duration-200 
     ${pathname === href ? "bg-blue-700 shadow-lg scale-105" : "hover:bg-blue-400 hover:shadow-lg hover:scale-105"}`;

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <AcmeLogo />

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className={getLinkClasses(item.href)}>
              {item.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="flex items-center gap-2 bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100 hover:shadow-lg transition-all duration-200"
          >
            Log in <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col gap-4 bg-blue-600 p-4 rounded">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-white px-3 py-2 rounded transition-all duration-200 
                ${pathname === item.href ? "bg-blue-700 shadow-lg scale-105" : "hover:bg-blue-500 hover:shadow-lg hover:scale-105"}`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100 hover:shadow-lg transition-all duration-200"
          >
            Log in
          </Link>
        </nav>
      )}
    </header>
  );
}