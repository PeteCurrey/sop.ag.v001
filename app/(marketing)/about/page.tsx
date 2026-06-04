import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Procedra — Our Mission',
  description: 'Procedra is built for operations teams who believe that documented, enforced processes are the foundation of reliable businesses.',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-surface-secondary border-b border-border py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-6">About Procedra</p>
          <h1 className="font-display text-display-md text-text-primary mb-6 text-balance">
            The operations layer most businesses are missing.
          </h1>
          <p className="text-xl text-text-muted leading-relaxed max-w-2xl">
            Procedra exists because shared drives full of outdated Word documents aren't a system — they're a liability.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 border-b border-border bg-white">
        <div className="max-w-4xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-6">Our mission</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              We believe that every team — regardless of size or industry — deserves documented, enforced, and maintained operating procedures. Not because regulators demand it, but because it's how reliable businesses work.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              Procedra makes it practical. We combine AI-assisted generation with real document management — so the barrier to creating and maintaining SOPs is as low as it can be.
            </p>
            <p className="text-text-muted leading-relaxed">
              A procedure that exists but isn't followed is useless. Procedra closes the loop: from creation, through distribution, to sign-off — all tracked, all auditable.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-6">The problem we solve</h2>
            <div className="space-y-4">
              {[
                { title: 'Procedures live in email', desc: 'Critical knowledge is trapped in someone\'s inbox or their head. When they leave, it leaves with them.' },
                { title: 'Documents go stale', desc: 'A 2019 SOP is often worse than no SOP — it builds false confidence in outdated processes.' },
                { title: 'No accountability loop', desc: 'Sharing a document doesn\'t mean anyone has read it. There\'s no trail, no sign-off, no enforcement.' },
                { title: 'Updates are chaotic', desc: 'v2_FINAL_updated_JH.docx. We\'ve all seen it. Version chaos is a compliance and operational risk.' },
              ].map((p) => (
                <div key={p.title} className="flex gap-4 p-4 border border-border">
                  <div className="w-1 bg-destructive shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-1">{p.title}</h3>
                    <p className="text-sm text-text-muted">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-b border-border bg-surface-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-12">What we stand for</h2>
          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
            {[
              { title: 'Clarity over cleverness', desc: 'A good SOP is clear and actionable. Procedra nudges you toward clarity — structured fields, numbered steps, assigned roles.' },
              { title: 'Structure without bureaucracy', desc: 'We give procedures the structure they need to be enforceable, without adding administrative overhead.' },
              { title: 'Accountability with dignity', desc: 'Sign-off tracking isn\'t about surveillance — it\'s about ensuring knowledge reaches the people who need it.' },
              { title: 'AI as a starting point', desc: 'AI generates the first draft. Humans improve it. The system enforces it. That\'s the right division of labour.' },
            ].map((v) => (
              <div key={v.title} className="bg-white p-8">
                <h3 className="font-semibold text-text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">Start building better procedures.</h2>
          <p className="text-gray-400 mb-8">14-day free trial. No credit card required.</p>
          <Link href="/auth/signup" className="btn-base bg-accent text-white border border-accent px-8 py-3 inline-flex">
            Create your account
          </Link>
        </div>
      </section>
    </div>
  )
}
