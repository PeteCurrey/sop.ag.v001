'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Search, Filter, LayoutGrid, List, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { StatusBadge } from '@/components/ui/Badge'
import { SopStatus } from '@/types/database'

const mockSops = [
  { id: '1', title: 'New Employee Onboarding', status: 'active' as SopStatus, version: 3, updatedAt: new Date('2026-06-02'), dept: 'HR', owner: 'Sarah O.', category: 'Onboarding' },
  { id: '2', title: 'Monthly Stock Count', status: 'under_review' as SopStatus, version: 2, updatedAt: new Date('2026-06-01'), dept: 'Operations', owner: 'James H.', category: 'Inventory' },
  { id: '3', title: 'Equipment Maintenance Log', status: 'active' as SopStatus, version: 1, updatedAt: new Date('2026-05-28'), dept: 'Facilities', owner: 'Rachel M.', category: 'Maintenance' },
  { id: '4', title: 'Customer Complaint Handling', status: 'draft' as SopStatus, version: 1, updatedAt: new Date('2026-05-25'), dept: 'Customer Service', owner: 'Priya K.', category: 'Support' },
  { id: '5', title: 'End of Day Closedown', status: 'active' as SopStatus, version: 4, updatedAt: new Date('2026-05-20'), dept: 'Operations', owner: 'Sarah O.', category: 'Daily Routine' },
  { id: '6', title: 'Fire Evacuation Procedure', status: 'archived' as SopStatus, version: 2, updatedAt: new Date('2026-01-15'), dept: 'Facilities', owner: 'Admin', category: 'Health & Safety' },
]

export default function SopsPage() {
  const [view, setView] = useState<'table' | 'card'>('table')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredSops = mockSops.filter(sop => {
    if (statusFilter !== 'all' && sop.status !== statusFilter) return false
    if (search && !sop.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary mb-1">Standard Operating Procedures</h1>
          <p className="text-sm text-text-muted">Manage, review, and distribute your team's processes.</p>
        </div>
        <Link href="/app/sops/new" className="btn-primary">
          + New SOP
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-border p-3 flex flex-col md:flex-row gap-3 mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search SOPs..."
            className="input-base pl-9 py-2 border-transparent bg-surface-secondary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Select
            className="w-40 py-2 border-transparent bg-surface-secondary"
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'draft', label: 'Draft' },
              { value: 'under_review', label: 'Under Review' },
              { value: 'archived', label: 'Archived' },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <Select
            className="w-40 py-2 border-transparent bg-surface-secondary"
            options={[
              { value: 'all', label: 'All Departments' },
              { value: 'hr', label: 'HR' },
              { value: 'operations', label: 'Operations' },
              { value: 'facilities', label: 'Facilities' },
            ]}
          />
          <div className="flex items-center border border-border bg-surface-secondary">
            <button
              onClick={() => setView('table')}
              className={`p-2 transition-colors ${view === 'table' ? 'bg-white text-accent' : 'text-text-muted hover:text-text-primary'}`}
              aria-label="Table view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('card')}
              className={`p-2 transition-colors ${view === 'card' ? 'bg-white text-accent' : 'text-text-muted hover:text-text-primary'}`}
              aria-label="Card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {view === 'table' ? (
        <div className="bg-white border border-border overflow-x-auto" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <table className="data-table min-w-[800px]">
            <thead>
              <tr>
                <th className="w-8">
                  <input type="checkbox" className="rounded-none border-border" />
                </th>
                <th>Title</th>
                <th>Department</th>
                <th>Status</th>
                <th>Version</th>
                <th>Last Modified</th>
                <th>Owner</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSops.map((sop) => (
                <tr key={sop.id}>
                  <td>
                    <input type="checkbox" className="rounded-none border-border" />
                  </td>
                  <td className="font-medium text-text-primary">
                    <Link href={`/app/sops/${sop.id}`} className="hover:text-accent transition-colors">
                      {sop.title}
                    </Link>
                  </td>
                  <td className="text-text-muted">{sop.dept}</td>
                  <td><StatusBadge status={sop.status} /></td>
                  <td className="font-mono text-xs text-text-muted">v{sop.version}</td>
                  <td className="text-text-muted text-xs">{format(sop.updatedAt, 'MMM d, yyyy')}</td>
                  <td className="text-text-muted">{sop.owner}</td>
                  <td className="text-right">
                    <button className="p-1 text-text-muted hover:text-text-primary transition-colors focus-ring">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSops.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-text-muted">
                    No SOPs found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSops.map((sop) => (
            <Link
              key={sop.id}
              href={`/app/sops/${sop.id}`}
              className="bg-white border border-border p-5 hover:border-accent transition-colors duration-150 flex flex-col"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <StatusBadge status={sop.status} />
                <span className="font-mono text-xs text-text-muted">v{sop.version}</span>
              </div>
              <h3 className="font-display font-semibold text-lg text-text-primary mb-2 line-clamp-2">
                {sop.title}
              </h3>
              <p className="text-sm text-text-muted mb-6 flex-1">
                {sop.dept} · {sop.category}
              </p>
              <div className="flex items-center justify-between text-xs text-text-muted pt-4 border-t border-border">
                <span>{format(sop.updatedAt, 'MMM d, yyyy')}</span>
                <span>{sop.owner}</span>
              </div>
            </Link>
          ))}
          {filteredSops.length === 0 && (
            <div className="col-span-full py-12 text-center text-text-muted bg-white border border-border">
              No SOPs found matching your filters.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
