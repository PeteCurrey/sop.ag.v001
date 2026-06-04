import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

const RequestSchema = z.object({
  prompt: z.string().min(10).max(5000),
})

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Validate request
    const body = await req.json()
    const result = RequestSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid prompt provided.' }, { status: 400 })
    }

    // 3. Generate with Claude
    const msg = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 4096,
      temperature: 0.2,
      system: `You are an expert operations manager writing Standard Operating Procedures.
Your task is to take a raw description of a process and convert it into a structured SOP.

You MUST respond with ONLY valid JSON matching this schema:
{
  "title": "Clear, action-oriented title",
  "purpose": "Brief explanation of why this procedure exists",
  "scope": "Who and what this applies to",
  "roles": ["Role 1", "Role 2"],
  "equipment": ["Item 1", "Item 2"],
  "steps": [
    {
      "title": "Step title",
      "description": "<p>Detailed description in HTML format.</p>",
      "responsibleRole": "Specific role",
      "warning": "Optional safety/quality warning, or empty string",
      "isCritical": boolean,
      "checklist": ["Verifiable item 1"]
    }
  ]
}

Rules:
- Steps should be chronological and actionable.
- 'description' MUST be valid HTML (use <p>, <ul>, <li>, <strong>).
- Flag steps as 'isCritical: true' if failure causes significant risk.
- Do NOT wrap the JSON in markdown blocks like \`\`\`json. Just return the raw JSON object.`,
      messages: [
        {
          role: 'user',
          content: `Convert this process description into a structured SOP:\n\n${result.data.prompt}`
        }
      ]
    })

    const responseText = (msg.content[0] as { text: string }).text

    // 4. Parse JSON
    try {
      const parsedSop = JSON.parse(responseText)
      
      // In production: You would save this to Supabase here and return the ID.
      // For this build, we return the parsed data to the client to preview.

      return NextResponse.json({ sop: parsedSop })
    } catch (parseError) {
      console.error('Failed to parse Claude JSON:', responseText)
      return NextResponse.json({ error: 'AI generated invalid structure. Please try again.' }, { status: 500 })
    }

  } catch (error) {
    console.error('AI Generation Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
