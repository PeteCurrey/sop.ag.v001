import Link from 'next/link'

const footerLinks = {
  Product: [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/about#mission', label: 'Mission' },
    { href: '/blog', label: 'Blog' },
    { href: '/auth/signup', label: 'Get Started' },
  ],
  Resources: [
    { href: '/features', label: 'Documentation' },
    { href: '/pricing', label: 'Pricing' },
    { href: '#', label: 'API Reference' },
    { href: '#', label: 'Status' },
  ],
  Legal: [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Cookie Policy' },
    { href: '#', label: 'Security' },
  ],
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-accent flex items-center justify-center">
                <span className="text-white font-mono font-bold text-xs">P</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-text-primary">
                Procedra
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Standard procedures.<br />Exceptional operations.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-primary mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text-primary transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-mono">
            © {new Date().getFullYear()} Procedra. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Built for operations teams who take process seriously.
          </p>
        </div>
      </div>
    </footer>
  )
}
