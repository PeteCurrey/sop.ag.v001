'use client'

import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'

export default function IntegrationsSettingsPage() {
  return (
    <div>
      <div className="mb-6 pb-6 border-b border-border">
        <h2 className="font-display text-lg font-bold text-text-primary mb-1">Integrations</h2>
        <p className="text-sm text-text-muted">Connect Procedra to the tools your team already uses.</p>
      </div>

      <div className="space-y-6">
        {/* Slack */}
        <div className="border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522v-2.521zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.523-2.522v-2.522h2.523zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.523-2.52h6.312A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.52h-6.313z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-text-primary mb-1">Slack</h3>
              <p className="text-xs text-text-muted mb-2">Send notifications to channels when SOPs are published or due for review.</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-mono text-text-muted">Connected to #operations-alerts</span>
              </div>
            </div>
          </div>
          <Button variant="secondary" size="sm">Configure</Button>
        </div>

        {/* Zapier */}
        <div className="border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0 font-bold text-accent font-display">
              Z
            </div>
            <div>
              <h3 className="font-semibold text-sm text-text-primary mb-1">Zapier</h3>
              <p className="text-xs text-text-muted">Trigger actions in 5,000+ apps based on events in Procedra.</p>
            </div>
          </div>
          <Button variant="secondary" size="sm">Connect</Button>
        </div>

        {/* API Keys */}
        <div className="pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-text-primary">API Keys</h3>
              <p className="text-xs text-text-muted">Manage access tokens for the Procedra REST API. (Enterprise only)</p>
            </div>
            <Button variant="secondary" size="sm" className="gap-1" disabled>
              <Plus className="w-4 h-4" /> Generate Key
            </Button>
          </div>
          <div className="bg-surface-secondary border border-border p-4 text-center">
            <p className="text-sm text-text-muted">API access is available on the Enterprise plan.</p>
            <button className="text-xs text-accent hover:underline mt-2">Contact sales to upgrade</button>
          </div>
        </div>
      </div>
    </div>
  )
}
