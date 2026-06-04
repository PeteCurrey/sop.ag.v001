'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ArrowRight, Sparkles, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // Step 2 state
  const [departments, setDepartments] = useState(['Operations', 'HR', 'Finance'])
  const [newDept, setNewDept] = useState('')

  // Step 3 state
  const [invites, setInvites] = useState([{ email: '', role: 'Member' }])

  // Step 4 state
  const [prompt, setPrompt] = useState('')

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    else router.push('/app/dashboard')
  }

  const addDept = () => {
    if (newDept.trim() && !departments.includes(newDept.trim())) {
      setDepartments([...departments, newDept.trim()])
      setNewDept('')
    }
  }

  const removeDept = (dept: string) => {
    setDepartments(departments.filter(d => d !== dept))
  }

  const addInvite = () => {
    setInvites([...invites, { email: '', role: 'Member' }])
  }

  const updateInvite = (index: number, field: string, value: string) => {
    const newInvites = [...invites]
    newInvites[index] = { ...newInvites[index], [field]: value }
    setInvites(newInvites)
  }

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white border border-border" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
        {/* Progress header */}
        <div className="border-b border-border bg-surface-secondary px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-text-primary mb-1">Set up your workspace</h1>
            <p className="text-sm text-text-muted">Step {step} of 4</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-12 h-1.5 transition-colors duration-300 ${s <= step ? 'bg-accent' : 'bg-border'}`}
              />
            ))}
          </div>
        </div>

        <div className="p-8">
          {/* ── STEP 1: Welcome ── */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="w-12 h-12 bg-accent flex items-center justify-center mb-6">
                <span className="text-white font-mono font-bold text-xl">P</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-4">Welcome to Procedra</h2>
              <p className="text-text-muted mb-8 leading-relaxed max-w-md">
                You've taken the first step towards better operations. Over the next few screens, we'll set up your departments, invite your team, and generate your first AI-assisted SOP.
              </p>
              <div className="bg-surface-secondary border border-border p-4 mb-8">
                <p className="text-sm font-medium text-text-primary mb-1">Your organisation is ready</p>
                <p className="text-sm text-text-muted">You can upload a logo in your workspace settings later.</p>
              </div>
              <Button onClick={handleNext} className="w-full py-3 text-base group">
                Continue <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}

          {/* ── STEP 2: Departments ── */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Create departments</h2>
              <p className="text-sm text-text-muted mb-8">Organise your SOPs and assign responsibilities to specific teams.</p>

              <div className="space-y-3 mb-6">
                {departments.map((dept) => (
                  <div key={dept} className="flex items-center justify-between border border-border px-4 py-3 bg-white">
                    <span className="font-medium text-sm text-text-primary">{dept}</span>
                    <button onClick={() => removeDept(dept)} className="text-text-muted hover:text-destructive focus-ring p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mb-8">
                <Input
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  placeholder="e.g. IT Support"
                  className="flex-1"
                  onKeyDown={(e) => { if (e.key === 'Enter') addDept() }}
                />
                <Button variant="secondary" onClick={addDept}>Add</Button>
              </div>

              <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
                <Button variant="ghost" onClick={() => setStep(step + 1)}>Skip for now</Button>
                <Button onClick={handleNext}>Next step</Button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Invite Team ── */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Invite your team</h2>
              <p className="text-sm text-text-muted mb-8">Bring your team in to start collaborating on procedures.</p>

              <div className="space-y-4 mb-6">
                {invites.map((invite, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-1">
                      <Input
                        value={invite.email}
                        onChange={(e) => updateInvite(i, 'email', e.target.value)}
                        placeholder="colleague@company.com"
                        type="email"
                      />
                    </div>
                    <select
                      value={invite.role}
                      onChange={(e) => updateInvite(i, 'role', e.target.value)}
                      className="input-base w-32 cursor-pointer bg-white"
                    >
                      <option>Admin</option>
                      <option>Member</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                ))}
              </div>

              <button
                onClick={addInvite}
                className="text-sm text-accent font-medium hover:underline flex items-center gap-1 focus-ring"
              >
                <Plus className="w-4 h-4" /> Add another invite
              </button>

              <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
                <Button variant="ghost" onClick={() => setStep(step + 1)}>Skip for now</Button>
                <Button onClick={handleNext}>Send invites</Button>
              </div>
            </div>
          )}

          {/* ── STEP 4: First SOP ── */}
          {step === 4 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-display text-2xl font-bold text-text-primary">Create your first SOP</h2>
                <span className="text-xs bg-accent/10 text-accent font-mono px-2 py-0.5 border border-accent/20">AI Assist</span>
              </div>
              <p className="text-sm text-text-muted mb-8">
                Let's see Procedra in action. Describe a process your team does frequently, and our AI will draft a structured SOP for you.
              </p>

              <div className="relative mb-8">
                <textarea
                  className="input-base text-base p-4 min-h-[160px] resize-none"
                  placeholder="e.g. When a new laptop arrives, unbox it, log the serial number in the IT asset register, install the standard security profile, and place it in the secure locker."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Sparkles className="absolute right-4 bottom-4 w-5 h-5 text-accent opacity-50" />
              </div>

              <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
                <Button variant="ghost" onClick={() => router.push('/app/dashboard')}>Skip & go to Dashboard</Button>
                <Button onClick={() => router.push('/app/sops/new')} className="gap-2">
                  <Sparkles className="w-4 h-4" /> Generate SOP
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
