'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-40 bg-surface transition-all duration-150',
          scrolled && 'border-b border-border'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 focus-ring">
            <div className="w-7 h-7 bg-accent flex items-center justify-center">
              <span className="text-white font-mono font-bold text-xs">P</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-text-primary">
              Procedra
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm transition-colors duration-150 focus-ring',
                  pathname === link.href
                    ? 'text-text-primary font-medium'
                    : 'text-text-muted hover:text-text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm text-text-muted hover:text-text-primary transition-colors duration-150 focus-ring"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="btn-primary text-sm px-4 py-2"
            >
              Start free trial
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-text-primary focus-ring"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-surface pt-16 flex flex-col">
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-3 text-lg font-medium text-text-primary hover:bg-surface-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="p-6 border-t border-border flex flex-col gap-3 mt-auto">
            <Link href="/auth/login" className="btn-secondary text-center py-3">
              Log in
            </Link>
            <Link href="/auth/signup" className="btn-primary text-center py-3">
              Start free trial
            </Link>
          </div>
        </div>
      )}

      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  )
}
