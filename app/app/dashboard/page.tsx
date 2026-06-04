import { createClient } from '@/lib/supabase/server'
import { format, formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { StatusBadge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/index'
import { FileText, Users, Clock, AlertCircle, TrendingUp } from 'lucide-react'

// Mock data for demo — replace with real Supabase queries once connected
const mockStats = {
  totalSops: 24,
  sopsDelta: '+3 this month',
  pendingSignoffs: 8,
  dueForReview: 4,
  teamMembers: 12,
}

const mockRecentSops = [
  { id: '1', title: 'New Employee Onboarding', status: 'active' as const, version: 3, updatedAt: new Date('2026-06-02'), dept: 'HR' },
  { id: '2', title: 'Monthly Stock Count', status: 'under_review' as const, version: 2, updatedAt: new Date('2026-06-01'), dept: 'Operations' },
  { id: '3', title: 'Equipment Maintenance Log', status: 'active' as const, version: 1, updatedAt: new Date('2026-05-28'), dept: 'Facilities' },
  { id: '4', title: 'Customer Complaint Handling', status: 'draft' as const, version: 1, updatedAt: new Date('2026-05-25'), dept: 'Customer Service' },
  { id: '5', title: 'End of Day Closedown', status: 'active' as const, version: 4, updatedAt: new Date('2026-05-20'), dept: 'Operations' },
]

const mockPendingSignoffs = [
  { sop: 'Monthly Stock Count', user: 'James Hartley', due: '2026-06-10', status: 'pending' },
  { sop: 'Health & Safety Review', user: 'Priya Kapoor', due: '2026-06-08', status: 'overdue' },
  { sop: 'New Employee Onboarding', user: 'Tom Baker', due: '2026-06-12', status: 'pending' },
]

const mockActivity = [
  { action: 'SOP published', detail: 'New Employee Onboarding v3', time: '2 hours ago', by: 'Sarah O.' },
  { action: 'Sign-off completed', detail: 'Monthly Stock Count', time: '4 hours ago', by: 'James H.' },
  { action: 'SOP created', detail: 'Customer Complaint Handling', time: '1 day ago', by: 'Rachel M.' },
  { action: 'Team member invited', detail: 'tom@company.com', time: '2 days ago', by: 'Sarah O.' },
  { action: 'Review completed', detail: 'Equipment Maintenance Log', time: '3 days ago', by: 'Admin' },
]

const mockReviewSchedule = [
  { title: 'Fire Evacuation Procedure', date: '2026-06-08', daysUntil: 4, status: 'overdue' },
  { title: 'Health & Safety Induction', date: '2026-06-15', daysUntil: 11, status: 'due' },
  { title: 'Monthly Stock Count', date: '2026-06-30', daysUntil: 26, status: 'upcoming' },
]

export default async function DashboardPage() {
  // In production: fetch real data from Supabase
  // const supabase = await createClient()
  // const { data: sops } = await supabase.from('sops').select(...)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-primary mb-1">Dashboard</h1>
        <p className="text-sm text-text-muted">
          {format(new Date(), 'EEEE, d MMMM yyyy')}
        </p>
      </div>

      {/* ── Stat cards ────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Total SOPs',
            value: mockStats.totalSops,
            delta: mockStats.sopsDelta,
            icon: <FileText className="w-4 h-4" />,
            href: '/app/sops',
          },
          {
            label: 'Pending Sign-offs',
            value: mockStats.pendingSignoffs,
            delta: 'Across your team',
            icon: <Clock className="w-4 h-4" />,
            href: '/app/reports',
          },
          {
            label: 'Due for Review',
            value: mockStats.dueForReview,
            delta: 'Within 30 days',
            icon: <AlertCircle className="w-4 h-4" />,
            href: '/app/reports',
          },
          {
            label: 'Team Members',
            value: mockStats.teamMembers,
            delta: 'All active',
            icon: <Users className="w-4 h-4" />,
            href: '/app/team',
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white border border-border p-5 hover:border-accent transition-colors duration-150"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">{stat.label}</span>
              <span className="text-text-muted">{stat.icon}</span>
            </div>
            <div className="font-mono text-3xl font-bold text-text-primary mb-1">{stat.value}</div>
            <div className="text-xs text-text-muted">{stat.delta}</div>
          </Link>
        ))}
      </div>

      {/* ── Two-column layout ─────────────────────── */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Recent SOPs */}
          <div className="bg-white border border-border" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text-primary">Recent SOPs</h2>
              <Link href="/app/sops" className="text-xs text-accent hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-border">
              {mockRecentSops.map((sop) => (
                <Link
                  key={sop.id}
                  href={`/app/sops/${sop.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-secondary transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors truncate">
                      {sop.title}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {sop.dept} · {formatDistanceToNow(sop.updatedAt, { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-xs text-text-muted">v{sop.version}</span>
                    <StatusBadge status={sop.status} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pending sign-offs */}
          <div className="bg-white border border-border" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text-primary">Pending Sign-offs</h2>
              <Link href="/app/reports" className="text-xs text-accent hover:underline">View report</Link>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>SOP</th>
                  <th>Assignee</th>
                  <th>Due</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockPendingSignoffs.map((row) => (
                  <tr key={`${row.sop}-${row.user}`}>
                    <td className="font-medium">{row.sop}</td>
                    <td className="text-text-muted">{row.user}</td>
                    <td className="font-mono text-xs">{row.due}</td>
                    <td>
                      <span className={row.status === 'overdue'
                        ? 'badge bg-red-50 text-red-700 border border-red-200'
                        : 'badge bg-amber-50 text-amber-700 border border-amber-200'
                      }>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity feed */}
          <div className="bg-white border border-border" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-text-primary">Activity</h2>
            </div>
            <div className="divide-y divide-border">
              {mockActivity.map((item, i) => (
                <div key={i} className="px-5 py-3.5 flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-primary">{item.action}</p>
                    <p className="text-xs text-text-muted truncate">{item.detail}</p>
                    <p className="text-xs text-text-muted mt-0.5">{item.by} · {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review schedule */}
          <div className="bg-white border border-border" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-text-primary">Upcoming Reviews</h2>
            </div>
            <div className="divide-y divide-border">
              {mockReviewSchedule.map((item) => (
                <div key={item.title} className="px-5 py-3.5 flex items-center gap-3">
                  <div className={`w-2 h-2 shrink-0 ${
                    item.status === 'overdue' ? 'bg-destructive' :
                    item.status === 'due' ? 'bg-amber-400' : 'bg-green-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-primary truncate">{item.title}</p>
                    <p className="text-xs text-text-muted font-mono">{item.date}</p>
                  </div>
                  <span className={`text-xs font-mono shrink-0 ${
                    item.status === 'overdue' ? 'text-destructive' :
                    item.status === 'due' ? 'text-amber-600' : 'text-text-muted'
                  }`}>
                    {item.status === 'overdue' ? 'Overdue' : `${item.daysUntil}d`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
