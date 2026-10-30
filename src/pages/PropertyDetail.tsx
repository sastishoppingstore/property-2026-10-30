import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BadgeCheck,
  Bath,
  BedDouble,
  CalendarClock,
  CheckCircle2,
  Heart,
  KeyRound,
  MapPin,
  Phone,
  Ruler,
  Share2,
  MessageCircle,
} from 'lucide-react'
import PropertyCard3D from '../components/PropertyCard3D'
import Calculator from '../components/Calculator'
import Reveal from '../components/Reveal'
import { WHATSAPP, fmtPKR } from '../lib/data'
import { useContent } from '../lib/use-content'
import { useFavorites } from '../lib/favorites'

export default function PropertyDetail() {
  const { properties } = useContent()
  const { slug } = useParams()
  const p = properties.find((x) => x.slug === slug)
  const [active, setActive] = useState(0)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)
  const [tf, setTf] = useState({ rx: 0, ry: 0, live: false })
  const { has, toggle } = useFavorites()

  if (!p) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-40 pb-24 text-center">
        <h1 className="title-xl text-4xl">Listing not found</h1>
        <p className="mt-3 text-muted">Yeh property remove ho chuki hai ya link ghalat hai.</p>
        <Link to="/properties" className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-[#0a1410]">
          Back to listings
        </Link>
      </div>
    )
  }

  const saved = has(p.id)
  const similar = properties.filter((x) => x.id !== p.id && (x.city === p.city || x.type === p.type)).slice(0, 3)

  const onMove = (e: React.MouseEvent) => {
    const el = imgRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setTf({ rx: (0.5 - py) * 7, ry: (px - 0.5) * 9, live: true })
  }

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const specs = [
    { icon: BedDouble, label: 'Bedrooms', value: p.beds > 0 ? String(p.beds) : '—' },
    { icon: Bath, label: 'Bathrooms', value: p.baths > 0 ? String(p.baths) : '—' },
    { icon: Ruler, label: 'Land area', value: p.size },
    { icon: KeyRound, label: 'Possession', value: p.possession },
    { icon: CalendarClock, label: 'Listed', value: p.posted },
    { icon: MapPin, label: 'City', value: p.city },
  ]

  return (
    <div className="mx-auto max-w-7xl px-5 pt-28 lg:px-8 lg:pt-36">
      <Link to="/properties" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-primary">
        <ArrowLeft size={15} /> All properties
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
            <span className="rounded-full bg-primary px-3 py-1 font-bold text-[#0a1410]">
              For {p.purpose === 'sale' ? 'Sale' : 'Rent'}
            </span>
            <span className="rounded-full hairline px-3 py-1 text-accent">{p.type}</span>
            {p.verified && (
              <span className="inline-flex items-center gap-1 text-primary">
                <BadgeCheck size={14} /> Verified file
              </span>
            )}
          </div>
          <h1 className="title-xl mt-4 max-w-2xl text-4xl sm:text-5xl">{p.title}</h1>
          <p className="font-urdu mt-2 text-lg text-primary-soft/80" dir="rtl">{p.titleUr}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted">
            <MapPin size={15} className="text-primary/70" /> {p.area}, {p.city}
          </p>
        </div>

        <div className="rounded-2xl glass px-6 py-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted">Asking price</div>
          <div className="font-display text-3xl font-extrabold gold-text">
            PKR {fmtPKR(p.price)}
            {p.purpose === 'rent' && <span className="text-base text-muted"> /month</span>}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => toggle(p.id)}
              className="inline-flex items-center gap-2 rounded-full hairline px-4 py-2 text-xs transition hover:border-primary/60"
            >
              <Heart size={14} className={saved ? 'fill-primary text-primary' : ''} />
              {saved ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={share}
              className="inline-flex items-center gap-2 rounded-full hairline px-4 py-2 text-xs transition hover:border-primary/60"
            >
              <Share2 size={14} /> {copied ? 'Link copied!' : 'Share'}
            </button>
          </div>
        </div>
      </div>

      {/* gallery */}
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="scene-3d">
          <div
            ref={imgRef}
            onMouseMove={onMove}
            onMouseLeave={() => setTf({ rx: 0, ry: 0, live: false })}
            className={`tilt-card relative h-[22rem] overflow-hidden rounded-3xl hairline sm:h-[30rem] ${tf.live ? 'is-live' : ''}`}
            style={{ transform: `rotateX(${tf.rx}deg) rotateY(${tf.ry}deg)` }}
          >
            <img src={p.gallery[active]} alt={p.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            {p.badge && (
              <span
                className="absolute left-5 top-5 rounded-full bg-background/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur"
                style={{ transform: 'translateZ(60px)' }}
              >
                {p.badge}
              </span>
            )}
            <div className="glare" />
          </div>
          <div className="mt-4 flex gap-3">
            {p.gallery.map((g, i) => (
              <button
                key={g + i}
                onClick={() => setActive(i)}
                className={`h-20 flex-1 overflow-hidden rounded-xl transition-all duration-300 ${
                  active === i ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* agent + enquiry */}
        <div className="rounded-3xl glass p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 font-display text-lg font-bold text-primary">
              {p.agent.charAt(0)}
            </span>
            <div>
              <div className="font-display font-bold">{p.agent}</div>
              <div className="text-xs text-muted">Senior Property Consultant</div>
            </div>
          </div>

          {sent ? (
            <div className="mt-6 rounded-2xl bg-accent/10 p-6 text-center ring-1 ring-accent/30">
              <CheckCircle2 size={30} className="mx-auto text-accent" />
              <h4 className="mt-3 font-display text-lg font-bold">Shukriya!</h4>
              <p className="mt-1 text-sm text-muted">
                {p.agent} aap se 24 ghanton mein rabta karenge, In sha Allah.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="mt-6 space-y-3"
            >
              <input
                required
                placeholder="Your name"
                className="w-full rounded-xl bg-background/60 px-4 py-3 text-sm hairline outline-none placeholder:text-muted/70 focus:border-primary/60"
              />
              <input
                required
                type="tel"
                placeholder="Mobile number (03xx xxxxxxx)"
                className="w-full rounded-xl bg-background/60 px-4 py-3 text-sm hairline outline-none placeholder:text-muted/70 focus:border-primary/60"
              />
              <textarea
                rows={3}
                defaultValue={`Mujhe "${p.title}" ke baare mein maloomat chahiye.`}
                className="w-full resize-none rounded-xl bg-background/60 px-4 py-3 text-sm hairline outline-none focus:border-primary/60"
              />
              <button
                type="submit"
                className="shine-btn w-full rounded-xl bg-primary py-3 text-sm font-bold text-[#0a1410] transition hover:bg-primary-soft"
              >
                Request a call back
              </button>
            </form>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={`tel:${p.agentPhone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl hairline py-3 text-xs font-semibold transition hover:border-primary/60"
            >
              <Phone size={14} /> Call now
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Assalam o Alaikum, ${p.title} (${p.city}) ke liye rabta kar raha hoon.`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent/15 py-3 text-xs font-semibold text-accent ring-1 ring-accent/30 transition hover:bg-accent/25"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* specs */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {specs.map((s) => (
          <div key={s.label} className="rounded-2xl bg-surface p-4 hairline">
            <s.icon size={18} className="text-primary/80" />
            <div className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted">{s.label}</div>
            <div className="font-display text-sm font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      {/* description + amenities */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="title-xl text-3xl">Property ki tafseel</h2>
          <p className="mt-4 leading-relaxed text-foreground/85">{p.description}</p>
          <p className="mt-4 leading-relaxed text-muted">
            Hamari team ne is property ka title, ownership aur society dues mukammal taur par verify
            kiya hai. Site visit, bank financing aur transfer — har step par legal desk aap ke
            saath hoga.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl hairline">
            <div className="relative h-56 bg-surface-2">
              <div className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(207,168,100,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(207,168,100,0.16) 1px, transparent 1px)',
                  backgroundSize: '34px 34px',
                }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="pulse-ring inline-grid h-12 w-12 place-items-center rounded-full bg-primary text-[#0a1410]">
                  <MapPin size={20} />
                </span>
                <div className="mt-3 font-display text-sm font-bold">{p.area}</div>
                <div className="text-xs text-muted">{p.city}, Pakistan</div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 bg-surface px-5 py-4 text-xs text-muted">
              <span>Exact location shared after viewing confirmation.</span>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(`${p.area}, ${p.city}, Pakistan`)}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 className="title-xl text-3xl">Features</h2>
          <ul className="mt-5 grid gap-2">
            {p.amenities.map((a) => (
              <li key={a} className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3 text-sm hairline">
                <CheckCircle2 size={16} className="text-accent" /> {a}
              </li>
            ))}
          </ul>
          {p.installments && (
            <div className="mt-5 rounded-2xl bg-primary/10 p-5 ring-1 ring-primary/30">
              <div className="font-display font-bold text-primary-soft">Installment plan available</div>
              <p className="mt-1 text-sm text-muted">
                30% down payment ke sath 3 saal ki aasaan qiston par booking mumkin hai.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16">
        <Reveal>
          <Calculator initialPrice={p.price >= 5000000 ? p.price : 10000000} />
        </Reveal>
      </div>

      {similar.length > 0 && (
        <div className="mt-20">
          <h2 className="title-xl text-3xl">Isi jaisi properties</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.07}>
                <PropertyCard3D p={s} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
