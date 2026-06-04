'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'

export default function OrganisationSettingsPage() {
  const [saving, setSaving] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => setSaving(false), 800)
  }

  return (
    <div>
      <div className="mb-6 pb-6 border-b border-border">
        <h2 className="font-display text-lg font-bold text-text-primary mb-1">Organisation Profile</h2>
        <p className="text-sm text-text-muted">Update your company details and logo.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Workspace Logo</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-accent flex items-center justify-center">
              <span className="text-white font-mono font-bold text-xl">M</span>
            </div>
            <div className="space-y-2">
              <Button variant="secondary" size="sm" type="button">Upload logo</Button>
              <p className="text-xs text-text-muted">Recommended size: 256x256px (PNG or JPG)</p>
            </div>
          </div>
        </div>

        <Input
          label="Company Name"
          defaultValue="Meridian Operations Ltd"
        />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">Workspace URL Slug</label>
          <div className="flex items-center">
            <span className="input-base border-r-0 bg-surface-secondary text-text-muted select-none rounded-none rounded-l-md sm:w-auto w-32 truncate">
              procedra.com/
            </span>
            <input
              type="text"
              defaultValue="meridian"
              disabled
              className="input-base bg-surface-secondary text-text-muted rounded-none rounded-r-md cursor-not-allowed"
            />
          </div>
          <p className="mt-1.5 text-xs text-text-muted">Slugs cannot be changed after creation. Contact support if you need to migrate.</p>
        </div>

        <div className="pt-6 border-t border-border">
          <h3 className="font-semibold text-sm text-text-primary mb-4">SOP Defaults</h3>
          <div className="space-y-4">
            <Select
              label="Default Review Frequency"
              options={[
                { value: '90', label: 'Every 3 months' },
                { value: '180', label: 'Every 6 months' },
                { value: '365', label: 'Annually' },
                { value: 'none', label: 'No scheduled review' },
              ]}
              defaultValue="365"
            />
            <Input
              label="SOP Numbering Format"
              defaultValue="SOP-{DEPT}-{NUM}"
              hint="Variables: {DEPT} (department code), {NUM} (sequential number), {YYYY} (year)"
            />
            <div className="bg-surface-secondary border border-border p-3 text-sm">
              <span className="text-text-muted">Preview: </span>
              <span className="font-mono text-text-primary font-medium">SOP-OPS-042</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <Button type="submit" loading={saving}>Save Changes</Button>
        </div>
      </form>
    </div>
  )
}
