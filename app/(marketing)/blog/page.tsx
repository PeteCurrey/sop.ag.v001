import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Procedra',
  description: 'Insights and guides on SOP management, operational excellence, compliance, and team processes from the Procedra team.',
}

const categories = ['All', 'Operations', 'Compliance', 'AI & Automation', 'HR & Onboarding', 'Leadership']

const categoryColors: Record<string, string> = {
  Operations: 'bg-blue-600',
  Compliance: 'bg-red-600',
  'AI & Automation': 'bg-accent',
  'HR & Onboarding': 'bg-green-600',
  Leadership: 'bg-gray-700',
}

const posts = [
  {
    id: 1,
    title: 'Why your SOPs aren\'t being followed (and what to do about it)',
    excerpt: 'Documentation that lives in a shared drive isn\'t enforced — it\'s abandoned. Here\'s how to build procedures that actually stick.',
    category: 'Operations',
    date: 'Jun 2, 2026',
    readTime: '7 min read',
  },
  {
    id: 2,
    title: 'ISO 9001 audit prep: the document trail that matters',
    excerpt: 'Before your next audit, make sure your SOP version history, sign-off records, and review schedules are airtight.',
    category: 'Compliance',
    date: 'May 28, 2026',
    readTime: '5 min read',
  },
  {
    id: 3,
    title: 'Using AI to generate first-draft SOPs: what works and what doesn\'t',
    excerpt: 'AI-generated SOPs are a genuine productivity win — but only when you understand where human review is non-negotiable.',
    category: 'AI & Automation',
    date: 'May 20, 2026',
    readTime: '8 min read',
  },
  {
    id: 4,
    title: 'The onboarding SOP stack every operations manager needs',
    excerpt: 'New hire onboarding is where most SOPs fail. Here\'s the minimum viable procedure set for your first 30 days.',
    category: 'HR & Onboarding',
    date: 'May 12, 2026',
    readTime: '6 min read',
  },
  {
    id: 5,
    title: 'When to create a SOP and when to just write a guide',
    excerpt: 'Not every process deserves a formal SOP. Here\'s how to decide when a procedure needs structure versus when a simple note will do.',
    category: 'Operations',
    date: 'May 5, 2026',
    readTime: '4 min read',
  },
  {
    id: 6,
    title: 'Building a culture where people actually read the procedures',
    excerpt: 'Process adoption is a leadership challenge as much as a documentation one. Here\'s what high-adoption teams do differently.',
    category: 'Leadership',
    date: 'Apr 28, 2026',
    readTime: '6 min read',
  },
]

export default function BlogPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-surface-secondary border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Blog</p>
          <h1 className="font-display text-display-sm text-text-primary mb-4">
            Insights on operational excellence.
          </h1>
          <p className="text-text-muted">
            Guides, perspectives, and practical advice on SOPs, compliance, and team process.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-border bg-white sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`shrink-0 px-3 py-1.5 text-xs font-medium border transition-colors duration-150 ${
                  cat === 'All'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-text-muted border-border hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {posts.map((post) => {
              const catColor = categoryColors[post.category] || 'bg-gray-700'
              return (
                <article key={post.id} className="bg-white flex flex-col group cursor-pointer hover:bg-surface-secondary transition-colors duration-150">
                  {/* Category accent stripe */}
                  <div className={`h-1 w-full ${catColor}`} />

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-mono uppercase tracking-wide text-text-muted">
                        {post.category}
                      </span>
                      <span className="text-border">·</span>
                      <span className="text-xs text-text-muted">{post.readTime}</span>
                    </div>

                    <h2 className="font-display text-base font-bold text-text-primary mb-3 leading-snug group-hover:text-accent transition-colors duration-150">
                      {post.title}
                    </h2>
                    <p className="text-sm text-text-muted leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted font-mono">{post.date}</span>
                      <span className="text-xs text-accent">Read →</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
