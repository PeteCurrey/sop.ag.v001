'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const settingsLinks = [
  { href: '/app/settings/organisation', label: 'Organisation' },
  { href: '/app/settings/billing', label: 'Billing & Plan' },
  { href: '/app/settings/integrations', label: 'Integrations' },
  { href: '/app/settings/profile', label: 'Personal Profile' },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-primary mb-1">Settings</h1>
        <p className="text-sm text-text-muted">Manage your workspace, billing, and personal preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <nav className="w-full md:w-56 shrink-0 space-y-1">
          {settingsLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2.5 text-sm transition-colors duration-150 border-l-2 focus-ring ${
                pathname === link.href
                  ? 'border-accent bg-white font-medium text-accent'
                  : 'border-transparent text-text-muted hover:text-text-primary hover:border-border'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1 w-full bg-white border border-border p-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
