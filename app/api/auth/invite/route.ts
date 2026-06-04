import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { Resend } from 'resend'

const InviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'member', 'viewer']),
  departmentId: z.string().optional(),
})

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy')

  try {
    const supabase = await createClient()
    
    // 1. Authenticate and check permissions
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await (supabase
      .from('profiles') as any)
      .select('organisation_id, role')
      .eq('id', user.id)
      .single()

    if (!profile || (profile as any).role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can invite members' }, { status: 403 })
    }

    // 2. Validate request
    const body = await req.json()
    const result = InviteSchema.safeParse(body)
    if (!result.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    
    const { email, role, departmentId } = result.data

    // 3. Create invite in Supabase
    // Note: In production, you'd use supabase.auth.admin.inviteUserByEmail (requires service role key)
    // Or send a custom link and handle signup gracefully.
    
    // 4. Send email via Resend
    await resend.emails.send({
      from: 'Procedra <invites@procedra.com>', // Assuming domain is verified
      to: email,
      subject: 'You have been invited to join Procedra',
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E8E3DC;">
          <h2 style="margin-top: 0;">Join your team on Procedra</h2>
          <p>You have been invited to collaborate on standard operating procedures.</p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/auth/signup?email=${email}" style="display: inline-block; background: #1A56FF; color: white; padding: 12px 24px; text-decoration: none; margin: 20px 0;">Accept Invitation</a>
          <p style="color: #6B6B6B; font-size: 14px;">If you didn't expect this, you can safely ignore it.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Invite Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
