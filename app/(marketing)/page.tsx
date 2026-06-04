'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Scroll animation hook ─────────────────────────────
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    const el = ref.current
    if (el) {
      el.querySelectorAll('.animate-on-scroll').forEach((node) => observer.observe(node))
    }
    return () => observer.disconnect()
  }, [])
  return ref
}

// ─── Hero SOP Mock ─────────────────────────────────────
function SopMock() {
  return (
    <div className="bg-white border border-border" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}>
      {/* Header */}
      <div className="border-b border-border px-5 py-3 flex items-center justify-between bg-surface-secondary">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-text-muted">SOP-OPS-042</span>
          <span className="text-xs bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 font-mono uppercase tracking-wide">Active</span>
        </div>
        <span className="font-mono text-xs text-text-muted">v3</span>
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-base text-text-primary mb-1">
          New Employee Onboarding Procedure
        </h3>
        <p className="text-xs text-text-muted mb-4">Operations · HR · Last updated 2 days ago</p>

        {/* Steps */}
        <div className="space-y-3">
          {[
            { n: '01', title: 'Send system access request', role: 'HR Manager', done: true },
            { n: '02', title: 'Complete IT equipment checklist', role: 'IT Lead', done: true, critical: true },
            { n: '03', title: 'Schedule orientation sessions', role: 'Department Lead', done: false },
            { n: '04', title: 'Review and sign employee handbook', role: 'New Employee', done: false },
          ].map((step) => (
            <div
              key={step.n}
              className="flex items-start gap-3 p-3 border border-border"
              style={step.done ? { background: '#F5F4F1' } : {}}
            >
              <span className="font-mono text-xs font-semibold text-accent mt-0.5 w-6 shrink-0">{step.n}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm font-medium ${step.done ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                    {step.title}
                  </span>
                  {step.critical && (
                    <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 font-mono">CRITICAL</span>
                  )}
                </div>
                <span className="text-xs text-text-muted">{step.role}</span>
              </div>
              <div className={`w-4 h-4 border flex items-center justify-center shrink-0 mt-0.5 ${step.done ? 'bg-accent border-accent' : 'border-border'}`}>
                {step.done && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sign-off bar */}
        <div className="mt-4 p-3 bg-surface-secondary border border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted">Sign-off progress</span>
            <div className="flex -space-x-1">
              {['JM', 'SR', 'AK'].map((i) => (
                <div key={i} className="w-5 h-5 bg-accent text-white text-xs font-mono flex items-center justify-center border border-white" style={{ borderRadius: '50%', fontSize: '8px' }}>{i}</div>
              ))}
            </div>
          </div>
          <span className="font-mono text-xs text-accent">8/12 signed</span>
        </div>
      </div>
    </div>
  )
}

// ─── Features data ─────────────────────────────────────
const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    title: 'AI-Assisted Generation',
    desc: 'Describe a process in plain English, get a fully structured SOP in seconds — steps, roles, warnings included.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
      </svg>
    ),
    title: 'Version Control',
    desc: 'Every change is tracked. Full history, change summaries, and one-click rollback to any previous version.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      </svg>
    ),
    title: 'Role-Based Access',
    desc: 'Assign SOPs to teams, departments, or individuals. Control who can view, edit, or publish.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
      </svg>
    ),
    title: 'Digital Sign-Off',
    desc: 'Staff acknowledge procedures with a timestamped, auditable signature — no paper, no chasing.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
      </svg>
    ),
    title: 'Review Schedules',
    desc: 'Set expiry dates and automated review reminders. Never let a procedure go stale unnoticed.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 10v6m0 0-3-3m3 3 3-3m2 8H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>
      </svg>
    ),
    title: 'Multi-Format Export',
    desc: 'Export to PDF, or share via a live read-only link. Your SOPs, wherever your team needs them.',
  },
]

const testimonials = [
  {
    quote: "We replaced a 200-page shared drive of Word docs with Procedra in under a week. Onboarding time dropped by over 60%.",
    name: "Sarah Okonkwo",
    role: "Head of Operations",
    company: "Meridian Facilities Group",
  },
  {
    quote: "The AI generation is genuinely useful — not gimmicky. It drafts SOPs that our compliance team actually approves with minor edits.",
    name: "James Hartley",
    role: "Compliance Lead",
    company: "Northgate Healthcare Partners",
  },
  {
    quote: "Sign-off tracking alone saved us hours of chasing. The audit trail is exactly what our ISO 9001 assessors wanted to see.",
    name: "Rachel Mendes",
    role: "Quality Manager",
    company: "Vantage Logistics UK",
  },
]

export default function HomePage() {
  const pageRef = useScrollAnimation()

  return (
    <div ref={pageRef}>
      {/* ── HERO ────────────────────────────────────────── */}
      <section className="bg-surface-secondary bg-dot-grid border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-border text-xs text-text-muted font-mono mb-8">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                14-day free trial · No card required
              </div>

              <h1 className="font-display text-display-lg text-text-primary mb-6 text-balance">
                Build procedures that actually get followed.
              </h1>

              <p className="text-lg text-text-muted leading-relaxed mb-10 max-w-xl">
                Procedra turns your knowledge into AI-generated SOPs — structured, versioned, and distributed across your team in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/auth/signup" className="btn-primary text-base px-6 py-3">
                  Start free trial
                </Link>
                <Link href="/features" className="btn-secondary text-base px-6 py-3">
                  See how it works
                </Link>
              </div>

              <p className="mt-6 text-xs text-text-muted">
                Starter plan from £29/mo · Cancel any time
              </p>
            </div>

            <div className="animate-on-scroll">
              <SopMock />
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ───────────────────────────────── */}
      <section className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted text-center mb-10">
            Used by operations teams across FM, hospitality, healthcare, and logistics
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { stat: '2,400+', label: 'Procedures created' },
              { stat: '98%', label: 'Team adoption rate' },
              { stat: '72%', label: 'Reduction in onboarding time' },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center">
                <div className="font-mono text-3xl font-bold text-text-primary mb-1">{stat}</div>
                <div className="text-xs text-text-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────── */}
      <section className="py-24 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16 animate-on-scroll">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">How it works</p>
            <h2 className="font-display text-display-sm text-text-primary mb-4">
              From idea to enforced procedure in three steps.
            </h2>
            <p className="text-text-muted">
              No templates to configure, no formatting battles. Just describe your process and Procedra handles the rest.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                step: '01',
                title: 'Describe the process',
                desc: 'Type a plain-English description of any workflow, or upload an existing document. No template required.',
              },
              {
                step: '02',
                title: 'AI drafts the SOP',
                desc: 'Structured steps, assigned roles, safety warnings, and checklists — generated instantly and ready to edit.',
              },
              {
                step: '03',
                title: 'Publish and track',
                desc: 'Distribute to your team, assign owners, and track completion and digital sign-off in real time.',
              },
            ].map(({ step, title, desc }, i) => (
              <div
                key={step}
                className={`bg-white p-8 animate-on-scroll`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="font-mono text-4xl font-bold text-accent/20 block mb-6">{step}</span>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-3">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────── */}
      <section className="py-24 border-b border-border bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16 animate-on-scroll">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Platform features</p>
            <h2 className="font-display text-display-sm text-text-primary mb-4">
              Everything your operations team needs.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-white p-6 animate-on-scroll"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-9 h-9 border border-border flex items-center justify-center text-accent mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-sm text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ────────────────────────────── */}
      <section className="py-24 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Pricing</p>
            <h2 className="font-display text-display-sm text-text-primary mb-4">Simple, transparent pricing.</h2>
            <p className="text-text-muted">Start free, scale as you grow. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border border border-border max-w-4xl mx-auto">
            {[
              { name: 'Starter', price: '£29', desc: 'Up to 5 users, 50 SOPs', cta: 'Start free trial', featured: false },
              { name: 'Growth', price: '£79', desc: 'Up to 25 users, unlimited SOPs', cta: 'Start free trial', featured: true },
              { name: 'Enterprise', price: 'Custom', desc: 'Unlimited users, dedicated support', cta: 'Contact us', featured: false },
            ].map(({ name, price, desc, cta, featured }) => (
              <div
                key={name}
                className={`bg-white p-8 animate-on-scroll ${featured ? 'relative' : ''}`}
              >
                {featured && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
                )}
                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">{name}</p>
                <div className="font-mono text-3xl font-bold text-text-primary mb-1">
                  {price}
                  {price !== 'Custom' && <span className="text-sm font-normal text-text-muted">/mo</span>}
                </div>
                <p className="text-sm text-text-muted mb-8">{desc}</p>
                <Link
                  href={name === 'Enterprise' ? '/pricing#enterprise' : '/auth/signup'}
                  className={featured ? 'btn-primary w-full text-center block' : 'btn-secondary w-full text-center block'}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center mt-6 text-xs text-text-muted">
            <Link href="/pricing" className="text-accent hover:underline">
              See full pricing breakdown →
            </Link>
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────── */}
      <section className="py-24 border-b border-border bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 animate-on-scroll">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">What teams say</p>
            <h2 className="font-display text-display-sm text-text-primary">
              Trusted by operations professionals.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="bg-white p-8 animate-on-scroll"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <p className="text-sm text-text-primary leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-muted mt-0.5">{t.role} · {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────── */}
      <section className="bg-primary py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-display-md text-white mb-4 animate-on-scroll">
            Operational clarity starts here.
          </h2>
          <p className="text-gray-400 mb-10 text-lg animate-on-scroll" style={{ animationDelay: '100ms' }}>
            Join operations teams who've moved beyond shared drives and Word docs.
          </p>
          <Link
            href="/auth/signup"
            className="btn-base bg-accent text-white border border-accent px-8 py-4 text-base hover:bg-accent-hover animate-on-scroll"
            style={{ animationDelay: '200ms' }}
          >
            Start your free trial
          </Link>
          <p className="mt-6 text-xs text-gray-600 font-mono animate-on-scroll" style={{ animationDelay: '300ms' }}>
            14 days free · No credit card required · Cancel any time
          </p>
        </div>
      </section>
    </div>
  )
}
