import { Link } from 'react-router-dom'
import {
  KeyRound,
  Megaphone,
  TrendingUp,
  ShieldCheck,
  Globe2,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import Reveal, { SectionHeading } from '../components/Reveal'
import { services } from '../lib/data'

const iconMap: Record<string, typeof KeyRound> = {
  key: KeyRound,
  megaphone: Megaphone,
  trending: TrendingUp,
  shield: ShieldCheck,
  globe: Globe2,
  wrench: Wrench,
}

export default function Services() {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
      <Reveal>
        <span className="eyebrow">What we do</span>
        <h1 className="title-xl mt-4 max-w-3xl text-5xl sm:text-6xl">
          Sirf dealing nahi — <span className="gold-text">poori</span> property consultancy.
        </h1>
        <p className="font-urdu mt-4 text-lg text-primary-soft/80" dir="rtl">
          خرید، فروخت، سرمایہ کاری اور قانونی رھنمائی — سب ایک جگہ
        </p>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Hover karein har card par — andar se poori service breakdown nikal aayegi. 2009 se aaj
          tak, hum ne 6,400 se zyada families aur investors ki property journey complete karwai hai.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = iconMap[s.icon] ?? KeyRound
          return (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="flip h-[19rem]">
                <div className="flip-inner h-full w-full">
                  {/* front */}
                  <div className="flip-face flex h-full flex-col justify-between rounded-3xl bg-surface p-7 hairline">
                    <div>
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 text-primary">
                        <Icon size={22} />
                      </span>
                      <h3 className="mt-6 font-display text-2xl font-bold">{s.title}</h3>
                      <p className="font-urdu mt-1 text-sm text-primary-soft/70" dir="rtl">{s.titleUr}</p>
                      <p className="mt-4 text-sm leading-relaxed text-muted">{s.blurb}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary/70">
                      Hover for details
                    </span>
                  </div>
                  {/* back */}
                  <div className="flip-face flip-back flex h-full flex-col justify-between rounded-3xl border border-primary/30 bg-gradient-to-br from-[#16261e] to-[#0a120e] p-7">
                    <div>
                      <h3 className="font-display text-xl font-bold gold-text">{s.title}</h3>
                      <ul className="mt-5 space-y-3 text-sm">
                        {s.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5 text-foreground/85">
                            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent" /> {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary"
                    >
                      Talk to us <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* fee structure */}
      <section className="py-24">
        <SectionHeading
          eyebrow="Transparent pricing"
          title={<>Koi chupi hui commission nahi</>}
          urdu="واضح اور شفاف فیس"
          align="center"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              name: 'Buyer Support',
              price: '1%',
              note: 'of deal value',
              items: ['Unlimited shortlists', 'Verified files only', 'Site visits arranged', 'Negotiation support', 'Transfer coordination'],
            },
            {
              name: 'Seller Package',
              price: '1.5%',
              note: 'of sale value',
              featured: true,
              items: ['Pro photo & drone shoot', '3D virtual tour', 'Portal + social campaign', 'Buyer screening', 'Legal & registry desk', 'Dedicated manager'],
            },
            {
              name: 'Management',
              price: '5%',
              note: 'of monthly rent',
              items: ['Tenant sourcing & vetting', 'Agreement drafting', 'Rent collection', 'Maintenance handling', 'Annual report'],
            },
          ].map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <div
                className={`h-full rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 ${
                  tier.featured
                    ? 'border border-primary/40 bg-gradient-to-b from-[#1a2a20] to-[#0b1310] shadow-[0_40px_70px_-45px_rgba(207,168,100,0.7)]'
                    : 'bg-surface hairline'
                }`}
              >
                {tier.featured && (
                  <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0a1410]">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-extrabold gold-text">{tier.price}</span>
                  <span className="text-xs uppercase tracking-[0.14em] text-muted">{tier.note}</span>
                </div>
                <ul className="mt-7 space-y-3 text-sm">
                  {tier.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-foreground/85">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent" /> {it}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-8 block rounded-full py-3 text-center text-sm font-bold transition ${
                    tier.featured
                      ? 'bg-primary text-[#0a1410] hover:bg-primary-soft'
                      : 'hairline hover:border-primary/60 hover:text-primary'
                  }`}
                >
                  Get started
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
