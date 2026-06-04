import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Auth — Procedra',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col">
      {/* Simple auth nav */}
      <nav className="h-14 flex items-center px-6 border-b border-border bg-white">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-accent flex items-center justify-center">
            <span className="text-white font-mono font-bold text-xs">P</span>
          </div>
          <span className="font-display font-bold text-base text-text-primary tracking-tight">Procedra</span>
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      <footer className="py-6 text-center">
        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} Procedra ·{' '}
          <Link href="/privacy" className="hover:text-text-primary">Privacy</Link>
          {' · '}
          <Link href="/terms" className="hover:text-text-primary">Terms</Link>
        </p>
      </footer>
    </div>
  )
}
