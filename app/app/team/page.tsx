'use client'

import { useState } from 'react'
import { Plus, MoreVertical, Search, Shield, User, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input, Select } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/index'

const mockTeam = [
  { id: '1', name: 'Sarah Okonkwo', email: 'sarah@company.com', role: 'Admin', dept: 'Operations', sops: 24, lastActive: '2 hours ago' },
  { id: '2', name: 'James Hartley', email: 'james@company.com', role: 'Member', dept: 'Operations', sops: 12, lastActive: '4 hours ago' },
  { id: '3', name: 'Rachel Mendes', email: 'rachel@company.com', role: 'Member', dept: 'Quality', sops: 9, lastActive: '1 day ago' },
  { id: '4', name: 'Tom Baker', email: 'tom@company.com', role: 'Viewer', dept: 'IT Support', sops: 2, lastActive: '3 days ago' },
  { id: '5', name: 'Priya Kapoor', email: 'priya@company.com', role: 'Member', dept: 'HR', sops: 15, lastActive: '1 hour ago' },
]

export default function TeamPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Member')
  const [search, setSearch] = useState('')

  const filteredTeam = mockTeam.filter(member =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary mb-1">Team Members</h1>
          <p className="text-sm text-text-muted">Manage access and permissions for your organisation.</p>
        </div>
        <Button onClick={() => setIsInviteModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Invite Member
        </Button>
      </div>

      <div className="bg-white border border-border mb-12" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div className="p-4 border-b border-border bg-surface-secondary">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search team..."
              className="input-base pl-9 py-2 border-transparent bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table min-w-[800px]">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Department</th>
                <th>Assigned SOPs</th>
                <th>Last Active</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeam.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar name={member.name} size="sm" />
                      <div>
                        <div className="font-medium text-text-primary">{member.name}</div>
                        <div className="text-xs text-text-muted">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      {member.role === 'Admin' && <Shield className="w-3.5 h-3.5 text-accent" />}
                      {member.role === 'Member' && <User className="w-3.5 h-3.5 text-text-muted" />}
                      {member.role === 'Viewer' && <Eye className="w-3.5 h-3.5 text-text-muted" />}
                      <span className="text-sm">{member.role}</span>
                    </div>
                  </td>
                  <td className="text-text-muted">{member.dept}</td>
                  <td><span className="font-mono text-xs bg-surface-secondary px-2 py-1 border border-border">{member.sops}</span></td>
                  <td className="text-text-muted text-xs">{member.lastActive}</td>
                  <td className="text-right">
                    <button className="p-1 text-text-muted hover:text-text-primary transition-colors focus-ring">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl font-bold text-text-primary mb-4">Role Permissions</h2>
        <div className="bg-white border border-border overflow-x-auto" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <table className="data-table min-w-[600px]">
            <thead>
              <tr>
                <th className="w-1/2">Permission</th>
                <th className="text-center">Admin</th>
                <th className="text-center">Member</th>
                <th className="text-center">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { label: 'Create and edit SOPs', a: true, m: true, v: false },
                { label: 'Publish new versions', a: true, m: false, v: false },
                { label: 'Archive SOPs', a: true, m: false, v: false },
                { label: 'Manage team and billing', a: true, m: false, v: false },
                { label: 'Sign off assigned SOPs', a: true, m: true, v: true },
                { label: 'View all active SOPs', a: true, m: true, v: true },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-secondary">
                  <td className="py-3 px-4 text-sm text-text-primary">{row.label}</td>
                  <td className="py-3 px-4 text-center">{row.a ? <span className="text-accent">✓</span> : <span className="text-border">—</span>}</td>
                  <td className="py-3 px-4 text-center">{row.m ? <span className="text-accent">✓</span> : <span className="text-border">—</span>}</td>
                  <td className="py-3 px-4 text-center">{row.v ? <span className="text-accent">✓</span> : <span className="text-border">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite Team Member">
        <div className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="colleague@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <Select
            label="Role"
            options={[
              { value: 'Admin', label: 'Admin — Full access including billing and publishing' },
              { value: 'Member', label: 'Member — Can draft SOPs and sign off' },
              { value: 'Viewer', label: 'Viewer — Read-only and sign off only' },
            ]}
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsInviteModalOpen(false)}>Send Invite</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
