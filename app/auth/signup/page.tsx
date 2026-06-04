'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function SignupPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [globalError, setGlobalError] = useState('')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.fullName.trim()) e.fullName = 'Full name is required'
    if (!formData.email.includes('@')) e.email = 'Enter a valid email address'
    if (formData.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (!formData.companyName.trim()) e.companyName = 'Company name is required'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setGlobalError('')

    const supabase = createClient()

    // 1. Sign up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { full_name: formData.fullName },
      },
    })

    if (authError || !authData.user) {
      setGlobalError(authError?.message || 'Signup failed. Please try again.')
      setLoading(false)
      return
    }

    // 2. Create organisation
    const slug = generateSlug(formData.companyName)
    const { data: org, error: orgError } = await (supabase
      .from('organisations') as any)
      .insert({ name: formData.companyName, slug })
      .select()
      .single()

    if (orgError) {
      setGlobalError('Failed to create organisation. The company name may already be taken.')
      setLoading(false)
      return
    }

    // 3. Update profile with org and role
    await (supabase
      .from('profiles') as any)
      .update({
        organisation_id: org?.id,
        full_name: formData.fullName,
        email: formData.email,
        role: 'admin',
      })
      .eq('id', authData.user.id)

    router.push('/app/onboarding')
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  return (
    <div>
      <div className="bg-white border border-border p-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-secondary border border-border text-xs text-text-muted font-mono mb-4">
            14-day free trial · No card required
          </div>
          <h1 className="font-display text-2xl font-bold text-text-primary mb-1">Create your account</h1>
          <p className="text-sm text-text-muted">Set up your Procedra workspace in under 2 minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full name"
            type="text"
            value={formData.fullName}
            onChange={set('fullName')}
            error={errors.fullName}
            placeholder="Sarah Okonkwo"
            autoComplete="name"
            id="signup-name"
          />
          <Input
            label="Work email"
            type="email"
            value={formData.email}
            onChange={set('email')}
            error={errors.email}
            placeholder="sarah@company.com"
            autoComplete="email"
            id="signup-email"
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={set('password')}
            error={errors.password}
            hint="At least 8 characters"
            autoComplete="new-password"
            id="signup-password"
          />
          <Input
            label="Company name"
            type="text"
            value={formData.companyName}
            onChange={set('companyName')}
            error={errors.companyName}
            placeholder="Meridian Operations Ltd"
            autoComplete="organization"
            id="signup-company"
          />

          {globalError && (
            <div className="bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-destructive">
              {globalError}
            </div>
          )}

          <Button type="submit" variant="primary" loading={loading} className="w-full py-3 mt-2">
            Create account
          </Button>
        </form>

        <p className="text-center text-xs text-text-muted mt-6">
          By creating an account you agree to our{' '}
          <Link href="/terms" className="text-accent hover:underline">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
        </p>
      </div>

      <p className="text-center text-sm text-text-muted mt-6">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-accent hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
