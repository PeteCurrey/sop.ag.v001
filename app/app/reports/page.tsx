'use client'

import { useState } from 'react'
import { Tabs } from '@/components/ui/index'
import { Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Download } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const tabs = [
  { id: 'compliance', label: 'Sign-off Compliance' },
  { id: 'health', label: 'SOP Health' },
  { id: 'activity', label: 'Activity Timeline' },
  { id: 'ai', label: 'AI Usage' },
]

const aiChartData = [
  { name: 'Jan', generations: 12 },
  { name: 'Feb', generations: 19 },
  { name: 'Mar', generations: 15 },
  { name: 'Apr', generations: 28 },
  { name: 'May', generations: 42 },
  { name: 'Jun', generations: 18 },
]

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('compliance')

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary mb-1">Reports</h1>
          <p className="text-sm text-text-muted">Analytics and compliance tracking.</p>
        </div>
        <Button variant="secondary" className="gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="bg-white border border-border" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="bg-surface-secondary px-4 pt-2" />
        
        <div className="p-6">
          {activeTab === 'compliance' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-semibold text-text-primary">Sign-off Compliance</h2>
                <Select
                  className="w-48 py-1.5"
                  options={[
                    { value: 'all', label: 'All Departments' },
                    { value: 'ops', label: 'Operations' },
                    { value: 'hr', label: 'HR' },
                  ]}
                />
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>SOP Title</th>
                    <th>Department</th>
                    <th>Required</th>
                    <th>Completed</th>
                    <th>Compliance %</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { title: 'New Employee Onboarding', dept: 'HR', req: 12, comp: 8 },
                    { title: 'Monthly Stock Count', dept: 'Operations', req: 5, comp: 5 },
                    { title: 'Fire Evacuation', dept: 'Facilities', req: 45, comp: 42 },
                  ].map((row, i) => {
                    const pct = Math.round((row.comp / row.req) * 100)
                    return (
                      <tr key={i}>
                        <td className="font-medium text-text-primary">{row.title}</td>
                        <td className="text-text-muted">{row.dept}</td>
                        <td className="font-mono text-xs">{row.req}</td>
                        <td className="font-mono text-xs">{row.comp}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-border">
                              <div className={`h-full ${pct === 100 ? 'bg-green-500' : pct > 75 ? 'bg-amber-400' : 'bg-destructive'}`} style={{ width: `${pct}%` }} />
                            </div>
                            <span className="font-mono text-xs text-text-muted w-8">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="animate-fade-in">
               <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-semibold text-text-primary">SOP Health Overview</h2>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="border border-green-200 bg-green-50 p-6 text-center">
                  <div className="font-mono text-4xl font-bold text-green-800 mb-2">18</div>
                  <div className="text-sm font-medium text-green-800">Up to date</div>
                </div>
                <div className="border border-amber-200 bg-amber-50 p-6 text-center">
                  <div className="font-mono text-4xl font-bold text-amber-800 mb-2">4</div>
                  <div className="text-sm font-medium text-amber-800">Due within 30 days</div>
                </div>
                <div className="border border-red-200 bg-red-50 p-6 text-center">
                  <div className="font-mono text-4xl font-bold text-red-800 mb-2">2</div>
                  <div className="text-sm font-medium text-red-800">Overdue</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="animate-fade-in">
              <h2 className="text-base font-semibold text-text-primary mb-6">Activity Timeline</h2>
              <div className="space-y-6">
                {[
                  { user: 'Sarah O.', action: 'published a new version of', target: 'New Employee Onboarding', time: '2 hours ago' },
                  { user: 'James H.', action: 'completed sign-off for', target: 'Monthly Stock Count', time: '4 hours ago' },
                  { user: 'Admin', action: 'created department', target: 'IT Support', time: '1 day ago' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-none bg-surface-secondary border border-border flex items-center justify-center font-mono text-xs shrink-0">
                      {item.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm text-text-primary">
                        <span className="font-medium">{item.user}</span> {item.action} <span className="font-medium">{item.target}</span>
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-base font-semibold text-text-primary mb-1">AI Generation Usage</h2>
                  <p className="text-sm text-text-muted">Monthly quota: <span className="font-mono text-text-primary">18 / Unlimited</span></p>
                </div>
              </div>
              
              <div className="h-64 w-full mb-12">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aiChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E3DC" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6B6B' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6B6B' }} />
                    <Tooltip cursor={{ fill: '#F5F4F1' }} contentStyle={{ borderRadius: 0, border: '1px solid #E8E3DC', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="generations" fill="#1A56FF" radius={[0, 0, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <h3 className="text-sm font-semibold text-text-primary mb-4">Recent Generations</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>User</th>
                    <th>Prompt Snippet</th>
                    <th>Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-xs text-text-muted">Jun 02, 14:30</td>
                    <td>Sarah O.</td>
                    <td className="text-text-muted truncate max-w-xs italic">"Describe the monthly stock inventory count..."</td>
                    <td className="font-mono text-xs">2,450</td>
                  </tr>
                  <tr>
                    <td className="text-xs text-text-muted">May 28, 09:15</td>
                    <td>James H.</td>
                    <td className="text-text-muted truncate max-w-xs italic">"How to properly calibrate the main warehouse scale..."</td>
                    <td className="font-mono text-xs">1,820</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
