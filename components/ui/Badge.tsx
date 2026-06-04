'use client'

import { clsx } from 'clsx'
import type { SopStatus } from '@/types/database'

type BadgeVariant = 'draft' | 'active' | 'review' | 'archived' | 'trial' | 'accent' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'badge',
        {
          'badge-draft': variant === 'draft',
          'badge-active': variant === 'active',
          'badge-review': variant === 'review',
          'badge-archived': variant === 'archived',
          'badge-trial': variant === 'trial',
          'badge-accent': variant === 'accent',
          'bg-gray-100 text-text-muted border border-gray-200': variant === 'default',
        },
        className
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: SopStatus }) {
  const map: Record<SopStatus, { variant: BadgeVariant; label: string }> = {
    draft: { variant: 'draft', label: 'Draft' },
    active: { variant: 'active', label: 'Active' },
    under_review: { variant: 'review', label: 'Under Review' },
    archived: { variant: 'archived', label: 'Archived' },
  }
  const { variant, label } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}
