import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Star,
  Building,
  Home as HomeIcon,
  LandPlot,
  Store,
  Trees,
  ShieldCheck,
  Camera,
  Handshake,
  FileCheck2,
  Quote,
} from 'lucide-react'
import Hero from '../components/Hero'
import PropertyCard3D from '../components/PropertyCard3D'
import Calculator from '../components/Calculator'
import Reveal, { SectionHeading } from '../components/Reveal'
import { WHATSAPP } from '../lib/data'
import { useContent } from '../lib/use-content'

const typeCards = [
  { icon: HomeIcon, label: 'Houses', ur: 'گھر', count: '2,140', type: 'House' },
  { icon: Building, label: 'Apartments', ur: 'اپارٹمنٹس', count: '1,380', type: 'Apartment' },
  { icon: LandPlot, label: 'Plots', ur: 'پلاٹس', count: '3,905', type: 'Plot' },
  { icon: Store, label: 'Commercial', ur: 'کمرشل', count: '760', type: 'Commercial' },
  { icon: Trees, label: 'Farmhouses', ur: 'فارم ہاؤس', count: '215', type: 'Farmhouse' },
]

const steps = [
  { icon: Camera, title: 'Share your brief', text: 'Budget, area aur zaroorat batayein — call, WhatsApp ya form par.' },
  { icon: ShieldCheck, title: 'We verify & shortlist', text: 'Har file ka title, NOC aur ownership check hota hai pehle.' },
  { icon: Handshake, title: 'Visit & negotiate', text: 'Site visits arrange, aur best price par hum aap ki taraf se baat karte hain.' },
  { icon: FileCheck2, title: 'Transfer & keys', text: 'Fard, mutation aur registry — sab in-house legal team handle karti hai.' },
]

export default function Home() {
  const { properties, cities, testimonials } = useContent()
  const featured = properties.filter((p) => p.featured)
  const fresh = properties.filter((p) => !p.featured).slice(0, 6)

  return (
    <>
      <Hero />

      {/* marquee */}
      <div className="relative overflow-hidden border-y border-line bg-surface/50 py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex gap-10">
              {[
                'DHA Lahore',
                'Bahria Town Karachi',
                'Gulberg Greens',
                'Park View City',
                'Crescent Bay',
                'Bahria Enclave',
                'Eden Valley',
                'Gwadar Marine Drive',
                'Blue Area',
              ].map((t) => (
                <span key={r + t} className="flex items-center gap-10 font-display text-sm uppercase tracking-[0.28em] text-muted/70">
                  {t} <span className="h-1 w-1 rounded-full bg-primary/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* property types */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Browse by category"
          title={<>Aap kya dhoond rahe hain?</>}
          urdu="ہر قسم کی پراپرٹی، ایک ہی جگہ"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {typeCards.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.07}>
              <Link
                to={`/properties?type=${t.type}`}
                className="group block rounded-2xl bg-surface p-6 hairline transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_30px_50px_-30px_rgba(207,168,100,0.5)]"
              >
                <t.icon size={26} className="text-primary transition-transform duration-500 group-hover:scale-110" />
                <div className="mt-5 font-display text-lg font-bold">{t.label}</div>
                <div className="font-urdu text-sm text-primary-soft/70" dir="rtl">{t.ur}</div>
                <div className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">{t.count} listings</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* featured 3D cards */}
      <section className="relative mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Hand-picked"
            title={<>Featured <span className="gold-text">3D</span> listings</>}
            urdu="منتخب بہترین پراپرٹیز"
            sub="Mouse ko card par le jaayein — har listing 3D mein zinda ho jaati hai."
          />
          <Reveal>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 rounded-full hairline px-5 py-3 text-sm font-semibold transition hover:border-primary/60 hover:text-primary"
            >
              All properties <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <PropertyCard3D p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* cities */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Where we work"
          title={<>Pakistan ke 9 shehron mein</>}
          urdu="پورے پاکستان میں ہماری موجودگی"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06}>
              <Link
                to={`/properties?city=${c.name}`}
                className="group relative block h-52 overflow-hidden rounded-2xl hairline"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-115"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                  <div>
                    <div className="font-display text-2xl font-extrabold">{c.name}</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted">
                      {c.listings} listings
                    </div>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/90 text-[#0a1410] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-1">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="relative overflow-hidden border-y border-line bg-surface/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="How it works"
            title={<>Chaar aasaan qadam</>}
            urdu="شروع سے رجسٹری تک — مکمل رھنمائی"
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl bg-background/60 p-7 hairline">
                  <span className="absolute right-5 top-4 font-display text-5xl font-extrabold text-primary/10">
                    0{i + 1}
                  </span>
                  <s.icon size={24} className="text-accent" />
                  <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* fresh listings */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Just listed"
          title={<>Naye aaye hue options</>}
          urdu="تازہ تریں پراپرٹیز"
        />
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {fresh.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <PropertyCard3D p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* calculator */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Reveal>
          <Calculator />
        </Reveal>
      </section>

      {/* testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Client stories"
          title={<>Log hamare baare mein kya kehte hain</>}
          urdu="ہمارے گاہکوں کی راے"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl bg-surface p-7 hairline transition-all duration-500 hover:border-primary/40">
                <Quote size={44} className="absolute right-5 top-5 text-primary/10" />
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">“{t.text}”</p>
                <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 font-display font-bold text-primary">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="noise relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#14231c] via-[#0b1310] to-[#161009] p-10 text-center sm:p-16"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />
          <div className="relative">
            <span className="eyebrow">Apni property list karwayein</span>
            <h2 className="title-xl mx-auto mt-4 max-w-2xl text-4xl sm:text-5xl">
              Bechna hai? Hum 30 din mein <span className="gold-text">serious buyer</span> laate hain.
            </h2>
            <p className="font-urdu mx-auto mt-4 max-w-xl text-lg text-primary-soft/80" dir="rtl">
              مفت تشخیص اور پروفیشنل مارکیٹنگ — آج ہی رابطہ کریں
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="shine-btn rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#0a1410] transition hover:bg-primary-soft"
              >
                Free valuation
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Mujhe apni property list karwani hai.')}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-foreground/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] transition hover:border-accent hover:text-accent"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
