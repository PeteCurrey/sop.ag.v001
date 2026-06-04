import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Features — Procedra',
  description: 'Explore every feature of the Procedra SOP management platform — AI generation, version control, digital sign-off, and more.',
}

const featureCategories = [
  {
    id: 'sop-creation',
    label: 'SOP Creation',
    title: 'A structured editor built for procedures, not prose.',
    description: 'Every SOP in Procedra follows a consistent, structured format — purpose, scope, roles, equipment, numbered steps, checklists, and references. The editor enforces quality without constraining the author.',
    features: [
      { title: 'Structured document format', desc: 'Every SOP has a defined anatomy: purpose, scope, roles, steps, and references. No freeform chaos.' },
      { title: 'Numbered step editor', desc: 'Steps are numbered automatically. Drag to reorder. Each step has a title, description, responsible role, warning field, and critical step flag.' },
      { title: 'Checklist items per step', desc: 'Add verifiable checklist items within any step. Ideal for audit-ready procedures where sub-tasks matter.' },
      { title: 'Warning flags', desc: 'Mark steps with warnings — amber alerts for safety, quality, or compliance risks. Visible at a glance when reviewing.' },
    ],
    mock: (
      <div className="border border-border bg-white p-4">
        <div className="space-y-2">
          {['01 · Send access request', '02 · Configure workstation', '03 · Complete induction training'].map((s, i) => (
            <div key={s} className="flex items-center gap-3 p-3 border border-border text-sm">
              <span className="font-mono text-xs text-accent w-4">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-text-primary">{s.split(' · ')[1]}</span>
              {i === 1 && <span className="ml-auto text-xs bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 font-mono">CRITICAL</span>}
            </div>
          ))}
          <div className="border border-dashed border-border p-3 text-xs text-text-muted text-center">+ Add step</div>
        </div>
      </div>
    ),
  },
  {
    id: 'ai-generation',
    label: 'AI Generation',
    title: 'Go from description to structured SOP in seconds.',
    description: 'Describe any business process in plain English and Procedra generates a complete, structured SOP — with steps, roles, warnings, and checklists — using Claude AI. Review, edit, then publish. No starting from scratch.',
    features: [
      { title: 'Natural language input', desc: 'Write as you would explain the process to a new hire. No special syntax required.' },
      { title: 'Document upload', desc: 'Upload an existing PDF, Word doc, or text file and use it as the basis for AI generation.' },
      { title: 'Structured JSON output', desc: 'AI response is parsed into the exact SOP structure — not dumped as unformatted text.' },
      { title: 'Generation quotas per plan', desc: 'Starter: 20/month. Growth and Enterprise: unlimited. Usage tracked transparently.' },
    ],
    mock: (
      <div className="border border-border bg-white">
        <div className="p-4 border-b border-border bg-surface-secondary">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">AI Generator</p>
        </div>
        <div className="p-4">
          <div className="border border-border p-3 text-sm text-text-muted mb-3 bg-surface-secondary min-h-[60px]">
            "Describe the monthly stock inventory count process for a warehouse environment..."
          </div>
          <div className="flex gap-2">
            <div className="flex-1 border border-accent bg-accent/5 px-3 py-2 text-xs text-accent font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Generating SOP...
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'version-control',
    label: 'Version Control & Approvals',
    title: 'Every change tracked. Every version preserved.',
    description: 'Publishing a change to a SOP creates a new version automatically. Full history is preserved with the name of who published it, when, and a summary of what changed. Any version can be restored.',
    features: [
      { title: 'Immutable version history', desc: 'Published versions are locked. Edits always produce a new version — nothing is overwritten.' },
      { title: 'Change summaries', desc: 'When publishing, authors add a plain-English summary of what changed — visible in the version history panel.' },
      { title: 'Version restore', desc: 'Any previous version can be opened as a read-only snapshot, then promoted to a new draft for editing.' },
      { title: 'Status workflow', desc: 'SOPs move through Draft → Active → Under Review → Archived. Status transitions are logged in the audit trail.' },
    ],
    mock: (
      <div className="border border-border bg-white divide-y divide-border">
        {[
          { v: 'v3', note: 'Updated PPE requirements for step 4', by: 'Rachel M.', date: '2 days ago', current: true },
          { v: 'v2', note: 'Added equipment checklist', by: 'James H.', date: '3 weeks ago', current: false },
          { v: 'v1', note: 'Initial publication', by: 'Sarah O.', date: '2 months ago', current: false },
        ].map((ver) => (
          <div key={ver.v} className="px-4 py-3 flex items-start gap-3">
            <span className="font-mono text-xs font-bold text-accent mt-0.5 w-5">{ver.v}</span>
            <div className="flex-1">
              <p className="text-xs text-text-primary mb-0.5">{ver.note}</p>
              <p className="text-xs text-text-muted">{ver.by} · {ver.date}</p>
            </div>
            {ver.current && <span className="text-xs bg-green-50 text-green-800 border border-green-200 px-1.5 py-0.5 font-mono">Current</span>}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'team-management',
    label: 'Team Management',
    title: 'The right people see the right procedures.',
    description: 'Invite team members, set their role, and organise by department. Procedra enforces permissions automatically — admins publish, members draft, viewers read.',
    features: [
      { title: 'Three permission levels', desc: 'Admin, Member, Viewer. Each role has precise permissions over creation, publishing, archiving, and team management.' },
      { title: 'Department grouping', desc: 'Organise SOPs and users into departments. Filter and assign at department level.' },
      { title: 'Email invites', desc: 'Invite team members by email. They receive a branded invite with a direct link to accept and set their password.' },
      { title: 'Audit trail', desc: 'Every action by every user is logged — who did what, to which SOP, at what time.' },
    ],
    mock: (
      <div className="border border-border bg-white divide-y divide-border">
        <div className="px-4 py-2 bg-surface-secondary grid grid-cols-4 text-xs font-semibold text-text-muted uppercase tracking-wide">
          <span>Name</span><span>Role</span><span>Dept</span><span>SOPs</span>
        </div>
        {[
          { name: 'Sarah O.', role: 'Admin', dept: 'Operations', sops: 24 },
          { name: 'James H.', role: 'Member', dept: 'Compliance', sops: 12 },
          { name: 'Rachel M.', role: 'Member', dept: 'Quality', sops: 9 },
        ].map((u) => (
          <div key={u.name} className="px-4 py-3 grid grid-cols-4 text-sm">
            <span className="font-medium text-text-primary">{u.name}</span>
            <span className="text-text-muted text-xs">{u.role}</span>
            <span className="text-text-muted text-xs">{u.dept}</span>
            <span className="font-mono text-xs text-accent">{u.sops}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'distribution',
    label: 'Distribution & Sign-Off',
    title: 'Assign, acknowledge, done.',
    description: 'Assign SOPs to individual team members or entire departments. Each assignee receives a notification and completes a digital sign-off once they\'ve read the procedure. All sign-offs are timestamped and auditable.',
    features: [
      { title: 'User and department assignment', desc: 'Assign a SOP to specific users or whole departments. Both are tracked independently.' },
      { title: 'Digital sign-off', desc: 'Staff sign off within Procedra. Each signature is timestamped and linked to the exact version they acknowledged.' },
      { title: 'Public share links', desc: 'Generate a read-only link for any published SOP — no login required. Share with contractors or external auditors.' },
      { title: 'Email reminders', desc: 'Automated sign-off reminder emails sent on assignment and again if overdue.' },
    ],
    mock: (
      <div className="border border-border bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-text-primary">Sign-off progress</span>
          <span className="font-mono text-xs text-accent">8 / 12</span>
        </div>
        <div className="h-1.5 bg-border mb-4 overflow-hidden">
          <div className="h-full bg-accent" style={{ width: '66%' }} />
        </div>
        <div className="space-y-2">
          {[
            { name: 'Sarah O.', signed: true, date: 'Jun 2' },
            { name: 'James H.', signed: true, date: 'Jun 3' },
            { name: 'Priya K.', signed: false, date: 'Pending' },
          ].map((u) => (
            <div key={u.name} className="flex items-center gap-3 text-sm">
              <div className={`w-4 h-4 border flex items-center justify-center ${u.signed ? 'bg-accent border-accent' : 'border-border'}`}>
                {u.signed && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span className={u.signed ? 'text-text-primary' : 'text-text-muted'}>{u.name}</span>
              <span className="ml-auto font-mono text-xs text-text-muted">{u.date}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'analytics',
    label: 'Analytics & Reporting',
    title: 'Know the health of your procedures at a glance.',
    description: 'Four built-in reports give you a complete picture of SOP compliance, review status, team activity, and AI usage — all exportable to CSV.',
    features: [
      { title: 'Sign-off compliance report', desc: 'Sign-off rate per SOP, filterable by department. See who hasn\'t acknowledged at a glance.' },
      { title: 'SOP health dashboard', desc: 'Traffic-light grid of SOPs by review status — overdue (red), due soon (amber), up to date (green).' },
      { title: 'Activity timeline', desc: 'Full audit log of every action with filters for user, action type, and date range.' },
      { title: 'AI usage tracking', desc: 'Monthly generation count vs plan limit. Bar chart trend. Log of every generation with prompt snippet.' },
    ],
    mock: (
      <div className="border border-border bg-white p-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[{ l: 'Up to date', c: 'bg-green-50 border-green-200 text-green-800', n: 18 }, { l: 'Due soon', c: 'bg-amber-50 border-amber-200 text-amber-800', n: 4 }, { l: 'Overdue', c: 'bg-red-50 border-red-200 text-red-800', n: 2 }].map(b => (
            <div key={b.l} className={`border p-3 text-center ${b.c}`}>
              <div className="font-mono text-xl font-bold">{b.n}</div>
              <div className="text-xs mt-0.5">{b.l}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-text-muted text-center font-mono">SOP Health Overview · 24 total SOPs</div>
      </div>
    ),
  },
  {
    id: 'integrations',
    label: 'Integrations',
    title: 'Connect the tools your team already uses.',
    description: 'Growth and Enterprise plans include integrations with Slack, Zapier, and direct API access — so Procedra fits into your existing workflow rather than replacing it.',
    features: [
      { title: 'Slack notifications', desc: 'Post a message to any channel when a SOP is published, sign-off is due, or review is overdue.' },
      { title: 'Zapier webhook', desc: 'Fire an outbound webhook on any SOP event. Connect to 5,000+ apps without writing code.' },
      { title: 'REST API', desc: 'Enterprise tier includes full API access to read, create, and update SOPs programmatically. API key management in settings.' },
      { title: 'Supabase storage', desc: 'Logos, uploaded documents, and generated assets stored securely. CDN-backed delivery.' },
    ],
    mock: (
      <div className="border border-border bg-white divide-y divide-border">
        {[
          { name: 'Slack', status: 'Connected', detail: '#operations-alerts' },
          { name: 'Zapier', status: 'Not connected', detail: 'Growth plan' },
          { name: 'REST API', status: 'Active', detail: '2 keys generated' },
        ].map((i) => (
          <div key={i.name} className="px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">{i.name}</p>
              <p className="text-xs text-text-muted">{i.detail}</p>
            </div>
            <span className={`text-xs font-mono px-2 py-0.5 border ${i.status === 'Connected' || i.status === 'Active' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-gray-100 text-text-muted border-gray-200'}`}>
              {i.status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
]

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sticky sidebar */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-16 pt-12 px-6 pb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">Features</p>
          <nav className="space-y-1">
            {featureCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="block py-1.5 text-sm text-text-muted hover:text-text-primary transition-colors border-l-2 border-transparent hover:border-accent pl-3"
              >
                {cat.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 pt-8 border-t border-border">
            <Link href="/auth/signup" className="btn-primary w-full text-center text-xs py-2.5 block">
              Start free trial
            </Link>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 border-l border-border">
        <div className="max-w-3xl px-8 lg:px-12 py-16">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Platform Features</p>
            <h1 className="font-display text-display-sm text-text-primary mb-4">
              Every tool your operations team needs.
            </h1>
            <p className="text-text-muted text-lg leading-relaxed">
              Procedra is a complete SOP management platform — from first draft to signed acknowledgement and scheduled review.
            </p>
          </div>

          <div className="space-y-24">
            {featureCategories.map((cat) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-20">
                <div className="border-t border-border pt-12">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">{cat.label}</p>
                  <h2 className="font-display text-display-sm text-text-primary mb-4">{cat.title}</h2>
                  <p className="text-text-muted leading-relaxed mb-8">{cat.description}</p>

                  <div className="mb-8">{cat.mock}</div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {cat.features.map((f) => (
                      <div key={f.title} className="p-4 border border-border">
                        <h3 className="text-sm font-semibold text-text-primary mb-1">{f.title}</h3>
                        <p className="text-sm text-text-muted">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-24 pt-12 border-t border-border bg-primary p-12 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-4">
              Ready to build better procedures?
            </h2>
            <Link href="/auth/signup" className="btn-base bg-accent text-white border border-accent px-8 py-3 inline-flex">
              Start your free trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
