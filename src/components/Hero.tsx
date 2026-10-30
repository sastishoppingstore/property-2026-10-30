import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Home, Sparkles, ShieldCheck, TrendingUp } from 'lucide-react'
import { useContent } from '../lib/use-content'

const faces = [
  { img: '/img/p1.jpg', label: 'DHA Phase 6 · Lahore', price: '8.75 Cr' },
  { img: '/img/p7.jpg', label: 'Blue Area · Islamabad', price: '14.5 Cr' },
  { img: '/img/p2.jpg', label: 'Crescent Bay · Karachi', price: '9.2 Cr' },
  { img: '/img/p6.jpg', label: 'Gulberg Greens · Isb', price: '19.5 Cr' },
]

const types = ['Any Type', 'House', 'Apartment', 'Plot', 'Commercial', 'Farmhouse']

export default function Hero() {
  const nav = useNavigate()
  const { properties, cities } = useContent()
  const [city, setCity] = useState('')
  const [type, setType] = useState('Any Type')
  const [purpose, setPurpose] = useState<'sale' | 'rent'>('sale')
  const [q, setQ] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (type !== 'Any Type') params.set('type', type)
    params.set('purpose', purpose)
    if (q.trim()) params.set('q', q.trim())
    nav(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem]">
        <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[140px]" />
        <div className="absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 scene-3d">
        <div className="grid-floor absolute inset-x-[-25%] bottom-0 h-full" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs"
          >
            <Sparkles size={13} className="text-primary" />
            <span className="text-foreground/85">6,400+ families ne humein trust kiya</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="title-xl mt-6 text-[clamp(2.6rem,6.4vw,5rem)]"
          >
            Aap ka agla
            <br />
            <span className="gold-text">ghar</span>, yahin se
            <br />
            shuru hota hai.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-urdu mt-5 text-xl text-primary-soft/80"
            dir="rtl"
          >
            پاک پراپرٹی پوائنٹ — بھروسے کا دوسرا نام
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted"
          >
            Verified houses, apartments, plots aur commercial properties across Lahore, Karachi,
            Islamabad and beyond — with legal verification, 3D tours and honest pricing on every
            single listing.
          </motion.p>

          {/* search panel */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-9 rounded-2xl glass p-4 shadow-[0_30px_60px_-40px_rgba(0,0,0,1)]"
          >
            <div className="flex gap-1 rounded-full bg-background/60 p-1 text-xs font-semibold">
              {(['sale', 'rent'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPurpose(p)}
                  className={`flex-1 rounded-full px-4 py-2 uppercase tracking-[0.14em] transition ${
                    purpose === p ? 'bg-primary text-[#0a1410]' : 'text-muted hover:text-foreground'
                  }`}
                >
                  {p === 'sale' ? 'Buy' : 'Rent'}
                </button>
              ))}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
              <label className="flex items-center gap-2 rounded-xl bg-background/60 px-3 py-3 hairline">
                <Search size={15} className="text-primary/80" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="DHA, Bahria, Gulberg..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
                />
              </label>
              <label className="flex items-center gap-2 rounded-xl bg-background/60 px-3 py-3 hairline">
                <MapPin size={15} className="text-primary/80" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground outline-none"
                >
                  <option value="" className="bg-surface">All Cities</option>
                  {cities.map((c) => (
                    <option key={c.name} value={c.name} className="bg-surface">
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 rounded-xl bg-background/60 px-3 py-3 hairline">
                <Home size={15} className="text-primary/80" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground outline-none"
                >
                  {types.map((t) => (
                    <option key={t} value={t} className="bg-surface">
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="shine-btn rounded-xl bg-primary px-6 py-3 text-sm font-bold text-[#0a1410] transition hover:bg-primary-soft"
              >
                Search
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-x-8 gap-y-4"
          >
            {[
              { icon: ShieldCheck, k: '100%', v: 'Legally verified files' },
              { icon: TrendingUp, k: 'PKR 48 Arab+', v: 'Transactions closed' },
              { icon: Home, k: `${properties.length * 340}+`, v: 'Active listings' },
            ].map((s) => (
              <div key={s.v} className="flex items-center gap-3">
                <s.icon size={18} className="text-accent" />
                <div>
                  <div className="font-display text-lg font-bold">{s.k}</div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted">{s.v}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D rotating showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="box-scene mx-auto flex h-[26rem] items-center justify-center sm:h-[30rem]"
            style={{ ['--bw' as string]: 'min(20rem, 72vw)', ['--bh' as string]: 'min(25rem, 88vw)' }}
          >
            <div className="box-3d">
              {faces.map((f, i) => (
                <div
                  key={f.img + i}
                  className="box-face"
                  style={{ transform: `rotateY(${i * 90}deg) translateZ(calc(var(--bw) / 2))` }}
                >
                  <img src={f.img} alt={f.label} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-accent">{f.label}</div>
                    <div className="font-display text-2xl font-extrabold gold-text">PKR {f.price}</div>
                  </div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
              ))}
            </div>
          </div>

          {/* floating chips */}
          <div className="floaty absolute left-0 top-10 rounded-2xl glass px-4 py-3 text-xs sm:left-2">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted">Avg. yield</div>
            <div className="font-display text-xl font-bold text-accent">7.4%</div>
          </div>
          <div className="floaty-slow absolute bottom-10 right-0 rounded-2xl glass px-4 py-3 text-xs sm:right-2">
            <div className="flex items-center gap-2">
              <span className="pulse-ring h-2 w-2 rounded-full bg-accent" />
              <span className="text-foreground/85">12 site visits today</span>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-10 bottom-4 h-14 rounded-full bg-primary/20 blur-2xl" />
        </motion.div>
      </div>
    </section>
  )
}
