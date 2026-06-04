'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white border border-border p-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      {sent ? (
        <div className="text-center py-4">
          <div className="w-12 h-12 bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-xl font-bold text-text-primary mb-2">Check your email</h1>
          <p className="text-sm text-text-muted mb-6">
            We&apos;ve sent a password reset link to <strong>{email}</strong>.
            Check your inbox and spam folder.
          </p>
          <Link href="/auth/login" className="btn-secondary w-full block text-center">
            Back to sign in
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-text-primary mb-1">Reset password</h1>
            <p className="text-sm text-text-muted">Enter your email and we&apos;ll send a reset link.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              id="forgot-email"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" loading={loading} className="w-full py-3">
              Send reset link
            </Button>
          </form>

          <p className="text-center text-sm text-text-muted mt-6">
            <Link href="/auth/login" className="text-accent hover:underline">
              ← Back to sign in
            </Link>
          </p>
        </>
      )}
    </div>
  )
}
