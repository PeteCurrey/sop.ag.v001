'use client'

import { useState } from 'react'
import { Plus, MoreVertical, Building2, Users, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'

const mockDepartments = [
  { id: '1', name: 'Operations', members: 12, sops: 24, activeSince: 'Jan 2026' },
  { id: '2', name: 'HR & Onboarding', members: 4, sops: 15, activeSince: 'Jan 2026' },
  { id: '3', name: 'Facilities Management', members: 8, sops: 42, activeSince: 'Feb 2026' },
  { id: '4', name: 'Finance', members: 3, sops: 8, activeSince: 'Feb 2026' },
  { id: '5', name: 'IT Support', members: 5, sops: 18, activeSince: 'Mar 2026' },
]

export default function DepartmentsPage() {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [newDeptName, setNewDeptName] = useState('')

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary mb-1">Departments</h1>
          <p className="text-sm text-text-muted">Organise your SOPs and teams by functional area.</p>
        </div>
        <Button onClick={() => setIsNewModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> New Department
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDepartments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white border border-border p-5 hover:border-accent transition-colors duration-150 relative group cursor-pointer"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          >
            <button className="absolute top-4 right-4 p-1 text-text-muted hover:text-text-primary opacity-0 group-hover:opacity-100 transition-all focus-ring">
              <MoreVertical className="w-4 h-4" />
            </button>
            
            <div className="w-10 h-10 bg-surface-secondary border border-border flex items-center justify-center mb-4 text-text-muted">
              <Building2 className="w-5 h-5" />
            </div>
            
            <h3 className="font-display font-semibold text-lg text-text-primary mb-4">
              {dept.name}
            </h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted flex items-center gap-2"><Users className="w-4 h-4" /> Team members</span>
                <span className="font-medium text-text-primary">{dept.members}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted flex items-center gap-2"><FileText className="w-4 h-4" /> Active SOPs</span>
                <span className="font-medium text-text-primary">{dept.sops}</span>
              </div>
            </div>
            
            <div className="text-xs text-text-muted font-mono border-t border-border pt-4">
              Created {dept.activeSince}
            </div>
          </div>
        ))}
      </div>

      <Modal open={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} title="Create Department">
        <div className="space-y-6">
          <Input
            label="Department Name"
            placeholder="e.g. Quality Control"
            value={newDeptName}
            onChange={(e) => setNewDeptName(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsNewModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsNewModalOpen(false)}>Create Department</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
