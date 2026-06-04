import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FileDown, AlertTriangle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

// In a real implementation, we would query Supabase for the SOP by the public_share_token.
// For this demo scaffold, we'll render a static read-only view.

export default async function PublicSopViewPage({ params }: { params: { token: string } }) {
  // const supabase = await createClient()
  // const { data: sop } = await supabase.from('sops').select('*').eq('public_share_token', params.token).single()
  // if (!sop) notFound()

  // Mock data for the static view
  const sop = {
    title: 'New Employee Onboarding Procedure',
    version: '3.0',
    status: 'active' as const,
    updatedAt: 'June 2, 2026',
    department: 'HR',
    purpose: 'To ensure a consistent, welcoming, and compliant onboarding experience for all new hires across the organisation.',
    scope: 'All permanent and contract staff joining Meridian Ltd.',
    roles: 'HR Manager, IT Lead, Dept Head',
    equipment: 'Standard issue laptop, Access fob',
    steps: [
      {
        title: 'Preparation',
        description: 'Ensure all materials are ready.',
        responsibleRole: 'HR Manager',
        warning: '',
        isCritical: false,
      },
      {
        title: 'Execution',
        description: 'Follow the main process carefully. Connect the laptop to the secure network and install the management profile.',
        responsibleRole: 'IT Lead',
        warning: 'Do not connect to the guest network during setup.',
        isCritical: true,
      }
    ],
    orgName: 'Meridian Operations Ltd'
  }

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col">
      {/* Read-only header */}
      <header className="bg-white border-b border-border h-16 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-accent flex items-center justify-center">
            <span className="text-white font-mono font-bold text-sm">M</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary leading-tight">{sop.orgName}</p>
            <p className="text-xs text-text-muted">Standard Operating Procedure</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" className="gap-2">
            <FileDown className="w-4 h-4" /> Download PDF
          </Button>
          <Link href="/" className="text-xs text-text-muted hover:text-text-primary transition-colors hidden sm:block">
            Powered by Procedra
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Read-only banner */}
          <div className="bg-blue-50 border border-blue-200 p-3 mb-6 flex items-center justify-center text-sm text-blue-800">
            You are viewing a shared read-only copy of this procedure.
          </div>

          <div className="bg-white border border-border p-8 mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="flex items-start justify-between mb-8 pb-8 border-b border-border">
              <div>
                <h1 className="font-display text-display-sm text-text-primary mb-3">{sop.title}</h1>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span className="font-mono text-xs bg-surface-secondary px-2 py-0.5 border border-border">v{sop.version}</span>
                  <span>{sop.department}</span>
                  <span>Last updated {sop.updatedAt}</span>
                  <StatusBadge status={sop.status} />
                </div>
              </div>
            </div>

            <div className="grid gap-8 mb-12">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-2">Purpose</h2>
                <p className="text-text-primary leading-relaxed">{sop.purpose}</p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-2">Scope</h2>
                <p className="text-text-primary leading-relaxed">{sop.scope}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-2">Roles Involved</h2>
                  <p className="text-text-primary">{sop.roles}</p>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-2">Equipment / Tools</h2>
                  <p className="text-text-primary">{sop.equipment}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold text-text-primary pb-4 border-b border-border">Procedure Steps</h2>
              
              {sop.steps.map((step, index) => (
                <div key={index} className="flex gap-6 pt-4">
                  <div className="font-mono text-2xl font-bold text-accent shrink-0 w-12 text-right">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg text-text-primary">{step.title}</h3>
                      <span className="text-xs bg-surface-secondary text-text-muted border border-border px-2 py-0.5 font-mono">
                        {step.responsibleRole}
                      </span>
                    </div>

                    {step.isCritical && (
                      <div className="inline-block text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-1 font-mono font-semibold mb-3">
                        CRITICAL STEP
                      </div>
                    )}

                    {step.warning && (
                      <div className="bg-amber-50 border border-amber-200 p-3 mb-3 flex gap-3 text-sm text-amber-900">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
                        <p>{step.warning}</p>
                      </div>
                    )}

                    <div 
                      className="prose prose-sm max-w-none text-text-primary"
                      dangerouslySetInnerHTML={{ __html: step.description }} 
                      // In real app, the description is HTML from Tiptap. For this demo we just output it.
                    />
                    <p className="text-text-primary mt-2">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
