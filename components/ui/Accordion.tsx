'use client'

import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={clsx('divide-y divide-border border-t border-b border-border', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between py-4 text-left focus-ring"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-text-primary pr-4">{item.question}</span>
              <ChevronDown
                className={clsx(
                  'w-4 h-4 text-text-muted flex-shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              className={clsx(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 pb-4' : 'max-h-0'
              )}
            >
              <p className="text-sm text-text-muted leading-relaxed">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
