'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, FileText, Menu, X, Sun, Moon } from 'lucide-react';

const navItems = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Arsenal',    href: '#arsenal' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [isDark, setIsDark]         = useState(true); // default dark

  /* ── Restore theme preference on mount ── */
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsDark(false);
    }
  }, []);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Toggle dark / light ── */
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const close = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-base/90 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex w-[min(1200px,94%)] items-center justify-between h-[60px]">

          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-0 text-[1.15rem] font-bold tracking-tight select-none"
          >
            <span className="text-white">Chandra Kiran</span>
            <span className="ml-1.5 rounded bg-white px-1 py-0.5 text-[1rem] font-bold text-black leading-none tracking-normal align-middle">
              Narala
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.93rem] text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: social icons + theme toggle */}
          <div className="hidden md:flex items-center gap-4 text-zinc-400">
            <a
              href="https://github.com/chandrakirannarala"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/chandrakirannarala/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="/assets/myresume.pdf"
              aria-label="Resume"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              <FileText size={18} />
            </a>

            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white transition-all duration-200"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:text-white transition-all duration-200"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              className="text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-base/95 backdrop-blur-md pt-[60px]">
          <ul className="flex flex-col items-center justify-center gap-8 h-full -mt-[60px]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="text-2xl font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="flex gap-6 text-zinc-400 pt-4">
              <a
                href="https://github.com/chandrakirannarala"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/chandrakirannarala/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="/assets/myresume.pdf"
                aria-label="Resume"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                <FileText size={22} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}