'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/index'

export default function ProfileSettingsPage() {
  const [saving, setSaving] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => setSaving(false), 800)
  }

  return (
    <div>
      <div className="mb-6 pb-6 border-b border-border flex items-start justify-between">
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary mb-1">Personal Profile</h2>
          <p className="text-sm text-text-muted">Update your personal details and notification preferences.</p>
        </div>
        <span className="text-xs font-mono bg-surface-secondary text-text-muted border border-border px-2 py-1">
          Role: Admin
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Avatar</label>
          <div className="flex items-center gap-4">
            <Avatar name="Sarah Okonkwo" size="lg" />
            <div className="space-y-2">
              <Button variant="secondary" size="sm" type="button">Upload avatar</Button>
              <p className="text-xs text-text-muted">Recommended size: 256x256px (PNG or JPG)</p>
            </div>
          </div>
        </div>

        <Input
          label="Full Name"
          defaultValue="Sarah Okonkwo"
        />

        <Input
          label="Email Address"
          defaultValue="sarah@company.com"
          disabled
          hint="Email addresses are managed via your Supabase account settings."
        />

        <div className="pt-6 border-t border-border">
          <h3 className="font-semibold text-sm text-text-primary mb-4">Email Notifications</h3>
          <div className="space-y-3">
            {[
              { id: 'n1', label: 'When a SOP is assigned to me for sign-off', defaultChecked: true },
              { id: 'n2', label: 'When a SOP I authored is due for review', defaultChecked: true },
              { id: 'n3', label: 'When a team member joins the workspace', defaultChecked: false },
              { id: 'n4', label: 'When a new SOP is published (Admin only)', defaultChecked: true },
            ].map((pref) => (
              <label key={pref.id} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={pref.defaultChecked}
                  className="mt-0.5 border-border text-accent focus:ring-accent rounded-none"
                />
                <span className="text-sm text-text-primary select-none">{pref.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <h3 className="font-semibold text-sm text-text-primary mb-4">Password</h3>
          <Button variant="secondary" type="button">Change Password</Button>
        </div>

        <div className="pt-6 border-t border-border">
          <Button type="submit" loading={saving}>Save Changes</Button>
        </div>
      </form>
    </div>
  )
}
