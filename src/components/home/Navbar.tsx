"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Products", hasDropdown: true },
  { label: "Solutions", hasDropdown: true },
  { label: "Developers", hasDropdown: true },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", hasDropdown: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-xl font-bold">
          {/* alt is empty on purpose — the adjacent wordmark names the link */}
          <Image
            src="/smslocal-icon.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span>
            SMS<span className="text-primary">Local</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href ?? "#"}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-primary"
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#login"
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            Login
          </a>
          <a
            href="#signup"
            className="group rounded-full bg-gradient-brand p-[1.5px] shadow-sm shadow-primary/20 transition hover:shadow-md hover:shadow-secondary/25"
          >
            <span className="block rounded-full bg-white px-4 py-2 text-sm font-semibold transition group-hover:bg-muted">
              <span className="text-gradient-brand">Sign Up</span>
            </span>
          </a>
        </div>

        <button
          className="p-2 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-white px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href ?? "#"}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="#login"
              className="rounded-lg border border-border px-4 py-2 text-center text-sm font-semibold text-foreground"
            >
              Login
            </a>
            <a
              href="#signup"
              className="group block rounded-full bg-gradient-brand p-[1.5px]"
            >
              <span className="block rounded-full bg-white px-4 py-2 text-center text-sm font-semibold">
                <span className="text-gradient-brand">Sign Up</span>
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
