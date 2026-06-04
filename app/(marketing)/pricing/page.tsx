'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Accordion } from '@/components/ui/Accordion'
import { Check, Minus } from 'lucide-react'

const tiers = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 29,
    annual: 23,
    desc: 'For small teams getting started with structured procedures.',
    users: 'Up to 5 users',
    sops: 'Up to 50 SOPs',
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly: 79,
    annual: 63,
    desc: 'For growing operations teams who need scale and customisation.',
    users: 'Up to 25 users',
    sops: 'Unlimited SOPs',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: null,
    annual: null,
    desc: 'For large organisations needing SSO, API access, and dedicated support.',
    users: 'Unlimited users',
    sops: 'Unlimited SOPs',
    featured: false,
  },
]

const featureMatrix = [
  { label: 'Users', starter: 'Up to 5', growth: 'Up to 25', enterprise: 'Unlimited' },
  { label: 'SOPs', starter: 'Up to 50', growth: 'Unlimited', enterprise: 'Unlimited' },
  { label: 'AI generations/month', starter: '20', growth: 'Unlimited', enterprise: 'Unlimited' },
  { label: 'Version history', starter: '30 days', growth: 'Full', enterprise: 'Full' },
  { label: 'Digital sign-off', starter: true, growth: true, enterprise: true },
  { label: 'Review reminders', starter: false, growth: true, enterprise: true },
  { label: 'Custom branding', starter: false, growth: true, enterprise: true },
  { label: 'SSO / SAML', starter: false, growth: false, enterprise: true },
  { label: 'Dedicated support', starter: false, growth: false, enterprise: true },
  { label: 'API access', starter: false, growth: false, enterprise: true },
]

const faq = [
  { id: 'trial', question: 'How does the free trial work?', answer: 'Every new account gets 14 days on Growth plan features, no credit card required. At the end of your trial, you choose a plan or your account moves to read-only until you subscribe.' },
  { id: 'cancel', question: 'Can I cancel at any time?', answer: 'Yes. Cancel from your billing settings at any time. You keep access until the end of your current billing period. No penalties, no questions.' },
  { id: 'upgrade', question: 'Can I upgrade or downgrade my plan?', answer: 'Yes, at any time. Upgrades take effect immediately. Downgrades take effect at the end of your current billing period. Prorated credits are applied automatically.' },
  { id: 'data', question: 'What happens to my data if I cancel?', answer: 'Your SOPs, versions, and sign-off records are retained for 90 days after cancellation. You can export everything as PDF or CSV at any time before then.' },
  { id: 'users', question: 'How are users counted?', answer: 'Any person with a Procedra account in your organisation counts as a user — regardless of role. Viewers count the same as Admins.' },
  { id: 'annual', question: 'What is the annual billing discount?', answer: 'Annual billing saves 20% on Starter and Growth plans. Billed as a single annual charge, shown as a monthly equivalent on pricing.' },
  { id: 'enterprise', question: 'How does Enterprise pricing work?', answer: 'Enterprise is custom-quoted based on user count, required features, and support level. Contact us for a tailored proposal — we typically respond within one business day.' },
  { id: 'security', question: 'Is Procedra SOC 2 compliant?', answer: 'Procedra is built on Supabase (SOC 2 Type II certified infrastructure) and Stripe (PCI DSS Level 1). Application-level SOC 2 compliance documentation is available to Enterprise customers on request.' },
]

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-accent mx-auto" />
  if (value === false) return <Minus className="w-4 h-4 text-border mx-auto" />
  return <span className="text-sm text-text-primary font-mono">{value}</span>
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div>
      {/* Header */}
      <section className="bg-surface-secondary bg-dot-grid border-b border-border py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-display-md text-text-primary mb-4">
            Simple, transparent pricing.
          </h1>
          <p className="text-text-muted text-lg mb-10">
            Start free. No credit card required. Scale as your team grows.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 bg-white border border-border px-4 py-2">
            <span className={`text-sm ${!annual ? 'text-text-primary font-medium' : 'text-text-muted'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-10 h-5 transition-colors duration-200 ${annual ? 'bg-accent' : 'bg-border'}`}
              style={{ borderRadius: '999px' }}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white transition-transform duration-200`}
                style={{
                  borderRadius: '50%',
                  left: '2px',
                  transform: annual ? 'translateX(20px)' : 'translateX(0)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }}
              />
            </button>
            <span className={`text-sm ${annual ? 'text-text-primary font-medium' : 'text-text-muted'}`}>
              Annual
              <span className="ml-2 text-xs bg-accent text-white px-1.5 py-0.5 font-mono">Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Tier cards */}
      <section className="py-16 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {tiers.map((tier) => (
              <div key={tier.id} className="bg-white p-8 relative">
                {tier.featured && <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />}
                {tier.featured && (
                  <div className="absolute top-4 right-4 text-xs bg-accent text-white px-2 py-0.5 font-mono">Most popular</div>
                )}

                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">{tier.name}</p>

                {tier.monthly !== null ? (
                  <div className="mb-2">
                    <span className="font-mono text-4xl font-bold text-text-primary">
                      £{annual ? tier.annual : tier.monthly}
                    </span>
                    <span className="text-sm text-text-muted">/mo</span>
                  </div>
                ) : (
                  <div className="font-mono text-4xl font-bold text-text-primary mb-2">Custom</div>
                )}

                {annual && tier.monthly && (
                  <p className="text-xs text-text-muted mb-4 font-mono">Billed annually · Save £{(tier.monthly - tier.annual!) * 12}/yr</p>
                )}

                <p className="text-sm text-text-muted mb-6">{tier.desc}</p>

                <div className="space-y-1.5 mb-8 text-sm text-text-muted">
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" />{tier.users}</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent shrink-0" />{tier.sops}</div>
                </div>

                {tier.id === 'enterprise' ? (
                  <a href="mailto:hello@procedra.com" className="btn-secondary w-full text-center block">
                    Contact sales
                  </a>
                ) : (
                  <Link href="/auth/signup" className={tier.featured ? 'btn-primary w-full text-center block' : 'btn-secondary w-full text-center block'}>
                    Start free trial
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature matrix */}
      <section className="py-16 border-b border-border bg-surface-secondary">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-xl font-bold text-text-primary mb-8">Full feature comparison</h2>
          <div className="border border-border bg-white overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-secondary">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide w-1/2">Feature</th>
                  {tiers.map((t) => (
                    <th key={t.id} className="px-4 py-3 text-center text-xs font-semibold text-text-muted uppercase tracking-wide">
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {featureMatrix.map((row) => (
                  <tr key={row.label} className="hover:bg-surface-secondary">
                    <td className="px-4 py-3 text-sm text-text-primary">{row.label}</td>
                    <td className="px-4 py-3 text-center"><CellValue value={row.starter} /></td>
                    <td className="px-4 py-3 text-center"><CellValue value={row.growth} /></td>
                    <td className="px-4 py-3 text-center"><CellValue value={row.enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-display-sm text-text-primary mb-10">Frequently asked questions</h2>
          <Accordion items={faq} />
          <div className="mt-12 text-center">
            <p className="text-sm text-text-muted mb-4">Still have questions?</p>
            <a href="mailto:hello@procedra.com" className="btn-secondary">
              Email us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
