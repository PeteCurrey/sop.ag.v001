'use client'

import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/index'
import { Check, ExternalLink } from 'lucide-react'

export default function BillingSettingsPage() {
  return (
    <div>
      <div className="mb-6 pb-6 border-b border-border flex items-start justify-between">
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary mb-1">Billing & Plan</h2>
          <p className="text-sm text-text-muted">Manage your subscription and view usage.</p>
        </div>
        <span className="text-xs font-mono bg-blue-50 text-accent border border-blue-200 px-2 py-1">
          14-Day Trial
        </span>
      </div>

      <div className="bg-surface-secondary border border-border p-6 mb-8">
        <h3 className="font-semibold text-text-primary mb-2">Growth Plan (Trial)</h3>
        <p className="text-sm text-text-muted mb-6">Your trial ends on <strong>June 18, 2026</strong>. Add a payment method to keep your workspace active.</p>
        
        <div className="flex gap-4">
          <Button variant="primary">Subscribe now</Button>
          <Button variant="secondary" className="gap-2">
            View past invoices <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="font-semibold text-text-primary mb-4">Current Usage</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="border border-border p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-primary">Active Team Members</span>
                <span className="text-xs font-mono text-text-muted">12 / 25</span>
              </div>
              <Progress value={48} className="mb-2" />
              <p className="text-xs text-text-muted">You are using 48% of your plan limit.</p>
            </div>
            
            <div className="border border-border p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-primary">Published SOPs</span>
                <span className="text-xs font-mono text-text-muted">24 / Unlimited</span>
              </div>
              <Progress value={100} showLabel={false} className="mb-2 [&>div>div]:bg-green-500" />
              <p className="text-xs text-text-muted">You have unlimited SOPs on the Growth plan.</p>
            </div>

            <div className="border border-border p-4 sm:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-primary">AI Generations (This month)</span>
                <span className="text-xs font-mono text-text-muted">18 / Unlimited</span>
              </div>
              <Progress value={100} showLabel={false} className="mb-2 [&>div>div]:bg-green-500" />
              <p className="text-xs text-text-muted">Your AI usage resets on the 1st of every month.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <h3 className="font-semibold text-text-primary mb-4">Plan Features</h3>
          <div className="grid sm:grid-cols-2 gap-y-3">
            {[
              'Up to 25 team members',
              'Unlimited active SOPs',
              'Unlimited AI generations',
              'Full version history',
              'Digital sign-offs',
              'Review reminders',
              'Custom branding',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-text-primary">
                <Check className="w-4 h-4 text-accent" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
