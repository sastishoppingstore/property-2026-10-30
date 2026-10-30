import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  urdu,
  sub,
  align = 'left',
}: {
  eyebrow: string
  title: ReactNode
  urdu?: string
  sub?: string
  align?: 'left' | 'center'
}) {
  return (
    <Reveal className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}>
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-px w-10 bg-primary/60" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="title-xl mt-4 text-4xl sm:text-5xl">{title}</h2>
      {urdu && <p className="font-urdu mt-3 text-lg text-primary-soft/80" dir="rtl">{urdu}</p>}
      {sub && <p className="mt-4 text-muted leading-relaxed">{sub}</p>}
    </Reveal>
  )
}
