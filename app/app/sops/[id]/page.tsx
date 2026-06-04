'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { clsx } from 'clsx'
import {
  GripVertical,
  Plus,
  Trash2,
  AlertTriangle,
  History,
  FileDown,
  Share2,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/index'

// --- Types ---
interface Step {
  id: string
  title: string
  description: string
  responsibleRole: string
  warning: string
  isCritical: boolean
  checklist: string[]
}

// --- Sortable Step Item Component ---
function SortableStep({
  step,
  index,
  updateStep,
  removeStep,
}: {
  step: Step
  index: number
  updateStep: (id: string, updates: Partial<Step>) => void
  removeStep: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Placeholder.configure({ placeholder: 'Add description details...' }),
    ],
    content: step.description,
    onUpdate: ({ editor }) => updateStep(step.id, { description: editor.getHTML() }),
  })

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'border border-border bg-white transition-shadow',
        isDragging && 'shadow-card-hover border-accent'
      )}
    >
      <div className="flex">
        {/* Drag Handle */}
        <div
          className="w-10 bg-surface-secondary border-r border-border flex items-center justify-center cursor-grab hover:bg-gray-100 transition-colors"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-text-muted" />
        </div>

        {/* Step Content */}
        <div className="flex-1 p-5">
          <div className="flex items-start gap-4 mb-4">
            <span className="font-mono text-lg font-bold text-accent shrink-0 mt-1">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 space-y-3">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(step.id, { title: e.target.value })}
                  placeholder="Step title"
                  className="input-base text-base font-semibold py-2"
                />
                <button
                  onClick={() => removeStep(step.id)}
                  className="p-2 text-text-muted hover:text-destructive transition-colors focus-ring shrink-0 border border-transparent hover:border-destructive hover:bg-red-50"
                  title="Remove step"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1.5">
                    Responsible Role
                  </label>
                  <input
                    type="text"
                    value={step.responsibleRole}
                    onChange={(e) => updateStep(step.id, { responsibleRole: e.target.value })}
                    placeholder="e.g. HR Manager"
                    className="input-base text-sm py-1.5"
                  />
                </div>
                <div className="flex items-end pb-1.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={step.isCritical}
                      onChange={(e) => updateStep(step.id, { isCritical: e.target.checked })}
                      className="border-border text-accent focus:ring-accent w-4 h-4 rounded-none"
                    />
                    <span className="text-sm text-text-primary">Critical Step</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1.5">
                  Warning / Note (Optional)
                </label>
                <div className="relative">
                  <AlertTriangle className="absolute left-2.5 top-2 w-4 h-4 text-amber-500" />
                  <input
                    type="text"
                    value={step.warning}
                    onChange={(e) => updateStep(step.id, { warning: e.target.value })}
                    placeholder="Safety or quality warning"
                    className="input-base text-sm pl-9 py-1.5 bg-amber-50/30 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1.5">
                  Description
                </label>
                <div className="border border-border tiptap-editor px-3 py-2 bg-surface-secondary/30 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Main Page Component ---
export default function SopEditorPage() {
  const params = useParams()
  const isNew = params.id === 'new'

  const [steps, setSteps] = useState<Step[]>([
    { id: '1', title: 'Preparation', description: '<p>Ensure all materials are ready.</p>', responsibleRole: 'Operator', warning: '', isCritical: false, checklist: [] },
    { id: '2', title: 'Execution', description: '<p>Follow the main process carefully.</p>', responsibleRole: 'Operator', warning: 'High voltage area', isCritical: true, checklist: [] },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const addStep = () => {
    const newId = Math.random().toString(36).substr(2, 9)
    setSteps([...steps, { id: newId, title: '', description: '', responsibleRole: '', warning: '', isCritical: false, checklist: [] }])
  }

  const updateStep = (id: string, updates: Partial<Step>) => {
    setSteps(steps.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter(s => s.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
      {/* ── Left Panel: Metadata (300px) ── */}
      <div className="w-full lg:w-[300px] shrink-0 space-y-6">
        <div className="bg-white border border-border p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">Document Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-text-muted mb-1">Status</label>
                <select className="input-base text-sm py-1.5 w-full bg-surface-secondary">
                  <option>Draft</option>
                  <option>Active</option>
                  <option>Under Review</option>
                  <option>Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Version</label>
                <div className="flex items-center justify-between input-base bg-surface-secondary py-1.5 px-3">
                  <span className="font-mono text-sm text-text-primary">v3.0</span>
                  <button className="text-xs text-accent hover:underline flex items-center gap-1">
                    <History className="w-3 h-3" /> History
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Department</label>
                <select className="input-base text-sm py-1.5 w-full bg-surface-secondary">
                  <option>Operations</option>
                  <option>HR</option>
                  <option>Facilities</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Owner</label>
                <div className="input-base bg-surface-secondary py-1.5 px-3 text-sm">Sarah O.</div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-5 mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">Sign-off Progress</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-primary">8/12 team members</span>
              <span className="font-mono text-xs text-accent">66%</span>
            </div>
            <Progress value={66} className="mb-3" />
            <button className="text-xs text-accent hover:underline">View sign-off report →</button>
          </div>

          <div className="border-t border-border pt-5 space-y-2">
            <Button variant="secondary" className="w-full justify-start text-xs py-2 h-auto">
              <FileDown className="w-3.5 h-3.5 mr-2 text-text-muted" /> Export PDF
            </Button>
            <Button variant="secondary" className="w-full justify-start text-xs py-2 h-auto">
              <Share2 className="w-3.5 h-3.5 mr-2 text-text-muted" /> Share Read-only Link
            </Button>
          </div>
        </div>

        {/* Publish Action */}
        <div className="bg-white border border-border p-5 text-center" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <Button variant="primary" className="w-full mb-2">Publish Version 4.0</Button>
          <p className="text-xs text-text-muted">Will notify assigned team members.</p>
        </div>
      </div>

      {/* ── Main Panel: Editor ── */}
      <div className="flex-1 w-full max-w-3xl">
        <div className="bg-white border border-border p-8 mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <input
            type="text"
            defaultValue="New Employee Onboarding Procedure"
            className="w-full font-display text-display-sm text-text-primary mb-6 outline-none border-b border-transparent hover:border-border focus:border-accent transition-colors pb-2"
            placeholder="SOP Title"
          />

          <div className="grid gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-2">Purpose</label>
              <textarea
                className="input-base text-sm resize-none min-h-[80px]"
                placeholder="What is the objective of this procedure?"
                defaultValue="To ensure a consistent, welcoming, and compliant onboarding experience for all new hires across the organisation."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-2">Scope</label>
              <textarea
                className="input-base text-sm resize-none min-h-[60px]"
                placeholder="Who and what does this apply to?"
                defaultValue="All permanent and contract staff joining Meridian Ltd."
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-2">Roles Involved</label>
                <input type="text" className="input-base text-sm" placeholder="e.g. HR, IT, Manager" defaultValue="HR Manager, IT Lead, Dept Head" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-2">Equipment / Tools</label>
                <input type="text" className="input-base text-sm" placeholder="e.g. Laptop, PPE" defaultValue="Standard issue laptop, Access fob" />
              </div>
            </div>
          </div>
        </div>

        {/* Steps Editor */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-text-primary">Procedure Steps</h2>
            <Button variant="ghost" size="sm" className="text-accent gap-1 hover:bg-accent/10 hover:border-accent/20">
              <Sparkles className="w-3.5 h-3.5" /> AI Assist
            </Button>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <SortableStep
                    key={step.id}
                    step={step}
                    index={index}
                    updateStep={updateStep}
                    removeStep={removeStep}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <button
            onClick={addStep}
            className="w-full mt-4 py-4 border-2 border-dashed border-border text-sm font-medium text-text-muted hover:text-text-primary hover:border-accent hover:bg-surface-secondary transition-all flex items-center justify-center gap-2 focus-ring"
          >
            <Plus className="w-4 h-4" /> Add Step
          </button>
        </div>
      </div>
    </div>
  )
}
