import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const shareToken = crypto.randomBytes(32).toString('hex')
    const { id } = await params

    const { error } = await supabase
      .from('sops')
      .update({ public_share_token: shareToken })
      .eq('id', id)

    if (error) return NextResponse.json({ error: 'Failed to generate share link' }, { status: 500 })

    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/shared/${shareToken}`
    return NextResponse.json({ shareUrl })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params

    const { error } = await supabase
      .from('sops')
      .update({ public_share_token: null })
      .eq('id', id)

    if (error) return NextResponse.json({ error: 'Failed to revoke share link' }, { status: 500 })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
