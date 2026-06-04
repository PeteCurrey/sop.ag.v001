'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  FileText,
  Building2,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  Plus,
  Bell,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { Avatar } from '@/components/ui/index'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  children?: { href: string; label: string }[]
}

const navItems: NavItem[] = [
  {
    href: '/app/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    href: '/app/sops',
    label: 'SOPs',
    icon: <FileText className="w-4 h-4" />,
    children: [
      { href: '/app/sops', label: 'All SOPs' },
      { href: '/app/sops?filter=mine', label: 'My SOPs' },
      { href: '/app/sops?filter=drafts', label: 'Drafts' },
      { href: '/app/sops?filter=archived', label: 'Archived' },
    ],
  },
  {
    href: '/app/departments',
    label: 'Departments',
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    href: '/app/team',
    label: 'Team',
    icon: <Users className="w-4 h-4" />,
  },
  {
    href: '/app/reports',
    label: 'Reports',
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    href: '/app/settings/organisation',
    label: 'Settings',
    icon: <Settings className="w-4 h-4" />,
    children: [
      { href: '/app/settings/organisation', label: 'Organisation' },
      { href: '/app/settings/billing', label: 'Billing' },
      { href: '/app/settings/integrations', label: 'Integrations' },
      { href: '/app/settings/profile', label: 'Profile' },
    ],
  },
]

interface SidebarProps {
  userName?: string | null
  userEmail?: string | null
  avatarUrl?: string | null
}

function Sidebar({ userName, userEmail, avatarUrl }: SidebarProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<string[]>(['SOPs'])
  const router = useRouter()

  const toggleExpand = (label: string) => {
    setExpanded(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    )
  }

  const isActive = (href: string) =>
    href === '/app/dashboard'
      ? pathname === '/app/dashboard'
      : pathname.startsWith(href.split('?')[0])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-primary flex flex-col z-30">
      {/* Logo */}
      <div className="px-4 h-14 flex items-center border-b border-white/10">
        <Link href="/app/dashboard" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-accent flex items-center justify-center">
            <span className="text-white font-mono font-bold text-xs">P</span>
          </div>
          <span className="font-display font-bold text-base text-white tracking-tight">
            Procedra
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href)
          const isExpanded = expanded.includes(item.label)

          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={clsx(
                    'nav-item w-full justify-between',
                    active && 'active'
                  )}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </span>
                  <ChevronDown
                    className={clsx(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-7 mt-0.5 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={clsx(
                          'block px-3 py-1.5 text-xs transition-colors duration-150',
                          pathname === child.href.split('?')[0]
                            ? 'text-white'
                            : 'text-gray-500 hover:text-gray-300'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx('nav-item', active && 'active')}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar name={userName} src={avatarUrl} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">{userName || 'User'}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail || ''}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="p-1 text-gray-500 hover:text-white transition-colors"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}

interface TopbarProps {
  breadcrumb?: string
  onNewSop?: () => void
  notificationCount?: number
  userName?: string | null
  avatarUrl?: string | null
}

function Topbar({ breadcrumb, onNewSop, notificationCount = 0, userName, avatarUrl }: TopbarProps) {
  return (
    <header className="h-14 border-b border-border bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Link href="/app/dashboard" className="hover:text-text-primary transition-colors">
          Procedra
        </Link>
        {breadcrumb && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-text-primary font-medium">{breadcrumb}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* New SOP */}
        <Link
          href="/app/sops/new"
          className="btn-primary text-xs px-3 py-2 gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          New SOP
        </Link>

        {/* Notifications */}
        <button className="relative p-2 text-text-muted hover:text-text-primary transition-colors focus-ring">
          <Bell className="w-4 h-4" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-xs font-mono flex items-center justify-center"
              style={{ borderRadius: '50%', fontSize: '10px' }}>
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <Avatar name={userName} size="sm" />
      </div>
    </header>
  )
}

interface AppShellProps {
  children: React.ReactNode
  breadcrumb?: string
  userName?: string | null
  userEmail?: string | null
  avatarUrl?: string | null
}

export function AppShell({ children, breadcrumb, userName, userEmail, avatarUrl }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-surface-secondary">
      <Sidebar userName={userName} userEmail={userEmail} avatarUrl={avatarUrl} />
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <Topbar breadcrumb={breadcrumb} userName={userName} avatarUrl={avatarUrl} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
