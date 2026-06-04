'use client'

import { clsx } from 'clsx'
import { useState } from 'react'

interface Tab {
  id: string
  label: string
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={clsx('flex border-b border-border', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            'px-4 py-2.5 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px focus-ring',
            activeTab === tab.id
              ? 'border-accent text-accent'
              : 'border-transparent text-text-muted hover:text-text-primary'
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={clsx(
                'ml-1.5 px-1.5 py-0.5 text-xs font-mono',
                activeTab === tab.id ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-text-muted'
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={clsx('flex flex-col items-center justify-center py-16 px-8 text-center', className)}>
      {icon && (
        <div className="w-12 h-12 flex items-center justify-center bg-surface-secondary border border-border mb-4 text-text-muted">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-muted max-w-xs mb-4">{description}</p>
      {action}
    </div>
  )
}

interface ProgressProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
}

export function Progress({ value, max = 100, className, showLabel = false }: ProgressProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <div className="flex-1 h-1.5 bg-border overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-mono text-text-muted shrink-0">{pct}%</span>
      )}
    </div>
  )
}

interface AvatarProps {
  name?: string | null
  src?: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = { sm: 'w-6 h-6 text-xs', md: 'w-8 h-8 text-sm', lg: 'w-10 h-10 text-base' }

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initials = name
    ? name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  if (src) {
    return (
      <img
        src={src}
        alt={name || ''}
        className={clsx('object-cover bg-surface-secondary', sizeMap[size], className)}
      />
    )
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-center font-medium bg-accent text-white font-mono',
        sizeMap[size],
        className
      )}
    >
      {initials}
    </div>
  )
}

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'w-4 h-4 border-2 border-border border-t-accent animate-spin',
        className
      )}
      style={{ borderRadius: '50%' }}
    />
  )
}
